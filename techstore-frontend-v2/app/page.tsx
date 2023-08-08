'use client'

import React, {useMemo} from "react";
import Heading from "~/components/Heading";
import Brands from "~/components/Brands";
import {Separator} from "~/components/ui/separator";
import Banner from "~/components/Banner";
import ProductList from "~/components/ProductList";
import {Button} from "~/components/ui/button";
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();

    const categories = useMemo<string[]>(() => [
        "Mobile", "Laptop", "Earphone Bluetooth"
    ], []);

    return (
        <>
            <Banner/>
            <main
                className="
                flex
                flex-col
                items-center
                justify-start
                min-h-screen
                p-24
            "
            >
                <div
                    className="
                        mt-14
                        w-full
                    "
                >
                    <Heading
                        title={"Top Brands"}
                        typography={"h1"}
                    />
                    <Separator className="my-4"/>
                    <Brands/>
                </div>

                {categories.map((category) => (
                    <div
                        className="
                        mt-14
                        w-full
                    "
                    >
                        <div className="flex justify-between items-center">
                            <Heading
                                title={category}
                                typography={"h1"}
                            />
                            <Button
                                onClick={() => router.push("/categories/" + category)} variant={"link"}>
                                View all
                            </Button>
                        </div>
                        <Separator className="my-4"/>
                        <ProductList category={category} itemsPerPage={4} showPaginate={false}/>
                    </div>
                ))}
            </main>
        </>
    )
}
