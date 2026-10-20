import type { LegalSection } from '@/components/legal/LegalPage';

export const COOKIES_UPDATED = '19 de octubre de 2026';

export const cookiesSections: LegalSection[] = [
  {
    id: 'que-son',
    heading: '1. Qué son las cookies',
    body: [
      'Las cookies son pequeños archivos que un sitio web almacena en tu navegador para recordar información entre visitas o durante una misma sesión. Existen también tecnologías similares, como el almacenamiento local (localStorage) y el almacenamiento de sesión (sessionStorage).',
    ],
  },
  {
    id: 'estado-actual',
    heading: '2. Cookies que utiliza este sitio actualmente',
    body: [
      'Este sitio no utiliza cookies analíticas, publicitarias ni de perfilamiento, y no carga SDKs de terceros en el navegador.',
      'Las únicas cookies o almacenamiento que pueden existir son las estrictamente necesarias para el funcionamiento técnico de la plataforma de alojamiento y del framework del sitio. Estas no requieren consentimiento previo porque no recopilan información con fines comerciales ni identifican al usuario.',
      'Los datos que ingresas en el formulario de consulta se envían al servidor únicamente cuando presionas el botón de envío, y solo después de autorizar la Política de Privacidad.',
    ],
  },
  {
    id: 'terceros',
    heading: '3. Servicios de terceros',
    body: [
      'Al hacer clic en el botón de WhatsApp, abandonas este sitio y pasas a una plataforma externa operada por Meta. Esa plataforma puede aplicar sus propias cookies, sobre las cuales no tenemos control.',
      'No utilizamos Google Analytics, Meta Pixel, Hotjar, TikTok Pixel ni herramientas similares.',
    ],
  },
  {
    id: 'gestion',
    heading: '4. Cómo gestionar cookies en tu navegador',
    body: [
      'Puedes configurar tu navegador para bloquear, eliminar o recibir avisos sobre cookies. Ten en cuenta que bloquear las cookies estrictamente necesarias puede afectar el funcionamiento básico del sitio.',
      'Las instrucciones específicas dependen del navegador: Chrome, Firefox, Safari y Edge cuentan con secciones de privacidad donde puedes administrar estos permisos.',
    ],
  },
  {
    id: 'futuro',
    heading: '5. Compromiso sobre cookies no esenciales',
    body: [
      'Si en el futuro incorporamos herramientas de analítica o publicidad que utilicen cookies no esenciales, implementaremos previamente un sistema de consentimiento que te permita aceptar o rechazar dichas cookies antes de que se activen, y actualizaremos esta política.',
    ],
  },
  {
    id: 'contacto',
    heading: '6. Contacto',
    body: [
      'Para cualquier pregunta sobre esta política puedes escribirnos por el WhatsApp oficial de ventas. Consulta también nuestra Política de Privacidad.',
    ],
  },
];
