import Home from './components/Home';
import ImageUpload from './components/ImageUpload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import DressState from './context/dressState';
import DressDetails from './components/DressDetails';
import GenerateADress from './components/GenerateADress';
const App = () => {
  return (
    
    <DressState>
      <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/addDress" element={<ImageUpload />} />
          <Route path="/dressDetails/:dressId" element={<DressDetails />} />
          <Route path="/generateADress" element={<GenerateADress />} />
        </Routes>
      </Router>
      </div>
    </DressState>
  );
}
export default App;
