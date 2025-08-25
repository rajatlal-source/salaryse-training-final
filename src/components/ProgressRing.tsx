export default function ProgressRing({size=48, stroke=6, value=0}:{size?:number, stroke?:number, value:number}){
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * (1 - value/100)
  return (
    <svg width={size} height={size} className="block">
      <circle cx={size/2} cy={size/2} r={r} stroke="#333" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke="#EEFF41" strokeWidth={stroke} fill="none"
        strokeDasharray={`${c} ${c}`} strokeDashoffset={dash} strokeLinecap="round" />
    </svg>
  )
}
