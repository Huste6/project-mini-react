import { useState,useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { getCategoryList } from '../../service/CategoryService';
import { createProduct } from '../../service/productService';

function CreateNewProduct(props) {
    const {onReload} = props;
    const [showModal, SetShowModal] = useState(false);
    const [data, setData] = useState({});
    const [dataCategory,SetDataCategory] = useState([]);

    useEffect(()=>{
        const fetchApi = async () => {
            const result = await getCategoryList();
            SetDataCategory(result);
        }
        fetchApi();
    },[])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        SetShowModal(false);
    }

    function openModal() {
        SetShowModal(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createProduct(data);
        if(result){
            SetShowModal(false);
            onReload();
            Swal.fire({
                title: "Good job!",
                text: "Tao moi san pham thanh cong!",
                icon: "success"
            });    
        }
    }

    return (
        <>
            <button onClick={openModal}> + Create new product</button>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tieu de</td>
                                <td>
                                    <input type='text' name='title' onChange={handleChange} required />
                                </td>
                            </tr>
                            {dataCategory.length > 0 && (
                                <tr>
                                    <td>Danh muc</td>
                                    <td>
                                        <select name='category' onChange={handleChange}>
                                            {dataCategory.map((item,index)=>(
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>Gia</td>
                                <td>
                                    <input type='text' name='price' onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Giam gia</td>
                                <td>
                                    <input type='text' name='discountPercentage' onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>So luong con lai</td>
                                <td>
                                    <input type='text' name='stock' onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Duong dan anh</td>
                                <td>
                                    <input type='text' name='thumbnail' onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Mo ta</td>
                                <td>
                                    <textarea name='description' onChange={handleChange}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={closeModal}>Huy</button>
                                </td>
                                <td>
                                    <input type='submit' value='Tao moi' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    )
}
export default CreateNewProduct;