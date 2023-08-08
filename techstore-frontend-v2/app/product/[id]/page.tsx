import React from 'react';
import {useGetProductByIdQuery} from "~/redux/services/productApi";
import ProductDetails from "~/components/ProductDetails";
import {Separator} from "~/components/ui/separator";
import Heading from "~/components/Heading";
import {Button} from "~/components/ui/button";
import ProductList from "~/components/ProductList";
import ProductComment from "~/components/ProductComment";

const ProductPage = ({params}: { params: { id: number } }) => {
    return (
        <div className="
                flex
                flex-col
                items-center
                justify-start
                min-h-screen
                p-24
            ">
            <ProductDetails id={params.id}/>
            <Separator className="my-4"/>

            <div
                className="
                    mt-14
                    w-full
                "
            >
                <div className="flex justify-between items-center">
                    <Heading
                        title={"Related Product"}
                        typography={"h2"}
                    />
                </div>
                <Separator className="my-4"/>
                <ProductList category={"Mobile"} itemsPerPage={4} showPaginate={false}/>
            </div>

            <Separator className="my-4 mt-8"/>
            <Heading
                title={"Comment"}
                typography={"h2"}
            />
            <ProductComment id={params.id}/>
        </div>
    );
};

export default ProductPage;
