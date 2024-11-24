import { AntdThemeProvider } from "@/context/antContext";
import { Poppins } from "next/font/google";
import "../styles/antdTheme.scss";
import "../styles/globals.scss";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Include the weights you want
  variable: "--font-poppins",
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
      <AntdThemeProvider>
        <body>{children}</body>
      </AntdThemeProvider>
    </html>
  );
}
