export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'cssnano': {
      preset: ['advanced', {
        discardComments: { removeAll: true },
        reduceIdents: true,
        minifySelectors: true,
        minifyParams: true,
        normalizeWhitespace: true,
        mergeLonghand: true,
        mergeRules: true,
        minifyFontValues: true,
        discardDuplicates: true,
        discardEmpty: true,
        discardUnused: true,
        zindex: false
      }]
    }
  }
}