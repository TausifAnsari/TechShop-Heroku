import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
// To dispatch the actions we use the below methods from react-redux
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
//helmet for meta
import Meta from '../components/Meta'
//.js file used for fetching data in frontend
//import products from '../products'
import Product from '../components/Product'
//import actions
import { listProducts } from '../actions/productActions'
// Importing loader and message component (not imp)
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
// Importing react router dom elemets
import { useParams, } from "react-router-dom";

// Not used anymore as we are calling backend from the actions
//as we implemented redux - global state change, now we dont need to use the below method to call backend
//import axios from 'axios'


//unused imports
//useState,



const HomeScreen = () => {
    const dispatch = useDispatch()

    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1

    //
    const productList = useSelector(state => state.productList)
    //pulling the below elements from the state - check reducer file and see all the objects in it
    const { loading, error, products, pages, page } = productList

    useEffect(() => {
        //before it was dispatch(listProducts()) but we added keyword for search functionality
        //since listProducts is an action we need to change the action to handle search functionality and pagination functionality
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-dark'>Go Back</Link> }
            <h1>Latest Products</h1>
            {loading ? <Loader />: error ? <Message variant='danger'>{error}</Message>
            : (
            <>    
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row> 
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>
            )}
            
        </>
    )
}

export default HomeScreen


/* 
useState and useEffect usage to call an api using axios directly without using redux - I think it is using react hooks
as we implemented redux - global state change, now we dont need to use the below method to call backend
this was component level state management, redux is global level state management

const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products')
            //const {data} = await axios.get('/api/products')

            setProducts(res.data)
        }
        fetchProducts()
    }, [])

 */
