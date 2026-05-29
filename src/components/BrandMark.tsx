interface BrandMarkProps {
  size?: number;
}

export default function BrandMark({ size = 32 }: BrandMarkProps) {
  return (
    <div
      className="brand-mark"
      style={{ width: size, height: size, fontSize: size * 0.56 }}
    >
      J
    </div>
  );
}
