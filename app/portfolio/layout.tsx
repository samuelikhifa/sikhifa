import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - R2 Ruman | UI/UX Design Projects',
  description: 'Explore the comprehensive portfolio of R2 Ruman, featuring UI/UX design projects, web development work, and mobile app designs.',
  keywords: 'Portfolio, UI/UX Design, Web Development, Mobile Apps, Design Projects, R2 Ruman',
  openGraph: {
    title: 'Portfolio - R2 Ruman | UI/UX Design Projects',
    description: 'Explore the comprehensive portfolio of R2 Ruman, featuring UI/UX design projects, web development work, and mobile app designs.',
    url: 'https://r2ruman.com/portfolio',
    siteName: 'R2 Ruman Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'R2 Ruman Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://r2ruman.com/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 