/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // Меняем старый @import на современный @use as *
    additionalData: `@use "@/assets/styles/_mixins.scss" as *;`,
  },
};

export default nextConfig;