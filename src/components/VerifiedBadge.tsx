import { ShieldCheckIcon } from './Icons';

interface VerifiedBadgeProps {
  size?: 'sm' | 'lg';
}

export default function VerifiedBadge({ size = 'sm' }: VerifiedBadgeProps) {
  return (
    <span
      className="verified-badge"
      style={size === 'lg' ? { padding: '6px 12px 6px 10px', fontSize: 13 } : {}}
    >
      <ShieldCheckIcon size={size === 'lg' ? 15 : 12} />
      <span>Verificado</span>
    </span>
  );
}
