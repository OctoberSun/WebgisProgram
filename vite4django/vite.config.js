import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';


const django = true;

const nodepath = django ? '../' : '';
const urlprefix = django ? 'static' : '.';

const port = 5173;
const host = 'localhost'
const copy = 'public';
const target = 'es2020';
const assets = 'assets';
const manifest = true;

const root = django ? './src/' : './';
const base = django ? urlprefix : './';
const dist = django ? `../${urlprefix}/` : './dist';
const file = django ? 'main.js' : 'index.html';
const main = `${root}${file}`;

const cesiumSource = `${nodepath}node_modules/cesium/Build/Cesium`;
const cesiumAssets = 'assets/cesium';

// https://vitejs.dev/config/
console.log( resolve(copy));
console.log( resolve('public'))
const config = {
    root: resolve(root),
    base: base,
    publicDir: resolve(copy),
    define: {
        CESIUM_BASE_URL: JSON.stringify(`${urlprefix}/${cesiumAssets}`),
    },
    plugins: [

        vue(),
        viteStaticCopy({
            targets: [
                {src: `${cesiumSource}/Assets`, dest: cesiumAssets},
                {src: `${cesiumSource}/Workers`, dest: cesiumAssets},
                {src: `${cesiumSource}/Widgets`, dest: cesiumAssets},
                {src: `${cesiumSource}/ThirdParty`, dest: cesiumAssets},
            ],
        }),
    ],
    server: {
        host: host,
        port: port,
        open: false,
        watch: {
            usePolling: true,
            disableGlobbing: false,
        },
    },
    build: {
        manifest: manifest,
        emptyOutDir: true,
        copyPublicDir: true,
        target: target,
        assetsDir: assets,
        outDir: resolve(dist),
        rollupOptions: {
            input: {
                main: resolve(main),
            },
            output: {
                entryFileNames: '[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
    preview: {
        host: host,
        port: 4173,
        open: false,
    }
};
export default defineConfig(config);