import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    // EnvironmentPlugin(['VITE_API_BASE_URL', 'VITE_UNSPLASH_API_KEY']),
  ],
  esbuild: {
    jsx: 'transform',
    jsxDev: false,
    jsxImportSource: '@/libs/jsx',
    jsxInject: `import { jsx } from '@/libs/jsx/jsx-runtime'`,
    jsxFactory: 'jsx.toVDOM',
  },
})
