'use client'

import React from 'react';
import {useGetProductByIdQuery} from "~/redux/services/productApi";
import Image from "next/image";
import {Breadcrumbs, Title} from "@mantine/core";
import {usePathname} from "next/navigation";
import Heading from "~/components/Heading";
import {Rating} from "@smastrom/react-rating";
import numeral from "numeral";
import {Button} from "~/components/ui/button";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Separator} from "~/components/ui/separator";

interface ProductDetailsProps {
    id: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({id}) => {

    const {data} = useGetProductByIdQuery({id});

    // @ts-ignore
    return (
        <>
            <div className="grid grid-cols-3 gap-x-8 pt-20">
                <div className="col-span-1 border-2 boder p-8 rounded-xl">
                    <Image
                        src={"/app/" + data?.thumbnail}
                        alt={"" + data?.name}
                        width={9999}
                        height={9999}
                        className="w-full h-full"
                    />
                </div>

                <div className="col-span-2 p-4 space-y-5 flex flex-col justify-around items-start">
                    <div className="flex flex-col gap-y-6">
                        <Title order={1}>{data?.name}</Title>
                        <Title order={6} color={'dimmed'}>{data?.description}</Title>

                        <div className="w-[150px]">
                            <Rating value={data?.reviews?.length} readOnly/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-6 justify-around">
                        <Title order={3}>{numeral(data?.price).format('0,0')} VND</Title>

                        <div className="flex gap-4">
                            <Button>Purchase</Button>
                            <Button variant={"outline"}>
                                <AiOutlineShoppingCart size={"full"}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
