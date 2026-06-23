window.BASHIRA_SEO = {
  siteUrl: 'https://bashiradigital.com',
  siteName: 'Bashira Digital',
  email: 'hola@bashiradigital.com',
  logo: 'https://bashiradigital.com/assets/bashira-lockup-horizontal.png',
  ogImage: 'https://bashiradigital.com/assets/bashira-lockup-horizontal.png',

  apply(lang) {
    const t = (window.BASHIRA_COPY && window.BASHIRA_COPY[lang]) || window.BASHIRA_COPY.es;
    const url = this.siteUrl + '/';

    document.documentElement.lang = lang;
    document.title = t.pageTitle;

    this.setMeta('name', 'description', t.metaDescription);
    this.setMeta('property', 'og:title', t.pageTitle);
    this.setMeta('property', 'og:description', t.ogDescription);
    this.setMeta('property', 'og:locale', lang === 'es' ? 'es_ES' : 'en_US');
    this.setMeta('property', 'og:url', url);
    this.setMeta('name', 'twitter:title', t.pageTitle);
    this.setMeta('name', 'twitter:description', t.ogDescription);
    this.setLink('canonical', url);
    this.setJsonLd(lang, t);
  },

  setMeta(attr, key, value) {
    const el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (el) el.setAttribute('content', value);
  },

  setLink(rel, href) {
    const el = document.querySelector('link[rel="' + rel + '"]');
    if (el) el.setAttribute('href', href);
  },

  setJsonLd(lang, t) {
    const el = document.getElementById('bashira-jsonld');
    if (!el) return;
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': this.siteUrl + '/#organization',
          name: this.siteName,
          url: this.siteUrl,
          logo: this.logo,
          email: this.email,
          description: t.metaDescription,
          areaServed: lang === 'es'
            ? ['Argentina', 'Latinoamérica', 'Europa']
            : ['Argentina', 'Latin America', 'Europe']
        },
        {
          '@type': 'WebSite',
          '@id': this.siteUrl + '/#website',
          url: this.siteUrl,
          name: this.siteName,
          description: t.metaDescription,
          inLanguage: ['es', 'en'],
          publisher: { '@id': this.siteUrl + '/#organization' }
        },
        {
          '@type': 'ProfessionalService',
          '@id': this.siteUrl + '/#service',
          name: this.siteName,
          url: this.siteUrl,
          image: this.ogImage,
          description: t.metaDescription,
          email: this.email,
          areaServed: lang === 'es'
            ? ['Argentina', 'Latinoamérica', 'Europa']
            : ['Argentina', 'Latin America', 'Europe'],
          serviceType: lang === 'es'
            ? ['Inteligencia Artificial', 'Desarrollo de Software', 'Marketing Digital', 'Producción Audiovisual']
            : ['Artificial Intelligence', 'Software Development', 'Digital Marketing', 'Audiovisual Production']
        }
      ]
    };
    el.textContent = JSON.stringify(data);
  }
};
