import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import MerchIndex from '../pages/MerchIndex';
import ProductPage from '../pages/ProductPage';
import MyAccount from '../pages/MyAccount';
import Purchases from '../components/Purchases';
import ShoppingCart from '../pages/ShoppingCart';
import Footer from '../components/Footer';
import CreateProduct from '../pages/CreateProduct';
import EditProduct from '../pages/EditProduct';
import ResetPassword from '../pages/ResetPassword';

let userSession = JSON.parse(sessionStorage.getItem('userInfo'))
let isAdmin;

if(userSession){
    isAdmin = userSession.isAdmin;
} else {
    isAdmin = "";
}
// console.log(isAdmin);

const AppRouter = ()=> (
    <BrowserRouter>
        <div>
        <NavBar />
        <main className='py-5'>
            <Container fluid>
                <Switch>
                    <Route path="/login" component={LoginPage} exact/>
                    <Route path="/register" component={RegisterPage} exact/>
                    <Route path="/addProduct" >
                        {isAdmin ? <CreateProduct /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/merch/:id" component={ProductPage}/>
                    <Route path="/editProduct/:id" component={EditProduct} />
                    <Route path="/myAccount/" >
                        {userSession ? <MyAccount /> :  <Redirect to="/login" />}
                    </Route>
                    <Route path="/resetPassword/" >
                        {userSession ? <ResetPassword /> :  <Redirect to="/login" />}
                    </Route>
                    <Route path="/purchases" component={Purchases}/>
                    <Route path="/myCart/:id?" component={ShoppingCart}/>
                    <Route path='/search/:keyword' component={MerchIndex}  exact />                    
                    <Route path="/page/:pageNumber" component={MerchIndex} exact />
                    <Route path="/search/:keyword/page/:pageNumber" component={MerchIndex} exact />
                    <Route path="/" component={MerchIndex} exact/>
                    <Route component={ErrorPage}/>
                </Switch> 
            </Container>
        </main>
        <Footer />  
        </div>
    </BrowserRouter>    
)

export default AppRouter;