// import React, { useState } from 'react';
// import { Card, Col, Button } from 'react-bootstrap';
// import Image from 'react-bootstrap/Image';
// import { useNavigate } from 'react-router-dom';
// import { PRODUCT_ROUTE } from '../utils/consts';
// import { addToBasket } from '../http/productAPI';
// import { toast } from 'react-toastify';

// const ProductItem = ({ product, user }) => {
//   // console.log(user.isRole); - показывает роль пользователя
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);

//   const addProductToBasket = (id, name, quantity) => {
//     const formData = new FormData();
//     formData.append('productId', id);
//     formData.append('quantity', quantity);

//     addToBasket(formData)
//       .then(response => {
//         toast.success(`Товар ${name} был добавлен в корзину!`, {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       })
//       .catch(error => {
//         console.error('Ошибка при добавлении товара в корзину', error);
//       });
//   };



//   return (
//     <Col md={3} className="mt-3">
//       {product.amount !== 0 ? (
//         <Card
//           style={{
//             border: '2px solid lightgray',
//             width: '220px',
//             height: '320px',
//             cursor: 'pointer',
//             transition: 'box-shadow 0.5s',
//           }}
//           className="p-2"
//           onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')}
//           onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <Image
//               width={150}
//               height={150}
//               onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
//               src={process.env.REACT_APP_API_URL + product.img}
//             />
//           </div>
//           <br />
//           <div style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
//             {product.name}
//             <br />
//             Цена: {product.price} руб.
//             <br />
//             Осталось: {product.amount}
//             <Button
//               variant="outline-dark"
//               className="mt-2"
//               onClick={() => addProductToBasket(product.id, product.name, quantity)}
//             >
//               Добавить в корзину
//             </Button>
//           </div>
//         </Card>
//       ) : (
//         <Card style={{ border: '2px solid red', width: 180, height: 300, cursor: 'pointer' }} className="p-2">
//           <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img} />
//           <br />
//           <div style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
//             {product.name}
//             <br />
//             Цена: {product.price} руб.
//             <br />
//             Нет в наличии
//           </div>
//         </Card>
//       )}
//     </Col>
//   );
// };

// export default ProductItem;

import React, { useState } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';
import { addToBasket, delProduct } from '../http/productAPI'; // Import the delProduct function
import { toast } from 'react-toastify';

const ProductItem = ({ product, user }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const addProductToBasket = (id, name, quantity) => {
    const formData = new FormData();
    formData.append('productId', id);
    formData.append('quantity', quantity);

    addToBasket(formData)
      .then(response => {
        toast.success(`Товар ${name} был добавлен в корзину!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(error => {
        console.error('Ошибка при добавлении товара в корзину', error);
      });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await delProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Col md={3} className="mt-4">
      <Card
        style={user.isRole === "ADMIN" ? {
          border: '2px solid lightgray',
          width: '220px',
          height: '360px',
          cursor: 'pointer',
          transition: 'box-shadow 0.5s',
        }: {
          border: '2px solid lightgray',
          width: '220px',
          height: '340px',
          cursor: 'pointer',
          transition: 'box-shadow 0.5s',
        }}
        
        className="p-2"
        onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.1)')}
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
      >
         {user.isRole === 'ADMIN' && (
            <Button
              variant="danger"
              className=""
              onClick={() => handleDeleteProduct(product.id)}
            >
              X
            </Button>
          )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            width={150}
            height={150}
            onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
            src={process.env.REACT_APP_API_URL + product.img}
          />
        </div>
        <br />
        <div style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
          {product.name}
          <br />
          Цена: {product.price} руб.
          <br />
          Осталось: {product.amount}
          {user.isRole === "USER" &&
          <Button
            variant="outline-dark"
            className="mt-2 d-flex"
            onClick={() => addProductToBasket(product.id, product.name, quantity)}
          >
            Добавить в корзину
          </Button>
          }
          

         
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
