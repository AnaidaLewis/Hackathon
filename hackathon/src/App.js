import './App.css';
import { Route , BrowserRouter , Routes} from "react-router-dom";
import Login from "./LoginPage/Login";
import Signin from "./LoginPage/Signin";
import { Header } from './HeaderFooter/Header';
import {Footer} from './HeaderFooter/Footer';
import HomeC from './Homepage_smallCompany/HomeC';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Feedback from './Pages/Feedback';

import HeaderFrontPage from './HeaderFooter/HeaderFrontPage';
import { Navbar } from './Pages/Navbar';
import NotFound from './notFound/NotFound';
import Dashboard from './Homepage_smallCompany/Dashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path = "/" element={<div className='sign'><HeaderFrontPage/><Signin/></div>}/>
        <Route path = "Login" element={<div className='sign'><HeaderFrontPage/><Login/></div>} />
        <Route path = "Login/HomePage" element={<><Navbar/><HomeC/></>} />
        <Route path = "/Page1" element={<><Navbar/><Page1/></>}/>
        <Route path = "/Page2" element={<><Navbar/><Page2/></>} />
        {/*<Route path = "/Feedback" element={<><Navbar/><Feedback/></>} />*/}
        <Route element={<h1>not found</h1>} />
        <Route path="*" element={<NotFound/>} />
        </Routes>
       
        </BrowserRouter>
    </div>
  );
}

export default App;