import ProductList from "./ProductList";
import './Product.css';
import CreateNewProduct from "./createProduct";
import { useState } from "react";

function Product() {
    const [reload,setReload] = useState(false);
    
    const handleReload = () => {
        setReload(!reload);
    }

    return (
        <>
            <h2>Danh sach san pham</h2>
            
            <CreateNewProduct onReload={handleReload}/>

            <ProductList reload={reload}/>
        </>
    )
}
export default Product;