// elio工作台 Service Worker — 离线缓存核心
const CACHE_NAME = 'elio-workbench-v5-netfirst';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg'
];

// 安装：预缓存核心资源
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 请求拦截：网络优先，离线才回退缓存（保证联网时永远看到最新版）
self.addEventListener('fetch', e => {
  // 只处理 GET 请求
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request).then(response => {
      // 联网成功：更新缓存并返回最新内容
      if (response && response.status === 200 && e.request.url.startsWith(self.location.origin)) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return response;
    }).catch(() => caches.match(e.request)) // 断网才用缓存
  );
});
