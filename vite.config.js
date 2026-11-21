import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only middleware to clear stale Service Workers / caches from other projects (e.g. SmartBill POS) on the same port
const clearStaleServiceWorkerPlugin = () => ({
    name: 'clear-stale-sw',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            const url = req.url?.split('?')[0];
            if (url === '/src/main.tsx' || url === '/main.tsx') {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                res.setHeader('Cache-Control', 'no-store');
                res.end(`
                    (async () => {
                        try {
                            if ('serviceWorker' in navigator) {
                                const regs = await navigator.serviceWorker.getRegistrations();
                                await Promise.all(regs.map(r => r.unregister()));
                            }
                            if ('caches' in window) {
                                const keys = await caches.keys();
                                await Promise.all(keys.map(k => caches.delete(k)));
                            }
                        } catch (e) {
                            console.error(e);
                        }
                        window.location.reload();
                    })();
                `);
                return;
            }
            if (url === '/sw.js' || url === '/service-worker.js' || url === '/dev-sw.js') {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                res.setHeader('Cache-Control', 'no-store');
                res.end(`
                    self.addEventListener('install', () => self.skipWaiting());
                    self.addEventListener('activate', async () => {
                        const keys = await caches.keys();
                        await Promise.all(keys.map(k => caches.delete(k)));
                        await self.registration.unregister();
                        const clients = await self.clients.matchAll({ type: 'window' });
                        clients.forEach(c => c.navigate(c.url));
                    });
                `);
                return;
            }
            next();
        });
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), clearStaleServiceWorkerPlugin()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000,
    }
})
