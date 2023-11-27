import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";
import {Context} from "../index";

const ProductItem = ({product}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            {product.amount != 0 ?

            <Card style={{border: '2px solid lightgray', width: 170, height:300, cursor: 'pointer'} }className="p-2">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/><br/>
                <div style={{width: '90%', margin: '0 auto', textalign: 'center'}}>{product.name}<br/>
                    Цена: {product.price} руб.

                    Осталось:{product.amount}
                </div>
            </Card>
         :

                <Card style={{border: '2px solid red', width: 180, height:300, cursor: 'pointer'} } className="p-2">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/><br/>
                <div style={{width: '90%', margin: '0 auto', textalign: 'center'}}>{product.name}<br/>
                    Цена: {product.price} руб.
                    Нет в наличии
                </div>
            </Card>
        }
        </Col>
    );
};

export default ProductItem;
