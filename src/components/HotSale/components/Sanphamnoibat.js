import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'
import {handlePercentDiscount} from '../../../untils/index'
import { useDispatch } from 'react-redux';


function Ishot(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('Sản Phẩm nổi bật');
    const [ishot, setHotProduct] = useState([])
    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.post(`http://localhost:8080/api/product/getalishot`)
                setHotProduct(data)
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
                    ishot ? (<ListProduct HotSaleProducts={handlePercentDiscount(ishot)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default Ishot;