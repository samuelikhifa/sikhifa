import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Samuel Ikhifa | Web Developer & SEO Specialist',
  description: 'Explore a passionate Web Developer and SEO Specialist from Nigeria. Discover my journey, skills, and approach to creating exceptional digital experiences.',
  keywords: 'Portfolio, Samuel Ikhifa, Web Developer, SEO Specialist, Nigeria, Portfolio, Experience',
  openGraph: {
    title: 'Portfolio - Samuel Ikhifa | Web Developer & SEO Specialist',
    description: 'Explore the comprehensive portfolio of Samuel, featuring UI/UX design projects, web development work, and SEO Optimization.',
    url: 'https://samuelikhifa.com/portfolio',
    siteName: 'Samuel Portfolio',
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