import axios from "axios";
import {Product, ProductDetails} from "~/interfaces/models";

interface ProductDataProps {
    data: Product[];
}

interface ProductDetailsProps {
    data: ProductDetails;
}

export async function loadProducts() {
    try {
        const {data}: ProductDataProps = await axios.get(
            `${process.env.API_URL}/api/v1/product/all`
        );
        return data;
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
    }
}

export async function loadProductDetails(productId: number) {
    try {
        const {data}: ProductDetailsProps = await axios.get(
            `${process.env.API_URL}/api/v1/product/${productId}`
        );

        return data;
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
    }
}
