import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  refs: {
    '@chakra-ui/react': {
      disable: true
    }
  }
};
export default config;
/*
export default {
  
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
};
*/