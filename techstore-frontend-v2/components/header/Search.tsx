'use client'

import React, {useState} from 'react';
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Loader, SearchIcon} from "lucide-react";
import {cn} from "~/lib/utils";

const Search = ({className}: { className?: string }) => {

    const [searching, setSearching] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        alert(searchValue);

        //post fetch, get data and redirect to -?-
    }

    return (
        <div
            className={cn(`
            w-full max-w-sm items-center
            border-2
            rounded-lg
            overflow-hidden
        `, className
            )}
        >
            <Input
                type="text"
                placeholder="Search"
                className="
                    border-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                "
                onBlur={(e) => setSearchValue(e.target.value)}
            />
            <Button
                className="rounded-lg rounded-r-none"
                disabled={searching}
                type="submit"
                variant="default"
                onClick={handleSearch}
            >
                {searching ? <Loader className="animate-spin"/> : <SearchIcon/>}
            </Button>
        </div>
    );
}


export default Search;
