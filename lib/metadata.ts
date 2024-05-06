type Robots = {
  follow: boolean;
  'max-snippet': number;
  'max-video-preview': number;
  'max-image-preview': 'large';
};

export const robots: Robots = {
  follow: true,
  'max-snippet': -1,
  'max-video-preview': -1,
  'max-image-preview': 'large',
};

export const openGraph = {
  url: '/',
  type: 'website',
  locale: 'en_US',
  images: '/layout/og-image.png',
  siteName: 'Lunchtime Poll',
};
