import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import CreateLegal from "../components/modals/CreateLegal";
import DeleteBrand from '../components/modals/DeleteBrand';
import DeleteType from '../components/modals/DeleteType';
import DeleteLegal from '../components/modals/DeleteLegal';
import {observer} from "mobx-react-lite";


const Admin = observer( () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [legalVisible, setLegalVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setLegalVisible(true)}
            >
                Добавить производителя
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateLegal show={legalVisible} onHide={() => setLegalVisible(false)}/>
            <DeleteBrand />
            <DeleteType />
            <DeleteLegal/>
        </Container>
    );
});

export default Admin;
