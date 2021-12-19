import './App.css';
import { Route , BrowserRouter , Switch} from "react-router-dom";
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
import TwoStep from './LoginPage/TwoStep';
import Dashboard from './Homepage_bigCompany/Dashboard';
import Selleraddress from './Homepage_bigCompany/Selleraddress';
// import Dashboard from './Homepage_smallCompany/Dashboard';
function App() {
  var role = 'Buyer';
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path = "/" children={<div className='sign'><HeaderFrontPage/><Signin/></div>}/>
        <Route path = "/Login" children={<div className='sign'><HeaderFrontPage/><Login/></div>} />
        <Route path= '/verfication' children={<TwoStep/>}></Route>
        <Route path = "/HomePage" children={<><HomeC/></>} />
        <Route path = "/Page1" children={<><Navbar/><Page1/></>}/>
        <Route path = "/Page2" children={<><Navbar/><Page2/></>} />
        <Route path = "/SellerDashboard" children={<><Navbar/><Dashboard/></>} />
        <Route path = '/Address' children={<><Navbar/><Selleraddress/></>} />
        {/*<Route path = "/Feedback" children={<><Navbar/><Feedback/></>} />*/}
        {/* <Route children={<h1>not found</h1>} /> */}
        <Route children={<NotFound/>} />
        </Switch>
       
        </BrowserRouter>
    </div>
  );
}

export default App;