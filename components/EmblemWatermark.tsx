// Watermark of the emblem (three parallelograms), flat fills. Pass a colour via `color`.
const shapes = [
  { points: "624,1 389,2 1,417 248,417", opacity: 1 },
  { points: "892,1 652,2 274,417 529,417", opacity: 0.6 },
  { points: "580,392 846,392 969,251 705,251", opacity: 1 },
];

export default function EmblemWatermark({ className = "", color = "#0093CB", opacity = 0.18 }: { className?: string; color?: string; opacity?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 970 420" preserveAspectRatio="xMidYMid meet"
      className={className} xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      {shapes.map((s) => <polygon key={s.points} points={s.points} fill={color} fillOpacity={s.opacity} />)}
    </svg>
  );
}
