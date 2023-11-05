import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import MainView from "./components/MainView"
import GridView from "./components/GridView"
import RestrictedRoute from './components/RestrictedRoute';

function App() {
  const [data, setData] = useState(null);
  const [main, setMain] = useState(null);
  const [mainColor,setMainColor]=useState(null);
  return (
    <Router>
      <Routes>
        
        <Route path='/' element={<HomeScreen setData={setData} />} />

        <Route path='all-piano-rolls'
          element={
            <RestrictedRoute data={data}>
              <GridView data={data} setMain={setMain} setMainColor={setMainColor}/>
            </RestrictedRoute>
          }/>
        
        <Route path='main-piano-roll'
          element={
            <RestrictedRoute data={data}>
             <MainView data={data} main={main} setMain={setMain} mainColor={mainColor} setMainColor={setMainColor}/>
            </RestrictedRoute>
          }/>
     
      </Routes>
    </Router>
  )
}

export default App;
