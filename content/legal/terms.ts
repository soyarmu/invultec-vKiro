import type { LegalSection } from '@/components/legal/LegalPage';

export const TERMS_UPDATED = '19 de octubre de 2026';

export const termsSections: LegalSection[] = [
  {
    id: 'identificacion',
    heading: '1. Identificación del responsable',
    body: [
      'Este sitio web es operado por Invultec Colombia, distribuidor del producto Rubber Shock RS-001. El canal oficial de atención, cotización y cierre de ventas es el WhatsApp publicado en el sitio.',
      'Al utilizar este sitio aceptas los presentes Términos del Servicio. Si no estás de acuerdo, debes abstenerte de usar el sitio.',
    ],
  },
  {
    id: 'objeto',
    heading: '2. Objeto del servicio',
    body: [
      'Este sitio tiene como finalidad informar sobre el producto Rubber Shock RS-001, ayudar a identificar la compatibilidad con tu vehículo y facilitar el contacto con nuestro equipo de ventas por WhatsApp.',
      'La información de compatibilidad es una orientación basada en los datos que ingresas (marca, modelo y año). La confirmación definitiva se realiza con un asesor antes de la compra.',
    ],
  },
  {
    id: 'uso',
    heading: '3. Condiciones de uso',
    body: [
      'Te comprometes a suministrar información veraz y a no utilizar el sitio para fines ilícitos, para enviar datos de terceros sin su autorización, para intentar acceder a información de otros usuarios o para interferir con el funcionamiento del servicio.',
      'Nos reservamos el derecho de limitar o bloquear el acceso ante usos abusivos, incluidos envíos automatizados o masivos de solicitudes.',
    ],
  },
  {
    id: 'informacion',
    heading: '4. Información publicada',
    body: [
      'Las especificaciones técnicas, imágenes y descripciones del producto se presentan de forma ilustrativa. El empaque, las tolerancias y los componentes pueden variar ligeramente sin que ello afecte la funcionalidad del producto.',
      'Los valores de rendimiento publicados corresponden a mediciones internas de Invultec sobre componentes nuevos en condiciones de laboratorio y pueden variar según el vehículo, el estado de la suspensión y las condiciones de uso.',
    ],
  },
  {
    id: 'responsabilidad',
    heading: '5. Limitación de responsabilidad',
    body: [
      'La instalación del producto debe realizarla personal idóneo. Invultec no responde por daños derivados de una instalación incorrecta, del uso del producto en un vehículo no compatible o de la modificación del producto.',
      'No garantizamos la disponibilidad ininterrumpida del sitio web ni la ausencia de errores. En la medida permitida por la ley, no respondemos por daños indirectos o lucro cesante derivados del uso del sitio.',
      'Nada en estos términos limita los derechos que la Ley 1480 de 2011 reconoce al consumidor.',
    ],
  },
  {
    id: 'propiedad',
    heading: '6. Propiedad intelectual',
    body: [
      'Los textos, marcas, imágenes, renders, diseños y código fuente de este sitio son propiedad de Invultec o se utilizan con autorización. No pueden reproducirse, distribuirse ni modificarse sin autorización escrita.',
    ],
  },
  {
    id: 'enlaces',
    heading: '7. Enlaces a terceros',
    body: [
      'El sitio incluye enlaces a servicios de terceros, como WhatsApp. No controlamos dichos servicios ni somos responsables de sus contenidos o prácticas. Tu interacción con ellos se rige por sus propios términos.',
    ],
  },
  {
    id: 'legislacion',
    heading: '8. Ley aplicable y jurisdicción',
    body: [
      'Estos términos se rigen por las leyes de la República de Colombia, en particular por la Ley 1480 de 2011 (Estatuto del Consumidor). Cualquier controversia se someterá a la jurisdicción colombiana y a los mecanismos de protección al consumidor disponibles ante la Superintendencia de Industria y Comercio (SIC).',
    ],
  },
  {
    id: 'modificaciones',
    heading: '9. Modificaciones',
    body: [
      'Podemos modificar estos términos en cualquier momento. La versión vigente es la publicada en esta página; el uso continuado del sitio después de una modificación implica su aceptación.',
    ],
  },
];
