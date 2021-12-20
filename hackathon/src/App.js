import './App.css';
import { Route , BrowserRouter , Switch} from "react-router-dom";
import Login from "./LoginPage/Login";
import Signin from "./LoginPage/Signin";
import { Header } from './HeaderFooter/Header';
import {Footer} from './HeaderFooter/Footer';
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
// import Dashboard from './Homepage_smallCompany/Dashboard';
function App() {
  var role = 'Buyer';
  return (
    <div className="App">
    
      <BrowserRouter>
        <Switch>
        <Route exact path = "/" children={<div className='sign'><HeaderN/><Signin/></div>}/>
        <Route path = "/Login" children={<div className='sign'><HeaderN/><Login/></div>} />
        {/* <Route path= '/verfication' children={<TwoStep/>}></Route>
        <Route path= '/verfication2' children={<TwoStep2/>}></Route> */}
        <Route path='/category' exact children={<><HeaderN/><AllItems/></>}>
        </Route>
        <Route path={'/category/:type'}>
        <HeaderN/>
        <CategoryPage/>
        </Route>
        <Route path='/cart' children={<><HeaderN/><Cart/></>}/>
        <Route path = "/HomePage" children={<><HomeC/></>} />
        {/* <Route path = "/Page1" children={<><Navbar/><Page1/></>}/> */}
        {/* <Route path = "/Page2" children={<><Navbar/><Page2/></>} /> */}
        <Route path = "/Feedback" children={<><HeaderN/><Feedback/></>} />
        <Route path = "/SellerDashboard" children={<><HeaderN/><Dashboard/></>} />
        <Route path = '/Address' children={<><HeaderN/><Selleraddress/></>} />
        <Route children={<NotFound/>} />
        </Switch>
       
        </BrowserRouter>
    </div>
  );
}

export default App;