export type MediaOrigin =
  | 'ai-generated'
  | 'stock'
  | 'own-photography'
  | 'commissioned';

export type LicenseStatus = 'LICENSED' | 'PENDING_LICENSE' | 'RESTRICTED';

export interface MediaProvenance {
  path: string;
  origin: MediaOrigin;
  authorOrTool: string;
  license: string;
  licenseStatus: LicenseStatus;
  addedAt: string;
  restrictions?: string;
}

export const MEDIA_PROVENANCE: MediaProvenance[] = [
  {
    path: '/images/agent_generate_image___3D_photorealistic_cinematic_product_render__X_ray_side_view_.png',
    origin: 'ai-generated',
    authorOrTool: 'Pendiente de documentar',
    license: 'Pendiente de verificar',
    licenseStatus: 'PENDING_LICENSE',
    addedAt: '2026-10-19',
    restrictions:
      'No publicar en producción hasta documentar la herramienta de generación y los derechos de uso comercial.',
  },
];
