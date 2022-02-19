import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const isProduction = process.env.NODE_ENV == 'production' ? true : false
const productionBaseDirectory = 'PowerSystemsTypeTree'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter({}),
    paths: isProduction
      ? {
          base: `/${productionBaseDirectory}`,
          assets: `https://kdheepak.com/${productionBaseDirectory}`,
        }
      : {},
  },
}

export default config
