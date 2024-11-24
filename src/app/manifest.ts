import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Notes App",
    short_name: "Notes",
    description: "A simple note-taking app.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon-512x512.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
