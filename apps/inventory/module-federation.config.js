module.exports = {
    name: 'app2',
    exposes: {
      './Module': './my-apps/app2/src/app/features/feature1/feature1.module.ts',
    },
  };