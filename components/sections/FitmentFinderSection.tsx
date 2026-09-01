import { LeadCaptureForm } from '../fitment/LeadCaptureForm';

export function FitmentFinderSection() {
  return (
    <section id="fitment-finder" className="py-16 sm:py-20 bg-neutral-50">
      <div className="container-custom">
        <LeadCaptureForm />
      </div>
    </section>
  );
}
