interface MapPin {
  x: number;
  y: number;
  label?: string;
}

interface MapViewProps {
  pins?: MapPin[];
  height?: number;
  active?: number;
  onPinClick?: (i: number) => void;
}

export default function MapView({ pins = [], height = 280, active = 0, onPinClick }: MapViewProps) {
  return (
    <div className="map-canvas" style={{ height, width: '100%' }}>
      <div className="map-grid"></div>
      <div className="map-road" style={{ top: '32%', left: '5%', width: '90%', height: '6px' }}></div>
      <div className="map-road" style={{ top: '64%', left: '10%', width: '85%', height: '4px' }}></div>
      <div className="map-road" style={{ left: '28%', top: '8%', width: '5px', height: '85%' }}></div>
      <div className="map-road" style={{ left: '62%', top: '15%', width: '4px', height: '75%' }}></div>
      <div style={{
        position: 'absolute', top: '38%', left: '32%', width: '24%', height: '22%',
        background: 'rgba(20, 184, 166, 0.08)', borderRadius: 4, border: '1px solid rgba(20, 184, 166, 0.15)',
      }}></div>
      <div style={{
        position: 'absolute', top: '12%', left: '68%', width: '14%', height: '14%',
        background: 'rgba(11, 31, 77, 0.06)', borderRadius: 4,
      }}></div>
      {pins.map((pin, i) => (
        <div
          key={i}
          className={`map-pin ${i === active ? 'active' : ''}`}
          style={{ left: `calc(${pin.x}% - 16px)`, top: `calc(${pin.y}% - 32px)` }}
          onClick={() => onPinClick && onPinClick(i)}
        >
          {i === active && pin.label && <span className="pin-label">{pin.label}</span>}
        </div>
      ))}
      <div style={{
        position: 'absolute', bottom: 6, right: 8,
        fontSize: 9, color: 'rgba(11, 31, 77, 0.4)', fontFamily: 'var(--font-mono)',
      }}>JurisGO Maps</div>
    </div>
  );
}
