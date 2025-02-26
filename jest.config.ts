import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  reporters: [
    'default',
    ['jest-allure', {
      resultsDir: './allure-results'
    }]
  ]
});

