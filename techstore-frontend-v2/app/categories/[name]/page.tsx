import React from "react";
import Heading from "~/components/Heading";
import Filter from "~/components/Filter";
import Sorting from "~/components/Sorting";
import ProductList from "~/components/ProductList";
import Banner from "~/components/Banner";
import {Breadcrumbs} from "@mantine/core";

const ProductPage = ({params}: { params: { name: string } }) => {

    return (
        <>
            <Banner/>
            <main className="grid gap-x-8 grid-cols-8 min-h-screen p-24">
                <div
                    className="
                    col-span-2 border-2 rounded-lg p-4
                    flex flex-col gap-y-6
                "
                >
                    <Filter name={params.name}/>
                </div>

                <div
                    className="col-span-6"
                >
                    <div
                        className="
                        flex items-start justify-between
                    "
                    >
                        <Heading title={params.name.toUpperCase().replaceAll("%20", " ")} typography={"h2"}/>
                        <div className="flex gap-2 items-center">
                            <Sorting/>
                        </div>
                    </div>

                    <ProductList category={params.name} showPaginate={true} itemsPerPage={8}/>
                </div>
            </main>
        </>
    );
};

export default ProductPage;
