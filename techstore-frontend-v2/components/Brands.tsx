import React, {useMemo} from 'react';
import {SiAcer, SiApple, SiHp, SiHuawei, SiJbl, SiLenovo, SiMsibusiness, SiSamsung, SiXiaomi} from "react-icons/si";
import {ScrollArea, ScrollBar} from "~/components/ui/scroll-area";
import {IconType} from "react-icons";

const Brands = () => {

    const brands = useMemo(() => [
        {
            title: "Apple Brand",
            icon: SiApple
        },
        {
            title: "Acer Brand",
            icon: SiAcer
        },
        {
            title: "Samsung Brand",
            icon: SiSamsung
        },
        {
            title: "Lenovo Brand",
            icon: SiLenovo
        },
        {
            title: "Xiaomi Brand",
            icon: SiXiaomi
        },
        {
            title: "JBL Brand",
            icon: SiJbl
        },
        {
            title: "Huawei Brand",
            icon: SiHuawei
        },
        {
            title: "HP Brand",
            icon: SiHp
        }
    ], []);

    return (
        <ScrollArea
            className="
                whitespace-nowrap
                snap-x
                w-full
                rounded-md
                border p-4 py-6
            "
        >
            {brands.map((brand, index) => {
                const Icon = brand.icon;
                return (
                    <div
                        key={index}
                        className="
                            inline-flex items-center justify-center
                            w-1/4
                            whitespace-normal
                            snap-center
                        "
                    >
                        <Icon size={100} title={brand.title}/>
                    </div>
                )
            })}

            <ScrollBar orientation={"horizontal"}/>
        </ScrollArea>
    );
};

export default Brands;
