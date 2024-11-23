import "../styles/globals.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Include the font weights you need
  variable: "--font-poppins", // Optional: for CSS custom property
});

export const metadata = {
  title: "Your App",
  description: "Note-taking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
