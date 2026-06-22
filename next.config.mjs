import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@use "@/assets/styles/_mixins.scss" as *;`,
  },
};

export default withNextIntl(nextConfig);
