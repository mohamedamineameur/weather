'use client'
import "./globals.css";
import HeaderComponent from "../app/components/header/header.component";
import { useState } from "react";
import emotion from '@emotion/styled';
import FooterComponent from "./components/footer/footer.component";

const Main = emotion.main`
  height: 100vh;
  `;




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  return (
    <html lang="fr">
      <body>
        <HeaderComponent locale={locale} setLocale={setLocale} />
        <Main >{children}</Main>
        <FooterComponent locale={locale} />

        
      </body>
    </html>
  );
}
