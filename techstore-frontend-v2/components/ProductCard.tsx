'use client'

import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "~/components/ui/card";
import Image from "next/image";
import {Rating} from "@smastrom/react-rating";
import {Badge} from "~/components/ui/badge";
import {Button} from "~/components/ui/button";
import {FaCartPlus} from "react-icons/fa";
import {Product} from "~/interfaces/models";
import '@smastrom/react-rating/style.css';
import {useAppDispatch} from "~/redux/hooks";
import {addToCart} from "~/redux/reducer/cartReducer";
import numeral from "numeral";
import {toast} from "react-toastify";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    // const {id, name, thumbnail, price} = product;

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product?.id,
            name: product?.name,
            thumbnail: product?.thumbnail,
            price: product?.price,
            quantity: 1
        }));
        toast.success("Product has added");
    }
    return (
        <Card className="group flex flex-col justify-between">
            <CardHeader className="transition cursor-pointer group-hover:scale-110 h-full">
                <div className="max-w-full min-w-[180px] w-full min-h-[200px] relative flex-1">
                    <Image
                        onClick={() => router.push(`product/${product.id}`)}
                        src={"/app/" + product?.thumbnail}
                        alt={"iphone"}
                        width={9999}
                        height={9999}
                        className={"w-full h-full object-cover object-center"}
                    />
                </div>
            </CardHeader>
            <div>
                <CardContent>
                    <div
                        onClick={() => router.push(`product/${product.id}`)}
                        className="line-clamp-2 font-semibold text-xl cursor-pointer hover:text-foreground/80"
                    >
                        {product?.name}
                    </div>
                    <div className="mt-3 flex items-center justify-start gap-2">
                        <Rating className="w-full" value={product?.averageRating} readOnly={true}/>
                        <Badge className="flex-0 pointer-events-none">{product?.rating}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 items-start justify-between">
                    <div className="text-xl font-medium w-full">
                        {numeral(product?.price).format('0,0')} VND
                    </div>
                    <div className="flex gap-2 justify-start w-full">
                        <Button>
                            Buy Now
                        </Button>
                        <Button onClick={handleAddToCart} variant="outline">
                            <FaCartPlus/>
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
};

export default ProductCard;