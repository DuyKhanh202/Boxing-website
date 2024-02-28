import React, { useEffect } from 'react';
import Product from './Product'

function ListProduct(props) {
    const {HotSaleProducts} = props;

    return (
        <div className="">
            {
                HotSaleProducts.map((product, index) => (
                    <Product product={product} key={index}></Product>
                ))
            }
        </div>
    );
}

export default ListProduct;