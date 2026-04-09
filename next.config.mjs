/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  transpilePackages: ["react-pdf", "pdfjs-dist"],
};
  
  export default nextConfig;
  