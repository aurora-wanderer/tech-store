'use client'
import React, {useMemo, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandGroup, CommandItem} from "~/components/ui/command";
import {cn} from "~/lib/utils";
import {AiOutlineSortAscending, AiOutlineSortDescending} from "react-icons/ai";

const Sorting = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const sortings = useMemo(() => [
        {
            value: "asc",
            label: "ASC",
            icon: AiOutlineSortDescending
        },
        {
            value: "desc",
            label: "DESC",
            icon: AiOutlineSortAscending
        }
    ], []);


    const handleSelect = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? sortings.find((sorting) => sorting.value === value)?.label
                        : "Sorting by..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {sortings.map((sorting) => (
                            <CommandItem
                                className="flex items-center justify-start gap-4"
                                key={sorting.value}
                                onSelect={handleSelect}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === sorting.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {sorting.label}

                                {sorting.icon && (<sorting.icon className="self-end flex-1"/>)}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Sorting;
