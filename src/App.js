import { Starships } from './components/Starships';
import { Create } from './components/Create'
import StarshipsContextProvider from './context/StarshipsContext';
import {BrowserRouter, Routes, Route, NavLink, Navigate} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <StarshipsContextProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/starships">Starships</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<Navigate to="/starships"/>}/>
            <Route path="/starships" element={<Starships/>}/>
            <Route path="/create" element={<Create/>}/>
          </Routes>
        </BrowserRouter>
      </StarshipsContextProvider>
    </div>
  );
}

export default App;
