import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getCategoryList } from '../../service/CategoryService';
import { patchProduct } from '../../service/productService';

function EditProduct(props) {
    const { item,onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item);
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getCategoryList();
                setDataCategory(result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchApi();
    }, []);

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
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await patchProduct(data,item.id);
            if (result) {
                setShowModal(false);
                onReload();
                Swal.fire({
                    title: "Good job!",
                    text: "Cập nhật sản phẩm thành công!",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <>
            <button onClick={openModal}>+ Edit product</button>
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
                                <td>Tiêu đề</td>
                                <td>
                                    <input type='text' name='title' onChange={handleChange} value={data.title} required />
                                </td>
                            </tr>
                            {dataCategory.length > 0 && (
                                <tr>
                                    <td>Danh mục</td>
                                    <td>
                                        <select name='category' onChange={handleChange} value={data.category}>
                                            {dataCategory.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>Giá</td>
                                <td>
                                    <input type='text' name='price' onChange={handleChange} value={data.price} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Giảm giá</td>
                                <td>
                                    <input type='text' name='discountPercentage' onChange={handleChange} value={data.discountPercentage} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Số lượng còn lại</td>
                                <td>
                                    <input type='text' name='stock' onChange={handleChange} value={data.stock} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Đường dẫn ảnh</td>
                                <td>
                                    <input type='text' name='thumbnail' onChange={handleChange} value={data.thumbnail} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <textarea name='description' onChange={handleChange} value={data.description}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={closeModal}>Hủy</button>
                                </td>
                                <td>
                                    <input type='submit' value='Edit' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    );
}

export default EditProduct;