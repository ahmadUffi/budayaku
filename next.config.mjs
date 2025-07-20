const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_API_BASE_URL, // GANTI PREFIX
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkcqzelkfoaxcvughcts.supabase.co",
        pathname: "/storage/v1/object/public/gambarprovinsi/**",
      },
    ],
  },
};

export default nextConfig;
