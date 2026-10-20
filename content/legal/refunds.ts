import type { LegalSection } from '@/components/legal/LegalPage';

export const REFUNDS_UPDATED = '19 de octubre de 2026';

export const refundsSections: LegalSection[] = [
  {
    id: 'alcance',
    heading: '1. Alcance de esta política',
    body: [
      'Esta política aplica a todas las compras de Rubber Shock RS-001 realizadas a distancia, es decir, coordinadas y cerradas por WhatsApp u otro canal no presencial, dentro del territorio colombiano.',
      'Se rige por la Ley 1480 de 2011 (Estatuto del Consumidor) y sus normas reglamentarias.',
    ],
  },
  {
    id: 'retracto',
    heading: '2. Derecho de retracto',
    body: [
      'En las ventas a distancia tienes derecho a retractarte de la compra dentro de los cinco (5) días hábiles siguientes a la entrega del producto, sin necesidad de justificar tu decisión y sin penalidad alguna, conforme al artículo 47 de la Ley 1480 de 2011.',
      'Para ejercer el retracto debes comunicarte por el WhatsApp oficial de atención dentro de ese plazo e informar el número de pedido o el nombre con el que realizaste la compra.',
      'El producto debe devolverse en las mismas condiciones en que fue recibido: sin uso, con todos sus componentes y empaques. Los costos de transporte de la devolución por retracto son asumidos por Invultec. Si el producto presenta señales de uso, desgaste o falta de componentes, podrá aplicarse una depreciación razonable.',
    ],
  },
  {
    id: 'devoluciones',
    heading: '3. Devoluciones por producto defectuoso',
    body: [
      'Si el producto presenta un defecto de fabricación, tienes derecho a la garantía legal contemplada en la Ley 1480 de 2011: reparación, reposición o devolución del dinero, a tu elección.',
      'Para iniciar el proceso envía por WhatsApp: nombre, número de celular de la compra, fecha de entrega, descripción del defecto y fotografías o video del producto. Evaluaremos el caso y te indicaremos si el producto debe enviarse para revisión técnica.',
    ],
  },
  {
    id: 'proceso',
    heading: '4. Proceso de solicitud',
    body: [
      '1. Escribe al WhatsApp oficial de atención e indica si se trata de retracto o de garantía.',
      '2. Nuestro equipo confirma la solicitud y te indica la dirección o medio para enviar el producto.',
      '3. Una vez recibido y verificado el producto, procesamos la devolución del dinero o la reposición según corresponda.',
      '4. Te informamos por el mismo canal cuando el proceso esté resuelto.',
    ],
  },
  {
    id: 'plazos',
    heading: '5. Plazos de respuesta y reintegro',
    body: [
      'Confirmamos la recepción de tu solicitud dentro de los tres (3) días hábiles siguientes. El reintegro del dinero se realiza por el mismo medio de pago utilizado, dentro de los treinta (30) días calendario siguientes a la verificación del producto, plazo máximo legal para la devolución del dinero en las ventas a distancia.',
      'Cuando corresponda reposición del producto y no haya disponibilidad inmediata, te informaremos el tiempo estimado de entrega.',
    ],
  },
  {
    id: 'exclusiones',
    heading: '6. Casos no cubiertos',
    body: [
      'No procede devolución por cambio de opinión después de vencido el plazo de retracto, ni por daños ocasionados por instalación incorrecta, uso en un vehículo no compatible, modificaciones al producto o desgaste normal por uso.',
      'Esta política no limita los derechos irrenunciables que la ley reconoce al consumidor.',
    ],
  },
  {
    id: 'garantia',
    heading: '7. Garantía del producto',
    body: [
      'El Rubber Shock RS-001 cuenta con garantía por defectos de fabricación. La vigencia y las condiciones específicas de la garantía se informan con la cotización y en el empaque del producto.',
      'La garantía no cubre el desgaste natural, daños por accidentes, ni fallas derivadas de la instalación o del estado previo de la suspensión del vehículo.',
    ],
  },
  {
    id: 'contacto',
    heading: '8. Canal de atención',
    body: [
      'Todas las solicitudes de retracto, garantía y reembolso se gestionan por el WhatsApp oficial de ventas publicado en este sitio. También puedes presentar quejas ante la Superintendencia de Industria y Comercio (SIC) en www.sic.gov.co.',
    ],
  },
];
