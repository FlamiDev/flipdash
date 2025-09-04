import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { outfit } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "Flipdash",
    template: "%s | Flipdash",
  },
  description: "Dashboard for flipboard"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased max-w-2xl mx-auto items-center`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
