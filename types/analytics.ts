/**
 * Analytics Event Types
 */
export type AnalyticsEvent =
  | 'vehicle_finder_viewed'
  | 'make_selected'
  | 'model_selected'
  | 'year_selected'
  | 'fitment_check_started'
  | 'fitment_match_found'
  | 'measurement_required'
  | 'fitment_no_match'
  | 'measurement_completed'
  | 'product_viewed'
  | 'product_cta_clicked';

/**
 * Analytics Event Data
 */
export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, unknown>;
  timestamp?: number;
}
