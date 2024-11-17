import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from './pages/FAQPage';
import ScreeningPage from './pages/ScreeningPage';
import RankPage from './pages/RankPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/faq" element={<FAQ/>} />
          <Route exact path="/screen" element={<ScreeningPage/>} />
          <Route exact path="/based-on-job-description" element={<RankPage/>} />


          {/* <Route exact path="/help" element={<HelpPage/>} /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
