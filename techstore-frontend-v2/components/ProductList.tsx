'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import ProductCard from "~/components/ProductCard";
import {useGetProductsQuery} from "~/redux/services/productApi";
import {Pagination} from "@mantine/core";
import {useRouter, useSearchParams} from "next/navigation";

interface ProductListProps {
    category: string;
    showPaginate?: boolean;
    itemsPerPage: number;
}

const ProductList: FC<ProductListProps> = ({category, showPaginate, itemsPerPage}) => {
    const router = useRouter();

    const {
        isLoading,
        data,
        error
    } = useGetProductsQuery({category: category.toLowerCase()});
    const searchParam = useSearchParams();
    const pageParam = searchParam.get('page');
    const brandParam = searchParam.get('brand');

    let page = 1;

    if (pageParam) {
        page = Number.parseInt(pageParam);
    }
    const [activePage, setPage] = useState(page);

    const handleChangePage = (page: number) => {
        setPage(page);
        router.push(`categories/${category}?page=${page}`)
    }

    let totalPages: number = 0;
    let totalItems: number = 8;
    let startPage = 0;
    let endPage = 0;

    if (data) {
        totalItems = data.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);
        startPage = (activePage - 1) * itemsPerPage;
        endPage = Math.min(startPage + itemsPerPage - 1, totalItems);
    }

    // @ts-ignore
    return (
        <>
            <div
                className="
                mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4
            "
            >
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-center">Error</div>
                ) : data ? (
                    <>
                        {brandParam ? data
                                .filter(item => item.brand === brandParam)
                                .slice(startPage, endPage + 1)
                                .map(product => {
                                    return (<ProductCard key={product.id} product={product}/>)
                                })
                            : data
                                .slice(startPage, endPage + 1)
                                .map(product => {
                                    return (<ProductCard key={product.id} product={product}/>)
                                })
                        }
                    </>
                ) : (
                    <div className="text-center">
                        No Item Founded
                    </div>
                )}
            </div>
            <Pagination
                value={activePage}
                onChange={handleChangePage}
                total={totalPages}
                hidden={!showPaginate}
            />
        </>
    );
};

export default ProductList;