import UnoCss from 'unocss/vite';

import { presetUno, presetAttributify, transformerDirectives, presetTypography, presetIcons } from 'unocss';

export function unocss() {
  return UnoCss({
    content: {
      pipeline: {
        include: [/\.(vue|svelte|[jt]sx|mdx?|html)($|\?)/],
      },
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetTypography(),
      presetIcons({ cdn: 'https://esm.sh/', extraProperties: { display: 'inline-block', 'vertical-align': 'middle' } }),
    ],
    transformers: [transformerDirectives()],
    shortcuts: [],
    theme: {
      colors: {
        primary: '#3F60A1',
      },
    },
  });
}
