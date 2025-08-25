
import Button from '../components/Button'
export default function Splash({onStart}:{onStart:()=>void}){
  return (<div className="min-h-screen grid place-items-center"><div className="text-center space-y-6"><div className="text-4xl font-bold">SalarySe CC Telesales</div><div className="opacity-80">2–3 days. 1 hour per day. Gamified.</div><Button onClick={onStart}>Start</Button></div></div>)
}
