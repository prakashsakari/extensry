import './App.css';
import { Home } from "./pages";
import {images} from "./db";
import { useState, useEffect } from 'react';

function App() {

  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    const bgImage = images[Math.floor(Math.random() * images.length)].image;
    setBackgroundImage(bgImage)
  }, [])

  
  return (
    <div className='app' style={{backgroundImage: `url("${backgroundImage}")`}}>
      <Home />
    </div>
  );
}

export default App;
