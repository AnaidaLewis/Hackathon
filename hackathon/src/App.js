import './App.css';
import { Route , BrowserRouter , Routes} from "react-router-dom";
import Login from "./LoginPage/Login";
import Signin from "./LoginPage/Signin";
import { Header } from './HeaderFooter/Header';
import {Footer} from './HeaderFooter/Footer';
import HomePage from './Pages/HomePage';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Feedback from './Pages/Feedback';

import HeaderFrontPage from './HeaderFooter/HeaderFrontPage';
import Sidebar from './Pages/Sidebar';
import { Navbar } from './Pages/Navbar';
import NotFound from './notFound/NotFound';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path = "/" element={<div className='sign'><HeaderFrontPage/><Signin/></div>}/>
        <Route path = "Login" element={<div className='sign'><HeaderFrontPage/><Login/></div>} />
        <Route path = "/HomePage" element={<><Sidebar/><Navbar/><HomePage/></>} />
        <Route path = "/Page1" element={<><Sidebar/><Navbar/><Page1/></>}/>
        <Route path = "/Page2" element={<><Sidebar/><Navbar/><Page2/></>} />
        <Route path = "/Feedback" element={<><Sidebar/><Navbar/><Feedback/></>} />
        <Route element={<h1>not found</h1>} />
        <Route path="*" element={<NotFound/>} />
        </Routes>
       
        </BrowserRouter>
    </div>
  );
}

export default App;
