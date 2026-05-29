// JurisGO — Mock data (Costa Rica context)

export interface Specialty {
  id: string;
  label_es: string;
  label_en: string;
  icon: string;
}

export interface Office {
  city: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Lawyer {
  id: string;
  slug: string;
  name: string;
  title: string;
  avatar: string;
  verified: boolean;
  rating: number;
  reviews: number;
  specialties: string[];
  primarySpecialty: string;
  languages: string[];
  locations: string[];
  offices: Office[];
  yearsExp: number;
  consultPrice: number;
  consultPriceFormatted: string;
  bio: string;
  education: string[];
  certifications: string[];
  cases: string[];
  responseTime: string;
  available: boolean;
  featured: boolean;
}

export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface UrgencyOption {
  id: string;
  label_es: string;
  label_en: string;
  emoji: string;
}

export interface BudgetOption {
  id: string;
  label_es: string;
  label_en: string;
  range: string;
}

export const SPECIALTIES: Specialty[] = [
  { id: 'familiar', label_es: 'Derecho Familiar', label_en: 'Family Law', icon: '⚖' },
  { id: 'laboral', label_es: 'Derecho Laboral', label_en: 'Labor Law', icon: '⚖' },
  { id: 'penal', label_es: 'Derecho Penal', label_en: 'Criminal Law', icon: '⚖' },
  { id: 'mercantil', label_es: 'Derecho Mercantil', label_en: 'Commercial Law', icon: '⚖' },
  { id: 'inmobiliario', label_es: 'Inmobiliario', label_en: 'Real Estate', icon: '⚖' },
  { id: 'fiscal', label_es: 'Fiscal y Tributario', label_en: 'Tax Law', icon: '⚖' },
  { id: 'migratorio', label_es: 'Migratorio', label_en: 'Immigration', icon: '⚖' },
  { id: 'corporativo', label_es: 'Corporativo', label_en: 'Corporate', icon: '⚖' },
  { id: 'civil', label_es: 'Civil', label_en: 'Civil Law', icon: '⚖' },
  { id: 'notariado', label_es: 'Notariado', label_en: 'Notary', icon: '⚖' },
  { id: 'propiedad', label_es: 'Propiedad Intelectual', label_en: 'IP Law', icon: '⚖' },
  { id: 'consumidor', label_es: 'Derecho del Consumidor', label_en: 'Consumer', icon: '⚖' },
];

export const LOCATIONS: string[] = [
  'San José', 'Escazú', 'Santa Ana', 'Heredia', 'Alajuela', 'Cartago',
  'Liberia', 'Guanacaste', 'Puntarenas', 'Limón', 'Curridabat', 'Pavas',
];

export const URGENCY_OPTIONS: UrgencyOption[] = [
  { id: 'asap', label_es: 'Urgente (24-48h)', label_en: 'Urgent (24-48h)', emoji: '🔥' },
  { id: 'week', label_es: 'Esta semana', label_en: 'This week', emoji: '⏱' },
  { id: 'month', label_es: 'Este mes', label_en: 'This month', emoji: '📅' },
  { id: 'explore', label_es: 'Solo explorando', label_en: 'Just exploring', emoji: '🔍' },
];

export const BUDGET_OPTIONS: BudgetOption[] = [
  { id: 'consult', label_es: 'Solo consulta inicial', label_en: 'Initial consult only', range: '₡15.000 - ₡40.000' },
  { id: 'low', label_es: 'Económico', label_en: 'Budget', range: '₡40.000 - ₡150.000' },
  { id: 'mid', label_es: 'Estándar', label_en: 'Standard', range: '₡150.000 - ₡500.000' },
  { id: 'high', label_es: 'Alto perfil', label_en: 'Premium', range: '₡500.000+' },
  { id: 'pending', label_es: 'A definir', label_en: 'To define', range: '—' },
];

function avatar(initials: string, bg: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
    <rect width='120' height='120' fill='${bg}'/>
    <text x='60' y='74' font-family='Georgia, serif' font-size='52' font-weight='400' fill='white' text-anchor='middle' letter-spacing='-1'>${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const LAWYERS: Lawyer[] = [
  {
    id: 'andrea-vargas',
    slug: 'andrea-vargas-solano',
    name: 'Andrea Vargas Solano',
    title: 'Licda.',
    avatar: avatar('AV', '#0B1F4D'),
    verified: true,
    rating: 4.9,
    reviews: 127,
    specialties: ['familiar', 'civil'],
    primarySpecialty: 'Derecho Familiar',
    languages: ['Español', 'Inglés'],
    locations: ['San José', 'Escazú'],
    offices: [
      { city: 'San José', address: 'Edificio Las Arcadas, Av. 2, San José', lat: 9.9325, lng: -84.0795 },
      { city: 'Escazú', address: 'Plaza Tempo, San Rafael de Escazú', lat: 9.9215, lng: -84.1410 },
    ],
    yearsExp: 14,
    consultPrice: 25000,
    consultPriceFormatted: '₡25.000',
    bio: 'Especialista en divorcios consensuados, pensiones alimentarias y procesos de adopción. He acompañado a más de 400 familias en transiciones difíciles, priorizando siempre el bienestar de los menores y acuerdos sostenibles a largo plazo.',
    education: ['Lic. Derecho — Universidad de Costa Rica, 2010', 'Maestría en Derecho de Familia — UNED, 2013'],
    certifications: ['Colegio de Abogados y Abogadas de Costa Rica — Carné 18472', 'Mediadora certificada — Ministerio de Justicia'],
    cases: ['+400 procesos familiares resueltos', '92% acuerdos extrajudiciales', 'Atención bilingüe ES/EN'],
    responseTime: '< 2 horas',
    available: true,
    featured: true,
  },
  {
    id: 'mauricio-quesada',
    slug: 'mauricio-quesada-ramirez',
    name: 'Mauricio Quesada Ramírez',
    title: 'Lic.',
    avatar: avatar('MQ', '#0F172A'),
    verified: true,
    rating: 4.8,
    reviews: 89,
    specialties: ['penal', 'civil'],
    primarySpecialty: 'Derecho Penal',
    languages: ['Español'],
    locations: ['San José'],
    offices: [
      { city: 'San José', address: 'Torre Mercedes, Paseo Colón, San José', lat: 9.9355, lng: -84.0890 },
    ],
    yearsExp: 18,
    consultPrice: 40000,
    consultPriceFormatted: '₡40.000',
    bio: 'Litigante penal con casi dos décadas defendiendo casos de cuello blanco, delitos financieros y casos de alto perfil mediático. Defensa técnica rigurosa con énfasis en derechos fundamentales.',
    education: ['Lic. Derecho — Universidad de Costa Rica, 2006', 'Especialización en Derecho Penal Económico — Universidad Salamanca'],
    certifications: ['Colegio de Abogados — Carné 14289', 'Miembro AILAP'],
    cases: ['+200 juicios orales', '78% absoluciones o reducciones', 'Disponibilidad 24/7 para casos urgentes'],
    responseTime: '< 1 hora',
    available: true,
    featured: true,
  },
  {
    id: 'isabela-mora',
    slug: 'isabela-mora-jimenez',
    name: 'Isabela Mora Jiménez',
    title: 'Licda.',
    avatar: avatar('IM', '#14B8A6'),
    verified: true,
    rating: 5.0,
    reviews: 64,
    specialties: ['mercantil', 'corporativo'],
    primarySpecialty: 'Mercantil y Corporativo',
    languages: ['Español', 'Inglés', 'Portugués'],
    locations: ['Escazú', 'Santa Ana'],
    offices: [
      { city: 'Escazú', address: 'Avenida Escazú, Torre 1, Piso 8', lat: 9.9180, lng: -84.1395 },
    ],
    yearsExp: 11,
    consultPrice: 50000,
    consultPriceFormatted: '₡50.000',
    bio: 'Asesoría corporativa para startups, M&A y estructuración de inversión extranjera. Más de 60 sociedades constituidas y 14 transacciones internacionales cerradas.',
    education: ['Lic. Derecho — Universidad Latina, 2013', 'LLM Corporate Law — IE Madrid, 2016'],
    certifications: ['Colegio de Abogados — Carné 21034', 'Notaria pública'],
    cases: ['60+ sociedades constituidas', '14 transacciones M&A', 'Práctica trilingüe'],
    responseTime: '< 4 horas',
    available: true,
    featured: true,
  },
  {
    id: 'esteban-rojas',
    slug: 'esteban-rojas-castro',
    name: 'Esteban Rojas Castro',
    title: 'Lic.',
    avatar: avatar('ER', '#1E40AF'),
    verified: true,
    rating: 4.7,
    reviews: 152,
    specialties: ['laboral'],
    primarySpecialty: 'Derecho Laboral',
    languages: ['Español'],
    locations: ['Heredia', 'San José'],
    offices: [
      { city: 'Heredia', address: 'Centro Comercial Paseo de las Flores', lat: 9.9985, lng: -84.1170 },
    ],
    yearsExp: 9,
    consultPrice: 20000,
    consultPriceFormatted: '₡20.000',
    bio: 'Defensa de derechos laborales del trabajador. Despidos injustificados, acoso laboral, pago de prestaciones y demandas colectivas. Atención cercana y honorarios transparentes.',
    education: ['Lic. Derecho — UNA, 2015'],
    certifications: ['Colegio de Abogados — Carné 23811'],
    cases: ['+300 reclamos laborales', '85% conciliación favorable', 'Honorarios por resultado disponibles'],
    responseTime: '< 6 horas',
    available: true,
    featured: false,
  },
  {
    id: 'camila-soto',
    slug: 'camila-soto-arias',
    name: 'Camila Soto Arias',
    title: 'Licda.',
    avatar: avatar('CS', '#0891B2'),
    verified: true,
    rating: 4.9,
    reviews: 73,
    specialties: ['migratorio', 'familiar'],
    primarySpecialty: 'Derecho Migratorio',
    languages: ['Español', 'Inglés', 'Francés'],
    locations: ['San José', 'Heredia'],
    offices: [
      { city: 'San José', address: 'Barrio Escalante, Calle 35', lat: 9.9355, lng: -84.0660 },
    ],
    yearsExp: 8,
    consultPrice: 30000,
    consultPriceFormatted: '₡30.000',
    bio: 'Residencias, naturalizaciones, refugio y reunificación familiar. Apoyo a inversionistas y nómadas digitales con la categoría de Rentista, Inversionista y Estancia.',
    education: ['Lic. Derecho — UCR, 2016', 'Diplomado en Derecho Migratorio — IIDH'],
    certifications: ['Colegio de Abogados — Carné 24502'],
    cases: ['+250 residencias gestionadas', 'Asesoría a 40+ nómadas digitales', 'Práctica trilingüe'],
    responseTime: '< 3 horas',
    available: true,
    featured: true,
  },
  {
    id: 'diego-hernandez',
    slug: 'diego-hernandez-mata',
    name: 'Diego Hernández Mata',
    title: 'Lic.',
    avatar: avatar('DH', '#7C3AED'),
    verified: true,
    rating: 4.6,
    reviews: 91,
    specialties: ['inmobiliario', 'notariado'],
    primarySpecialty: 'Inmobiliario',
    languages: ['Español', 'Inglés'],
    locations: ['Guanacaste', 'Liberia'],
    offices: [
      { city: 'Liberia', address: 'Plaza Liberia, Av. Central', lat: 10.6346, lng: -85.4376 },
    ],
    yearsExp: 12,
    consultPrice: 35000,
    consultPriceFormatted: '₡35.000',
    bio: 'Compraventa de propiedades, due diligence inmobiliario y trámites notariales en zona costera. Atención especializada a compradores extranjeros y proyectos en Guanacaste.',
    education: ['Lic. Derecho — Universidad Latina, 2012', 'Especialización Notarial — UCR'],
    certifications: ['Colegio de Abogados — Carné 19872', 'Notario Público activo'],
    cases: ['+180 transacciones inmobiliarias', 'Especialista en zona marítimo-terrestre', 'Práctica bilingüe'],
    responseTime: '< 8 horas',
    available: false,
    featured: false,
  },
  {
    id: 'valeria-castillo',
    slug: 'valeria-castillo-arce',
    name: 'Valeria Castillo Arce',
    title: 'Licda.',
    avatar: avatar('VC', '#DC2626'),
    verified: true,
    rating: 4.8,
    reviews: 58,
    specialties: ['fiscal', 'corporativo'],
    primarySpecialty: 'Fiscal y Tributario',
    languages: ['Español', 'Inglés'],
    locations: ['San José', 'Escazú'],
    offices: [
      { city: 'Escazú', address: 'Distrito 4, Avenida Escazú', lat: 9.9170, lng: -84.1400 },
    ],
    yearsExp: 13,
    consultPrice: 45000,
    consultPriceFormatted: '₡45.000',
    bio: 'Planificación fiscal, defensa ante Tributación Directa y cumplimiento tributario para PYMES y multinacionales. Ex-funcionaria de Hacienda con experiencia en auditorías.',
    education: ['Lic. Derecho — UCR, 2011', 'Maestría en Derecho Tributario — ULACIT'],
    certifications: ['Colegio de Abogados — Carné 20155'],
    cases: ['+120 procesos ante Tributación', 'Defensa de auditorías por +US$5M', 'Bilingüe'],
    responseTime: '< 4 horas',
    available: true,
    featured: false,
  },
  {
    id: 'jose-pablo-arias',
    slug: 'jose-pablo-arias-mora',
    name: 'José Pablo Arias Mora',
    title: 'Lic.',
    avatar: avatar('JA', '#0F766E'),
    verified: false,
    rating: 4.4,
    reviews: 22,
    specialties: ['consumidor', 'civil'],
    primarySpecialty: 'Derecho del Consumidor',
    languages: ['Español'],
    locations: ['Alajuela'],
    offices: [
      { city: 'Alajuela', address: 'Centro de Alajuela, Calle 2', lat: 10.0162, lng: -84.2118 },
    ],
    yearsExp: 5,
    consultPrice: 18000,
    consultPriceFormatted: '₡18.000',
    bio: 'Defensa del consumidor ante MEIC, garantías, devoluciones y abusos comerciales. Atención accesible y honorarios por resultado en casos seleccionados.',
    education: ['Lic. Derecho — UNED, 2019'],
    certifications: ['En proceso de verificación'],
    cases: ['+50 reclamos MEIC', 'Honorarios por resultado'],
    responseTime: '< 12 horas',
    available: true,
    featured: false,
  },
];

export const REVIEWS: Record<string, Review[]> = {
  'andrea-vargas': [
    { author: 'María R.', date: 'Hace 2 semanas', rating: 5, text: 'Andrea me acompañó en un proceso de divorcio muy complicado. Su empatía y profesionalismo hicieron toda la diferencia. Siempre disponible, siempre clara con los costos.' },
    { author: 'Roberto S.', date: 'Hace 1 mes', rating: 5, text: 'Excelente abogada. Resolvió mi pensión alimentaria en tiempo récord y sin necesidad de juicio. Honorarios justos.' },
    { author: 'Carolina M.', date: 'Hace 2 meses', rating: 4, text: 'Muy buena atención. Solo un pequeño retraso en una etapa, pero compensó con respuestas detalladas siempre que pregunté.' },
  ],
  'mauricio-quesada': [
    { author: 'Anónimo', date: 'Hace 3 semanas', rating: 5, text: 'Llevé un caso muy complicado y Mauricio mantuvo la calma cuando yo no podía. Defensa impecable.' },
    { author: 'Felipe A.', date: 'Hace 2 meses', rating: 5, text: 'Disponibilidad real 24/7. Me llamó un domingo a las 9pm para discutir estrategia.' },
  ],
  'isabela-mora': [
    { author: 'Tech Founder', date: 'Hace 1 semana', rating: 5, text: 'Constituyó nuestra S.A. y nos asesoró en la ronda seed. Sabe lo que es una startup, no nos trató como cliente corporativo grande.' },
    { author: 'Carlos V.', date: 'Hace 1 mes', rating: 5, text: 'Asesoría en M&A internacional de primer nivel. Trilingüe real, no de currículum.' },
  ],
};

export const SPECIALTY_COUNTS: Record<string, number> = {
  familiar: 423, laboral: 612, penal: 287, mercantil: 198,
  inmobiliario: 254, fiscal: 167, migratorio: 102, corporativo: 178,
  civil: 521, notariado: 312, propiedad: 64, consumidor: 88,
};
