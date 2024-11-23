"use client";
import { AppContextDataProvider } from "@/context/appContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextDataProvider>
      <div>{children}</div>
    </AppContextDataProvider>
  );
}
