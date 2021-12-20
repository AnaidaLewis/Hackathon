import './App.css';
import { Route , BrowserRouter , Switch} from "react-router-dom";
import Login from "./LoginPage/Login";
import Signin from "./LoginPage/Signin";
import HomeC from './Homepage_smallCompany/HomeC';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import { Navbar } from './Pages/Navbar';
import Feedback from './Pages/Feedback';
import TwoStep2 from './LoginPage/TwoStep2';
import HeaderFrontPage from './HeaderFooter/HeaderFrontPage';
import HeaderN from './HeaderFooter/HeaderN';
import NotFound from './notFound/NotFound';
import TwoStep from './LoginPage/TwoStep';
import Dashboard from './Homepage_bigCompany/Dashboard';
import Cart from './Cart/Cart';
import Selleraddress from './Homepage_bigCompany/Selleraddress';
import CategoryHome from './Homepage_smallCompany/CategoryHome';
import CategoryPage from './CategoryPage/CategoryPage';
import AllItems from './CategoryPage/AllItems';
import NavBar_loginSignup from './HeaderFooter/NavBar_loginSignup';
import NavBarSeller from './HeaderFooter/NavBarSeller';
import Footer from './HeaderFooter/Footer';
// import Dashboard from './Homepage_smallCompany/Dashboard';
function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Switch>
        {/* login signup */}
        <Route exact path = "/" children={<div className='sign'><NavBar_loginSignup/><Signin/></div>}/>
        <Route path = "/Login" children={<div className='sign'><NavBar_loginSignup/><Login/></div>} />

        {/* home page for buyer */}
        <Route path='/category' exact children={<><HeaderN/><AllItems/><Footer></Footer></>}/>
        <Route path={'/category/:type'} children={<><HeaderN/><CategoryPage/><Footer></Footer></>}/>
        <Route path='/cart' children={<><HeaderN/><Cart/></>}/>
        <Route path = "/HomePage" children={<><HomeC/></>} />
        <Route path = "/Feedback" children={<><HeaderN/><Feedback/></>} />

        {/* home page for seller */}
        <Route path = "/SellerDashboard" children={<><NavBarSeller/><Dashboard/></>} />
        <Route path = '/Address' children={<><NavBarSeller/><Selleraddress/></>} />

        {/* not found page */}
        <Route children={<NotFound/>} />
        </Switch>
       
        </BrowserRouter>
    </div>
  );
}

export default App;