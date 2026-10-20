export interface CompanyData {
  legalName: string;
  tradeName: string;
  nit: string;
  registrationNumber: string;
  registrationEntity: string;
  legalForm: string;
  incorporationDate: string;
  economicActivity: string;
  address: string;
  city: string;
  department: string;
  country: string;
  email: string;
  whatsapp: string;
  website: string;
}

export const COMPANY_DATA: CompanyData = {
  legalName: 'Invultec Colombia S.A.S.',
  tradeName: 'Invultec Colombia',
  nit: '901.481.059-5',
  registrationNumber: '3372873',
  registrationEntity: 'Cámara de Comercio de Bogotá',
  legalForm: 'Sociedad por Acciones Simplificada (S.A.S.)',
  incorporationDate: '30 de abril de 2021',
  economicActivity:
    'Fabricación de formas básicas de caucho y otros productos de caucho n.c.p. (CIIU)',
  address: 'Calle 68A # 98-33',
  city: 'Bogotá D.C.',
  department: 'Cundinamarca',
  country: 'Colombia',
  email: 'invultec@gmail.com',
  whatsapp: '573172130907',
  website: 'https://invultec.com',
};
