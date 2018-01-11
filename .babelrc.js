const env = process.env.NODE_ENV;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        shippedProposals: true,
        loose: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-object-rest-spread',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-proposal-class-properties',
  ].filter(Boolean),
};
