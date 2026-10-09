import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Childcare Check In Out | Attendance & Ratios", description: "Monitor child and staff attendance, program ratios and shared playground capacity.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}
