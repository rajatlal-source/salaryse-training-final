
export default function ProgressRing({value,size=72,stroke=8}:{value:number,size?:number,stroke?:number}){
  const r=(size-stroke)/2; const c=2*Math.PI*r; const dash=c*(1 - value/100)
  return (<svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r} stroke="#333" strokeWidth={stroke} fill="none"/><circle cx={size/2} cy={size/2} r={r} stroke="#EEFF41" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${c} ${c}`} strokeDashoffset={dash}/></svg>)
}
