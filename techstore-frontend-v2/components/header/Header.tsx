'use client';

import React, {useCallback} from 'react';
import Link from "next/link";
import {Button} from "~/components/ui/button";
import {
    CreditCard,
    HeartIcon,
    LogIn,
    LucideShoppingCart, Menu, MenuIcon, MoonIcon,
    SearchIcon, Settings,
    SunIcon,
    User
} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {Toggle} from "~/components/ui/toggle";
import {useTheme} from "next-themes";
import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";
import {Badge} from "~/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "~/components/ui/dialog";
import {AiOutlineHome} from "react-icons/ai";
import {signOut, useSession} from "next-auth/react";
import Cart from "~/components/Cart";
import Search from "~/components/header/Search";
import {useAppSelector} from "~/redux/hooks";
import {RootState} from "~/redux";
import {selectTotalItems} from "~/redux/reducer/cartReducer";

const Header = () => {
    const totalItems = useAppSelector(selectTotalItems);
    //modal hooks
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const {data: user} = useSession();

    const {theme, setTheme} = useTheme();

    const toggleTheme = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light");
    }, [setTheme, theme]);

    return (
        <>
            <div
                className="
                static sm:fixed top-0
                w-full
                z-20
                shadow-md
                border-b-[1px]
                py-4
                bg-background
            "
            >
                <div className="
                    sm:container sm:mx-auto px-4 sm:px-0
                ">
                    <div className="
                    flex items-center justify-between gap-x-4
                ">
                        <Link
                            href="/"
                            className="
                                scroll-m-20
                                text-2xl
                                font-semibold
                                tracking-tight
                                cursor-pointer
                            "
                        >
                            TechStore
                        </Link>

                        <Search className="hidden sm:flex"/>

                        <div className="flex w-auto max-w-sm items-center gap-x-2">
                            <Popover>
                                <PopoverTrigger className="hidden sm:block">
                                    <Button variant="ghost" className="relative">
                                        <LucideShoppingCart/>
                                        <Badge
                                            variant={"destructive"}
                                            className="absolute -top-2 -right-2 pointer-events-none"
                                        >
                                            {totalItems || 0}
                                        </Badge>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-max">
                                    <Cart/>
                                </PopoverContent>
                            </Popover>

                            <Toggle aria-label="Toggle theme" onClick={toggleTheme} defaultChecked={false}>
                                <span>{theme && theme === "light" ? (<MoonIcon/>) : (<SunIcon/>)}</span>
                            </Toggle>

                            {!user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="hidden sm:block">
                                        <Button variant="outline">
                                            <Menu/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-fit">
                                        <DropdownMenuItem
                                            className="flex w-full justify-start h-10 py-2 px-4 text-sm font-medium"
                                            onClick={registerModal.onOpen}
                                        >
                                            Sign up
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem
                                            className="flex w-full justify-start h-10 py-2 px-4 text-sm font-medium"
                                            onClick={loginModal.onOpen}
                                        >
                                            Sign in
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="hidden sm:block">
                                        <Button variant="outline">
                                            <MenuIcon/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>
                                            Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4"/>
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <HeartIcon className="mr-2 h-4 w-4"/>
                                                <span>Favorite</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <CreditCard className="mr-2 h-4 w-4"/>
                                                <span>Billing</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4"/>
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem onClick={() => signOut()}>
                                            <LogIn className="mr-2 h-4 w-4"/>
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="
                    block
                    sm:hidden
                    fixed
                    bottom-0
                    left-0 z-50
                    w-full
                    h-16
                    border-t-2
                    shadow-accent-foreground
                    bg-background
                "
            >
                <div
                    className="
                        grid grid-cols-5
                        place-content-center
                        gap-4
                        h-full
                    "
                >
                    <Button variant="ghost" className="h-full">
                        <AiOutlineHome size={28}/>
                        <div className="sr-only">Home</div>
                    </Button>
                    <Button variant="ghost" className="h-full">
                        <HeartIcon size={28}/>
                        <div className="sr-only">Favorite</div>
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-full">
                                <SearchIcon size={28}/>
                                <div className="sr-only">Search</div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="[&>button]:hidden block sm:hidden">
                            <Search className="flex"/>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" className="h-full">
                        <LucideShoppingCart size={28}/>
                        <div className="sr-only">Cart</div>
                    </Button>
                    <Button variant="ghost" className="h-full">
                        <MenuIcon size={28}/>
                        <div className="sr-only">Menu</div>
                    </Button>
                </div>
            </div>

        </>
    );
};

export default Header;
