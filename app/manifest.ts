import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sinergi Mandiri Perkasa",
    short_name: "SMP",
    description:
      "Sinergi Mandiri Perkasa hadir sebagai distributor bahan bangunan terpercaya yang berfokus pada penyediaan produk-produk berkualitas tinggi untuk kebutuhan proyek di wilayah Jabodetabek",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
