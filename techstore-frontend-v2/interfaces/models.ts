export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    brand: string;
    thumbnail: string;
    rating: number;
    averageRating: number;
}

export interface ProductDetails {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    price: number;
    reviews: Reviews[];
}

interface Reviews {
    rating: number;
    comment: string;
    customerName: string;
}

export interface CartItem {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    quantity: number;
}

