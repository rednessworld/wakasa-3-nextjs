import type { Language } from '@/context/LanguageContext';

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      menu: 'Carta',
      gallery: 'Galería',
      reservations: 'Reservas',
      location: 'Ubicación',
    },
    hero: {
      tagline: 'La auténtica cocina japonesa en el corazón de Barcelona',
      cta: 'Reservar mesa',
      scrollHint: 'Descubre Wakasa',
    },
    about: {
      title: 'Nuestra historia',
      subtitle: 'Desde Osaka hasta Barcelona',
      body1: 'Natsu y Taka llegaron a Barcelona desde Osaka en 2009 con una misión clara: traer la auténtica tasca japonesa a la ciudad. No fusión, no modas — cocina nipona de verdad, elaborada con producto fresco y máxima delicadeza.',
      body2: 'WAKASA 3.0 es su tercera ubicación — de ahí el nombre. Un espacio íntimo de apenas seis mesas donde cada visita es una experiencia personalizada. Taka explica con pasión cada plato; Natsu lo cocina con el alma.',
    },
    menu: {
      title: 'Nuestra carta',
      note: 'Carta sujeta a disponibilidad de producto fresco. Consulte con Taka.',
    },
    menuCategories: {
      entrantes: 'Entrantes',
      nigiris: 'Nigiris',
      makis: 'Makis',
      principales: 'Principales',
      postres: 'Postres',
      bebidas: 'Bebidas',
    },
    gallery: {
      title: 'Galería',
    },
    reservations: {
      title: 'Reservas',
      subtitle: 'Nuestro pequeño espacio se llena semanas antes — te recomendamos reservar con antelación',
      phoneLabel: 'Llamar para reservar',
      whatsapp: 'También por WhatsApp',
      hoursTitle: 'Horario',
      closed: 'Cerrado',
      hours: [
        { day: 'Lunes',     hours: '19:45 – 23:00' },
        { day: 'Martes',    hours: null },
        { day: 'Miércoles', hours: '19:45 – 23:00' },
        { day: 'Jueves',    hours: '19:45 – 23:00' },
        { day: 'Viernes',   hours: '19:45 – 23:00' },
        { day: 'Sábado',    hours: '19:45 – 23:00' },
        { day: 'Domingo',   hours: null },
      ],
    },
    testimonials: {
      title: 'Lo que dicen nuestros clientes',
      googleLink: 'Ver reseñas en Google',
    },
    location: {
      title: 'Encuéntranos',
      address: 'C/ de Nàpols, 287, 08025 Barcelona',
      metro: 'Metro: Sagrada Família (L2/L5)',
      parking: 'Parking: C/ de Nàpols, 292',
    },
    footer: {
      copyright: '© 2026 Tasca Japonesa WAKASA 3.0 · Barcelona',
      tagline: 'Auténtica cocina japonesa desde Osaka',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      menu: 'Menu',
      gallery: 'Gallery',
      reservations: 'Reservations',
      location: 'Location',
    },
    hero: {
      tagline: 'Authentic Japanese cuisine in the heart of Barcelona',
      cta: 'Book a table',
      scrollHint: 'Discover Wakasa',
    },
    about: {
      title: 'Our story',
      subtitle: 'From Osaka to Barcelona',
      body1: 'Natsu and Taka came to Barcelona from Osaka in 2009 with a clear mission: to bring the authentic Japanese izakaya to the city. No fusion, no trends — real Japanese cuisine, made with fresh produce and the utmost care.',
      body2: 'WAKASA 3.0 is their third location — hence the name. An intimate space of just six tables where every visit is a personalised experience. Taka passionately explains each dish; Natsu cooks it with soul.',
    },
    menu: {
      title: 'Our menu',
      note: 'Menu subject to availability of fresh produce. Please ask Taka.',
    },
    menuCategories: {
      entrantes: 'Starters',
      nigiris: 'Nigiri',
      makis: 'Maki',
      principales: 'Mains',
      postres: 'Desserts',
      bebidas: 'Drinks',
    },
    gallery: {
      title: 'Gallery',
    },
    reservations: {
      title: 'Reservations',
      subtitle: 'Our small space fills up weeks in advance — we recommend booking ahead',
      phoneLabel: 'Call to reserve',
      whatsapp: 'Also via WhatsApp',
      hoursTitle: 'Opening hours',
      closed: 'Closed',
      hours: [
        { day: 'Monday',    hours: '7:45pm – 11:00pm' },
        { day: 'Tuesday',   hours: null },
        { day: 'Wednesday', hours: '7:45pm – 11:00pm' },
        { day: 'Thursday',  hours: '7:45pm – 11:00pm' },
        { day: 'Friday',    hours: '7:45pm – 11:00pm' },
        { day: 'Saturday',  hours: '7:45pm – 11:00pm' },
        { day: 'Sunday',    hours: null },
      ],
    },
    testimonials: {
      title: 'What our guests say',
      googleLink: 'See Google reviews',
    },
    location: {
      title: 'Find us',
      address: 'C/ de Nàpols, 287, 08025 Barcelona',
      metro: 'Metro: Sagrada Família (L2/L5)',
      parking: 'Parking: C/ de Nàpols, 292',
    },
    footer: {
      copyright: '© 2026 Tasca Japonesa WAKASA 3.0 · Barcelona',
      tagline: 'Authentic Japanese cuisine from Osaka',
    },
  },
  cat: {
    nav: {
      home: 'Inici',
      about: 'Nosaltres',
      menu: 'Carta',
      gallery: 'Galeria',
      reservations: 'Reserves',
      location: 'Ubicació',
    },
    hero: {
      tagline: 'L\'autèntica cuina japonesa al cor de Barcelona',
      cta: 'Reservar taula',
      scrollHint: 'Descobreix Wakasa',
    },
    about: {
      title: 'La nostra història',
      subtitle: 'Des d\'Osaka fins a Barcelona',
      body1: 'Natsu i Taka van arribar a Barcelona des d\'Osaka el 2009 amb una missió clara: portar l\'autèntica tasca japonesa a la ciutat. Sense fusió, sense modes — cuina nipona de veritat, elaborada amb producte fresc i màxima delicadesa.',
      body2: 'WAKASA 3.0 és la seva tercera ubicació — d\'aquí el nom. Un espai íntim d\'només sis taules on cada visita és una experiència personalitzada. Taka explica amb passió cada plat; Natsu el cuina amb l\'ànima.',
    },
    menu: {
      title: 'La nostra carta',
      note: 'Carta subjecta a disponibilitat de producte fresc. Consulteu amb Taka.',
    },
    menuCategories: {
      entrantes: 'Entrants',
      nigiris: 'Nigiris',
      makis: 'Makis',
      principales: 'Principals',
      postres: 'Postres',
      bebidas: 'Begudes',
    },
    gallery: {
      title: 'Galeria',
    },
    reservations: {
      title: 'Reserves',
      subtitle: 'El nostre petit espai s\'omple setmanes abans — us recomanem reservar amb antelació',
      phoneLabel: 'Trucar per reservar',
      whatsapp: 'També per WhatsApp',
      hoursTitle: 'Horari',
      closed: 'Tancat',
      hours: [
        { day: 'Dilluns',    hours: '19:45 – 23:00' },
        { day: 'Dimarts',    hours: null },
        { day: 'Dimecres',   hours: '19:45 – 23:00' },
        { day: 'Dijous',     hours: '19:45 – 23:00' },
        { day: 'Divendres',  hours: '19:45 – 23:00' },
        { day: 'Dissabte',   hours: '19:45 – 23:00' },
        { day: 'Diumenge',   hours: null },
      ],
    },
    testimonials: {
      title: 'El que diuen els nostres clients',
      googleLink: 'Veure ressenyes a Google',
    },
    location: {
      title: 'Trobeu-nos',
      address: 'C/ de Nàpols, 287, 08025 Barcelona',
      metro: 'Metro: Sagrada Família (L2/L5)',
      parking: 'Pàrquing: C/ de Nàpols, 292',
    },
    footer: {
      copyright: '© 2026 Tasca Japonesa WAKASA 3.0 · Barcelona',
      tagline: 'Autèntica cuina japonesa des d\'Osaka',
    },
  },
};

export type Translations = typeof translations.es;

export function t(language: Language): Translations {
  return translations[language] as Translations;
}

export default translations;
