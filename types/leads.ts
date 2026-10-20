export interface LeadPayload {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  quantity?: number;
  consentGiven: boolean;
  hp?: string;
}
