import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio Full‑stack Web & App - Trần Công Tiến",
    short_name: "Tien Portfolio",
    description:
      "Portfolio cá nhân của Trần Công Tiến – Full‑stack Web & App Developer (React, Next.js, Node.js, Flutter).",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

