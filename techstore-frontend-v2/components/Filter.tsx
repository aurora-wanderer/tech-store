'use client'
import React, {useMemo} from 'react';
import Heading from "~/components/Heading";
import {Checkbox} from "~/components/ui/checkbox";
import {Separator} from "~/components/ui/separator";
import {FilterIcon} from "lucide-react";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Accordion, Breadcrumbs, createStyles, rem} from "@mantine/core";
import {useGetCategoriesQuery} from "~/redux/services/categoryApi";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useParams} from "next/dist/client/components/navigation";
import {Product} from "~/interfaces/models";
import {CheckedState} from "@radix-ui/react-checkbox";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderRadius: theme.radius.sm,
    },

    item: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        border: `${rem(1)} solid transparent`,
        position: 'relative',
        zIndex: 0,
        transition: 'transform 150ms ease',

        '&[data-active]': {
            transform: 'scale(1.03)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
        },
    },

    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));

const Filter = ({name}: { name: string }) => {
    const router = useRouter();
    const searchParam = useSearchParams();
    const pathName = usePathname();
    const pathNames = ["Home", ...pathName.slice(1).split("/")];

    const {classes} = useStyles();
    const formSchema = z.object({
        minPrice: z.number().min(2).max(50),
        maxPrice: z.number().min(2).max(50),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: undefined,
            maxPrice: undefined
        },
    })

    const {data} = useGetCategoriesQuery(name);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const handleChecked = (checked: CheckedState, item: { id: string, name: string, brand: string }) => {
        let href = pathName.concat("?" + searchParam.toString())

        if (checked) {
            if (href.includes("brand")) {
                href = href.replace(href.substring(href.indexOf('brand') + 6), item.brand)
                router.push(href);
                return;
            }

            router.push(href + "&brand=" + item.brand)
        } else {

        }
    }


    return (
        <>
            <div className="flex items-center gap-4">
                <FilterIcon/>
                <Heading title={"Filter"} typography={"h2"}/>
            </div>

            <Accordion
                w={"100%"}
                maw={420}
                mx="auto"
                variant="filled"
                defaultValue="customization"
                classNames={classes}
                className={classes.root}
            >
                <Accordion.Item value={"Brand"}>
                    <Accordion.Control>Brand</Accordion.Control>
                    <Accordion.Panel>
                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            {data && data.map((item) => (
                                <div className="flex items-center space-x-2" key={item.id}>
                                    <Checkbox
                                        id={item.id}
                                        onCheckedChange={(checked) => handleChecked(checked, item)}
                                        checked={searchParam.get('brand') === item.brand}
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item.brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={"Price"}>
                    <Accordion.Control>
                        Price
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}
                                  className="grid grid-cols-4 gap-4 place-content-center items-baseline">
                                <FormField
                                    control={form.control}
                                    name="minPrice"
                                    render={({field}) => (
                                        <FormItem className="col-span-2">
                                            <FormControl>
                                                <Input placeholder="Min price..." {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxPrice"
                                    render={({field}) => (
                                        <FormItem className="col-span-2">
                                            <FormControl>
                                                <Input placeholder="Max price..." {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button className="col-span-5" type="submit">OK</Button>
                            </form>
                        </Form>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Separator/>
        </>
    );
};

export default Filter;
