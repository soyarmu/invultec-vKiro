import { AnalyticsEvent, AnalyticsEventData } from '@/types/analytics';

/**
 * Analytics abstraction layer
 * 
 * This provides a clean interface for tracking events without
 * hardcoding any specific analytics provider (Google Analytics, Segment, etc.)
 * 
 * In production, implement the actual tracking logic here
 */

class Analytics {
  private enabled: boolean = true;

  /**
   * Track an analytics event
   */
  track(event: AnalyticsEvent, properties?: Record<string, unknown>): void {
    if (!this.enabled) return;

    const eventData: AnalyticsEventData = {
      event,
      properties,
      timestamp: Date.now(),
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventData);
    }

    // In production, send to your analytics provider:
    // - Google Analytics: gtag('event', event, properties)
    // - Segment: analytics.track(event, properties)
    // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) })
  }

  /**
   * Enable analytics tracking
   */
  enable(): void {
    this.enabled = true;
  }

  /**
   * Disable analytics tracking
   */
  disable(): void {
    this.enabled = false;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Convenience functions for common events
export const trackVehicleFinderViewed = () => {
  analytics.track('vehicle_finder_viewed');
};

export const trackMakeSelected = (make: string) => {
  analytics.track('make_selected', { make });
};

export const trackModelSelected = (make: string, model: string) => {
  analytics.track('model_selected', { make, model });
};

export const trackYearSelected = (make: string, model: string, year: number) => {
  analytics.track('year_selected', { make, model, year });
};

export const trackFitmentCheckStarted = (
  make: string,
  model: string,
  year: number
) => {
  analytics.track('fitment_check_started', { make, model, year });
};

export const trackFitmentMatchFound = (
  make: string,
  model: string,
  year: number,
  type: string,
  confidence: string
) => {
  analytics.track('fitment_match_found', {
    make,
    model,
    year,
    type,
    confidence,
  });
};

export const trackMeasurementRequired = (
  make: string,
  model: string,
  year: number
) => {
  analytics.track('measurement_required', { make, model, year });
};

export const trackFitmentNoMatch = (
  make: string,
  model: string,
  year: number
) => {
  analytics.track('fitment_no_match', { make, model, year });
};

export const trackMeasurementCompleted = (springGap: number, type: string) => {
  analytics.track('measurement_completed', { springGap, type });
};

export const trackProductViewed = (productId: string, type: string) => {
  analytics.track('product_viewed', { productId, type });
};

export const trackProductCtaClicked = (
  productId: string,
  type: string,
  ctaType: 'primary' | 'secondary'
) => {
  analytics.track('product_cta_clicked', { productId, type, ctaType });
};
