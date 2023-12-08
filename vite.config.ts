import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createPlugins } from './plugins';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const root = process.cwd();
  const pathResolve = (pathname: string) => resolve(root, '.', pathname);

  const isBuild = command === 'build';
  const plugins = await createPlugins({ isBuild });

  return {
    base: '/',
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/backend': {
          target: 'http://st.3-e.cn',
          changeOrigin: true,
          ws: true,
        },
        // '/storage-oss': {
        //   target: 'https://st-image.3-e.cn',
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: (path) => path.replace(/^\/storage-oss/, ''),
        // },
      },
    },
    plugins: plugins,
  };
});
