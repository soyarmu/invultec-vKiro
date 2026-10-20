import type { LegalSection } from '@/components/legal/LegalPage';

export const PRIVACY_UPDATED = '19 de octubre de 2026';

export const privacySections: LegalSection[] = [
  {
    id: 'responsable',
    heading: '1. Responsable del tratamiento',
    body: [
      'Invultec Colombia (en adelante, "Invultec") es el responsable del tratamiento de los datos personales recolectados a través de este sitio web, en cumplimiento de la Ley 1581 de 2012 y del Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015.',
      'Canal de atención y ejercicio de derechos: el WhatsApp oficial de ventas publicado en este sitio. Toda solicitud relacionada con datos personales será atendida por ese canal.',
    ],
  },
  {
    id: 'datos',
    heading: '2. Datos personales que recolectamos',
    body: [
      'A través del formulario de consulta de vehículo recolectamos únicamente: nombre completo, número de celular, marca, modelo y año del vehículo, y cantidad de productos de interés.',
      'Adicionalmente registramos la fecha y la evidencia de tu autorización (consentimiento) para tratar tus datos.',
      'No recolectamos datos sensibles (salud, biometría, orientación sexual, convicciones religiosas o políticas) ni datos de menores de edad.',
      'Por seguridad del sitio, el servidor procesa temporalmente tu dirección IP para limitar el número de solicitudes. Esta información no se almacena en bases de datos.',
    ],
  },
  {
    id: 'finalidades',
    heading: '3. Finalidades del tratamiento',
    body: [
      'Los datos se utilizan exclusivamente para: (i) contactarte y responder tu consulta sobre la compatibilidad del producto; (ii) enviarte la cotización y coordinar la compra por WhatsApp; (iii) realizar seguimiento comercial relacionado con tu solicitud; y (iv) atender garantías, devoluciones o reclamaciones.',
      'No utilizamos tus datos para enviar publicidad de terceros ni para perfilamiento con fines publicitarios.',
    ],
  },
  {
    id: 'base-legal',
    heading: '4. Base legal y consentimiento',
    body: [
      'La base legal del tratamiento es tu autorización previa, expresa e informada, otorgada al marcar la casilla de aceptación antes de enviar el formulario.',
      'El formulario no permite el envío de datos sin esa autorización. Puedes revocar el consentimiento en cualquier momento escribiendo al canal de atención indicado, sin que ello afecte la legalidad del tratamiento realizado antes de la revocatoria.',
    ],
  },
  {
    id: 'terceros',
    heading: '5. Terceros y encargados del tratamiento',
    body: [
      'Los datos se almacenan en Supabase, proveedor de base de datos en la nube que actúa como encargado del tratamiento bajo nuestras instrucciones.',
      'Cuando inicias una conversación desde el botón de WhatsApp, la conversación se desarrolla dentro de la plataforma WhatsApp (propiedad de Meta). El tratamiento de esos mensajes se rige además por las políticas de dicho proveedor.',
      'Este sitio no utiliza herramientas de analítica, píxeles publicitarios ni SDKs de terceros en el navegador.',
    ],
  },
  {
    id: 'retencion',
    heading: '6. Tiempo de conservación',
    body: [
      'Conservamos tus datos durante 24 meses contados desde el último contacto. Vencido ese plazo, los datos se eliminan o se anonimizan, salvo que exista una obligación legal de conservación.',
    ],
  },
  {
    id: 'derechos',
    heading: '7. Tus derechos como titular',
    body: [
      'De acuerdo con el artículo 8 de la Ley 1581 de 2012, tienes derecho a: conocer, actualizar y rectificar tus datos personales; solicitar prueba de la autorización otorgada; ser informado sobre el uso que se les da; presentar quejas ante la Superintendencia de Industria y Comercio (SIC); revocar la autorización y solicitar la supresión de los datos cuando no exista un deber legal de conservarlos; y acceder de forma gratuita a tus datos.',
      'Para ejercer estos derechos escríbenos por el WhatsApp oficial de atención. Responderemos consultas en un máximo de 10 días hábiles y reclamos en un máximo de 15 días hábiles, conforme a la ley. Si la solicitud resulta incompleta, te pediremos completarla dentro de los 5 días siguientes.',
    ],
  },
  {
    id: 'seguridad',
    heading: '8. Medidas de seguridad',
    body: [
      'Aplicamos controles de acceso, restricción de lectura de la base de datos al personal autorizado y validaciones en el servidor para evitar registros sin consentimiento. Ningún sistema es completamente infalible, pero adoptamos medidas razonables y proporcionales al volumen de datos tratado.',
    ],
  },
  {
    id: 'cambios',
    heading: '9. Cambios a esta política',
    body: [
      'Podemos actualizar esta política para reflejar cambios normativos u operativos. La versión vigente será siempre la publicada en esta página, con la fecha de última actualización visible en el encabezado.',
    ],
  },
  {
    id: 'autoridad',
    heading: '10. Autoridad de control',
    body: [
      'La Superintendencia de Industria y Comercio (SIC) es la autoridad competente para vigilar el cumplimiento de la normativa de protección de datos personales en Colombia. Puedes presentar consultas y reclamos en www.sic.gov.co.',
    ],
  },
];
