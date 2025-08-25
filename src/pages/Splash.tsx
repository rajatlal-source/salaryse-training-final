import Button from '../components/Button'
import { motion } from 'framer-motion'

export default function Splash({onStart}:{onStart:()=>void}){
  return (
    <div className="min-h-screen grid place-items-center">
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.3}} className="text-center space-y-6">
        <div className="text-4xl font-bold">SalarySe CC Telesales</div>
        <div className="opacity-80">15 minutes a day. Real calls, real closings.</div>
        <Button onClick={onStart}>Start Training</Button>
      </motion.div>
    </div>
  )
}
