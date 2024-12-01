"use client";
import { AppContextDataProvider } from "@/context/appContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <AppContextDataProvider>
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <div className="p-4 w-full flex justify-end gap-4 text-xl">
          {/* <Link
            className={pathname == "/" ? "font-extrabold underline" : ""}
            href="/"
          >
            Home
          </Link> */}
          <Link
            className={pathname == "/notes" ? "font-extrabold underline" : ""}
            href="/notes"
          >
            Notes
          </Link>
          <Link
            className={pathname == "/counter" ? "font-extrabold underline" : ""}
            href="/counter"
          >
            Counter
          </Link>
        </div>
        <div className="h-full w-full">{children}</div>
      </div>
    </AppContextDataProvider>
  );
}
