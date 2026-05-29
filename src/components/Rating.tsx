import { StarIcon } from './Icons';

interface RatingProps {
  value: number;
  count: number;
  size?: number;
}

export default function Rating({ value, count, size = 13 }: RatingProps) {
  return (
    <span className="star-rating" style={{ fontSize: size }}>
      <StarIcon size={size} filled />
      <span>{value.toFixed(1)}</span>
      <span className="reviews-count">({count})</span>
    </span>
  );
}
