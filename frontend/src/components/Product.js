import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

//width 640 height 510 default for images width='640px' height='510px'

const Product = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`} >
                <Card.Img  src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} >
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

/*const Product = (props) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${props.product._id}`} >
                <Card.Img src={props.product.image} variant='top' />
            </a>
            
        </Card>
    )
}
<div className='my-3'>
    {product.rating} from {product.numReviews} reviews
</div>
*/

export default Product
