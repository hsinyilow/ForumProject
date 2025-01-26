import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home'
import ThreadPageTemplate from './pages/ThreadPageTemplate'
import './App.css'
import CssBaseline from "@mui/material/CssBaseline";
import {useState } from 'react'
import AppHeader from "./component/Header";
import UserContext from "./UserContext";


function App() {
  //global user var
  const [user, setCurrentUser] = useState({userID: -1, username: ""});
  
  return (
    <UserContext.Provider value={{userID: user.userID, username: user.username,  setCurrentUser}} >
    <BrowserRouter>
    <CssBaseline/>
      <AppHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threadTemplate" element={<ThreadPageTemplate />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App