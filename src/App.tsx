
import React from 'react'
import './index.css'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lesson from './pages/Lesson'
import Assessment from './pages/Assessment'
import Analytics from './pages/Analytics'
import { useUser } from './store/user'

type View = { name: 'splash' } | { name: 'login' } | { name: 'home' } | { name: 'lesson', id:string } | { name: 'assessment' } | { name: 'analytics' }

export default function App(){
  const { user } = useUser()
  const [v,setV]=React.useState<View>({name:'splash'})
  React.useEffect(()=>{ if(user && (v.name==='login' || v.name==='splash')) setV({name:'home'}) },[user])
  return (<div>{v.name==='splash' && <Splash onStart={()=> setV({name: user? 'home':'login'})} />}{v.name==='login' && <Login onEnter={()=> setV({name:'home'})} />}{v.name==='home' && <Dashboard openLesson={(id)=>setV({name:'lesson', id})} openAssessment={()=>setV({name:'assessment'})} openAnalytics={()=>setV({name:'analytics'})} />}{v.name==='lesson' && <Lesson id={v.id} back={()=> setV({name:'home'})} />}{v.name==='assessment' && <Assessment back={()=> setV({name:'home'})} />}{v.name==='analytics' && <Analytics back={()=> setV({name:'home'})} />}<footer className="text-xs opacity-50 text-center py-6">SalarySe Training • Local analytics • Google Sheets-ready</footer></div>)
}
