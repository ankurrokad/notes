import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Notes App",
    short_name: "Notes",
    description: "A simple note-taking app.",
    start_url: "/",
    display: "standalone",
    background_color: "var(--background)",
    theme_color: "var(--background)",
    icons: [
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
