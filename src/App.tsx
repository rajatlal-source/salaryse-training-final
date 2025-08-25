import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Splash from './pages/Splash'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Assessment from './pages/Assessment'
import Library from './pages/Library'
import RolePlay from './pages/RolePlay'
import { useProgress } from './store/useProgress'

export type Route = 'splash' | 'home' | 'lesson' | 'assessment' | 'library' | 'roleplay'

export default function App(){
  const [route, setRoute] = useState<Route>('splash')
  const [lessonId, setLessonId] = useState<string>('star')
  const progress = useProgress()

  const navigate = (r: Route, opts?: any) => {
    if (r === 'lesson' && opts?.lessonId) setLessonId(opts.lessonId)
    setRoute(r)
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <AnimatePresence mode="wait">
        {route === 'splash' && <motion.div key="splash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Splash onStart={()=>navigate('home')} /></motion.div>}
        {route === 'home' && <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <Home onOpenLesson={(id)=>navigate('lesson',{lessonId:id})} onOpenLibrary={()=>navigate('library')} onRolePlay={()=>navigate('roleplay')} onAssessment={()=>navigate('assessment')} progress={progress} />
        </motion.div>}
        {route === 'lesson' && <motion.div key="lesson" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Lesson id={lessonId} onBack={()=>navigate('home')} /></motion.div>}
        {route === 'assessment' && <motion.div key="assessment" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Assessment onBack={()=>navigate('home')} /></motion.div>}
        {route === 'library' && <motion.div key="library" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Library onBack={()=>navigate('home')} /></motion.div>}
        {route === 'roleplay' && <motion.div key="roleplay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><RolePlay onBack={()=>navigate('home')} /></motion.div>}
      </AnimatePresence>
    </div>
  )
}
