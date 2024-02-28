import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'
import {handlePercentDiscount} from '../../../untils/index'
import { useDispatch } from 'react-redux';


function Issale(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('Sản Phẩm giảm giá');
    const [issale, setsaleProduct] = useState([])
    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.post(`http://localhost:8080/api/product/getalisale`)
                setsaleProduct(data)
            } catch (error) {
            }
        }
        FetchApi()
    }, [])

   

    return (
        <section id="hotsale iphone">
            <div className="hotsale">
                <h2>{name}</h2>
                {
                    issale ? (<ListProduct HotSaleProducts={handlePercentDiscount(issale)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default Issale;