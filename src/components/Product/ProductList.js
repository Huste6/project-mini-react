import { useEffect, useState } from 'react';
import EditProduct from './editProduct';
import DeleteProduct from './deleteProduct';
import { getProductList } from '../../service/productService';

function ProductList(props) {
    const { reload } = props;
    const [data, setData] = useState([]);
    const [editReload, setEditReload] = useState(false);

    const handleReload = () => {
        setEditReload(!editReload);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getProductList();
                setData(result.reverse());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, [reload, editReload]);

    return (
        <div className='product__list'>
            {data.map(item => (
                <div className='product__item' key={item.id}>
                    <div className='product__image'>
                        <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <h4 className='product__title'>{item.title}</h4>
                    <p className='product__price'>{item.price}$</p>
                    <p className='product__percent'>{item.discountPercentage}%</p>
                    <EditProduct item={item} onReload={handleReload} />
                    <DeleteProduct item={item} onReload={handleReload} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;