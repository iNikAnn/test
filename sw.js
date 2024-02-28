async function addToCache(files) {
	const cache = await window.caches.open('v1');
	await cache.addAll(files);
}

this.addEventListener('install', (event) => {
	event.waitUntil(
		addToCache([
			'/',
			'/index.html',
			'/manifest.json',
			'/favicon.ico',
			'/logo192.png',
			'/static/js/bundle.js',
			'/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg'
		])
	);
});

async function cacheFirst(request) {
	const res = await window.caches.match(request);

	if (res) {
		return res;
	};

	return fetch(request);
}

this.addEventListener('fetch', (event) => {
	event.respondWith(
		cacheFirst(event.request)
	);
})