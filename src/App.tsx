import './App.css'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import Analisis from './pages/analisis'
import Contact from './pages/contact'
import VirusDNAAnalysis from './pages/results'
import Documentacion from './pages/documentacion'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/contact" element={<Contact />} />	
        <Route path="/resultados/:idFile" element={<VirusDNAAnalysis />} />
        <Route path="/documentacion" element={<Documentacion />} />
      </Routes>
    </>
  )
}

export default App
