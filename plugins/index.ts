import { type PluginOption } from 'vite';
import { unocss } from './unocss';
import react from '@vitejs/plugin-react';

interface Options {
  isBuild: boolean;
}

export async function createPlugins({ isBuild }: Options) {
  console.log(isBuild);
  const vitePlugins: (PluginOption | PluginOption[])[] = [react()];

  vitePlugins.push(unocss());

  return vitePlugins;
}
