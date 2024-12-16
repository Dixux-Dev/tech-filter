import { ThemeProvider } from "@/components/theme-provider";
import ToggleTheme from "@/components/toggleTheme";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* <script
          src="https://unpkg.com/react-scan/dist/auto.global.js"
          async
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container px-5 mx-auto flex justify-between py-5 border-b border-b-slate-600">
            <div></div>
            <ToggleTheme></ToggleTheme>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}