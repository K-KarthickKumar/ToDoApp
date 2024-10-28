import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './component/signin/login.js';
import SignUp from './component/register/register.js';
import Home from './component/Home/home.js'
import WeatherApp from './component/Weather/WeatherApp.jsx';
import Cube from './component/cube/cube.jsx';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import DragDrop from './component/DragDrop/DragDrop.js';
import TestCss from './TestCss.jsx';

import Chatbot from './component/Chatbot/Chatbot.jsx';
function App() {
  
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/weather" element={<WeatherApp/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/" element={<TestCss/>} />
          <Route exact path="/home" element={<Cube/>} />
          <Route exact path="/chatbot" element={<Chatbot/>} />
        </Routes>
      </Router>
    </div>
    </DndProvider>
  );
}

export default App;
