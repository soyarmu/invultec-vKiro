import { VehicleFitmentFinder } from '../fitment/VehicleFitmentFinder';

export function FitmentFinderSection() {
  return (
    <section id="fitment-finder" className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <div className="card-elevated p-8 sm:p-10">
            <VehicleFitmentFinder />
          </div>
        </div>
      </div>
    </section>
  );
}
