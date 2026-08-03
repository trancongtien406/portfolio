import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tiendev.id.vn"),
  title: {
    default: "Trần Công Tiến - Lập trình viên website, ứng dụng tại Đà Nẵng",
    template: "%s | Trần Công Tiến",
  },
  description:
    "Trần Công Tiến là lập trình viên website và ứng dụng tại Đà Nẵng, chuyên thiết kế website chuẩn SEO, web app và mobile app với Next.js, Node.js, PostgreSQL và Flutter.",
  keywords: [
    "Trần Công Tiến",
    "Tran Cong Tien",
    "Trần Công Tiến Đà Nẵng",
    "Trần Công Tiến lập trình viên",
    "Trần Công Tiến lập trình viên website",
    "Trần Công Tiến lập trình viên ứng dụng",
    "lập trình viên website Đà Nẵng",
    "lập trình viên ứng dụng Đà Nẵng",
    "thiết kế website Đà Nẵng",
    "lập trình app Đà Nẵng",
    "portfolio lập trình viên",
    "fullstack developer",
    "full‑stack developer",
    "react developer",
    "nextjs developer",
    "lập trình web",
    "lập trình viên Đà Nẵng",
    "web developer Vietnam",
    "Flutter developer",
    "Node.js developer",
  ],
  authors: [
    {
      name: "Trần Công Tiến",
      url: "https://tiendev.id.vn",
    },
  ],
  openGraph: {
    title: "Trần Công Tiến - Lập trình viên website, ứng dụng tại Đà Nẵng",
    description:
      "Xem dịch vụ thiết kế website, phát triển web app và mobile app của Trần Công Tiến tại Đà Nẵng cùng các bài blog SEO và case study thực tế.",
    url: "/",
    siteName: "Portfolio Trần Công Tiến",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Trần Công Tiến - Lập trình viên website, ứng dụng tại Đà Nẵng",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trần Công Tiến - Lập trình viên website, ứng dụng tại Đà Nẵng",
    description:
      "Portfolio và blog của Trần Công Tiến, lập trình viên website và ứng dụng tại Đà Nẵng.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Trần Công Tiến",
    url: "https://tiendev.id.vn",
    sameAs: [
      "https://www.linkedin.com/in/trancongtien406/",
      "https://github.com/tiendev2003",
      "https://www.facebook.com/trancongtien406",
    ],
    jobTitle: "Lập trình viên website và ứng dụng tại Đà Nẵng",
    description:
      "Trần Công Tiến là lập trình viên website và ứng dụng tại Đà Nẵng, chuyên phát triển website chuẩn SEO, web app và mobile app hiện đại.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Đà Nẵng",
      addressCountry: "VN",
    },
    knowsAbout: [
      "Thiết kế website chuẩn SEO",
      "Phát triển web app",
      "Lập trình ứng dụng mobile",
      "Next.js",
      "Node.js",
      "Flutter",
      "PostgreSQL",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Trần Công Tiến - Portfolio",
    url: "https://tiendev.id.vn",
    description:
      "Portfolio và blog của Trần Công Tiến, lập trình viên website và ứng dụng tại Đà Nẵng.",
    author: { "@type": "Person", name: "Trần Công Tiến" },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Trần Công Tiến - Dịch vụ lập trình website và ứng dụng tại Đà Nẵng",
    url: "https://tiendev.id.vn",
    description:
      "Dịch vụ thiết kế website chuẩn SEO, phát triển web app và mobile app chuyên nghiệp tại Đà Nẵng.",
    provider: {
      "@type": "Person",
      name: "Trần Công Tiến",
      url: "https://tiendev.id.vn",
    },
    areaServed: [
      { "@type": "City", name: "Đà Nẵng" },
      { "@type": "Country", name: "Vietnam" },
    ],
    serviceType: [
      "Thiết kế Website",
      "Phát triển Web App",
      "Phát triển Mobile App",
    ],
    availableLanguage: ["vi", "en"],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased neo-page`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
