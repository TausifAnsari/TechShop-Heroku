//Libraries
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
//Components apart from screens
import Header from './components/Header';
import Footer from './components/Footer';
//Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';


//history we can also use this but instead we used useNavigate from react router dom
//import { createBrowserHistory } from 'history'
//const history = createBrowserHistory(); as props history={history} 

// In line 28 and 29 for optional parameters we used two different routes

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <main className='py-3'>
          <Container>
              <Routes>
                <Route exact path='/' element={<HomeScreen />}/>
                <Route exact path='/search/:keyword' element={<HomeScreen />}/>
                <Route exact path='/search/:keyword/page/:pageNumber' element={<HomeScreen />}/>
                <Route exact path='/page/:pageNumber' element={<HomeScreen />}/>
                <Route exact path='/product/:id' element={<ProductScreen  /> } />
                <Route exact path='/login' element={<LoginScreen  /> } />
                <Route exact path='/register' element={<RegisterScreen  /> } />
                <Route exact path='/profile' element={<ProfileScreen  /> } />
                <Route exact path='/shipping' element={<ShippingScreen />}/>
                <Route exact path='/payment' element={<PaymentScreen />}/>
                <Route exact path='/order/:id' element={<OrderScreen />}/>
                <Route exact path='/placeorder' element={<PlaceOrderScreen />}/>
                <Route exact path='/admin/userlist' element={<UserListScreen />}/>
                <Route exact path='/admin/user/:id/edit' element={<UserEditScreen />}/>
                <Route exact path='/admin/productlist' element={<ProductListScreen />}/>
                <Route exact path='/admin/productlist/:pageNumber' element={<ProductListScreen />}/>
                <Route exact path='/admin/product/:id/edit' element={<ProductEditScreen />}/>
                <Route exact path='/admin/orderlist' element={<OrderListScreen />}/>
                <Route exact path='/cart'>
                  <Route path='' element={<CartScreen />} />
                  <Route path=':id' element={<CartScreen />} />
                </Route>
              </Routes>
          </Container>
        </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
