import { FitmentConfidence } from '@/types/fitment';
import { getConfidenceBadgeInfo } from '@/lib/fitment/fitment-engine';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Ruler } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: FitmentConfidence;
  showDescription?: boolean;
}

export function ConfidenceBadge({
  confidence,
  showDescription = false,
}: ConfidenceBadgeProps) {
  const info = getConfidenceBadgeInfo(confidence);

  const Icon =
    confidence === 'HIGH'
      ? CheckCircle
      : confidence === 'MEDIUM'
      ? AlertCircle
      : Ruler;

  return (
    <div className="flex flex-col gap-2">
      <Badge variant={info.variant} className="w-fit">
        <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
        {info.text}
      </Badge>
      {showDescription && (
        <p className="text-sm text-neutral-600">{info.description}</p>
      )}
    </div>
  );
}
