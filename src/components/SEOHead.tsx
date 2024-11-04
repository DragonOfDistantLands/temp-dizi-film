import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEOHead({
  title = 'Series Download - Dizi ve Film İndirme Platformu',
  description = 'En iyi dizi ve filmleri ücretsiz indirin. HD kalitede, Türkçe altyazılı içerikler.',
  type = 'website',
  image = '/og-image.jpg',
  url = 'https://seriesdownload.com',
  keywords = 'dizi indir, film indir, ücretsiz dizi, ücretsiz film, HD dizi, HD film, türkçe altyazılı',
  publishedTime,
  modifiedTime,
}: SEOHeadProps) {
  const siteTitle = title === 'Series Download' ? title : `${title} | Series Download`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="Series Download" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="tr_TR" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Language Alternates */}
      <link rel="alternate" href={url} hrefLang="tr-TR" />
      <link rel="alternate" href={`${url}/en`} hrefLang="en" />
    </Helmet>
  );
}