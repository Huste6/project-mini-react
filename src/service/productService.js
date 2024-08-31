import { get, post, del, patch } from "../utils/request";

export const getProductList = async () => {
    const result = await get("products");
    return result;
}

export const createProduct = async (options) => {
    const result = await post("products",options)
    return result;
}

export const deleteProduct = async (id) => {
    const result = await del(`products/${id}`);
    return result;
}

export const patchProduct = async (id,data) => {
    const result = await patch(`products/${id}`,data)
    return result;
}