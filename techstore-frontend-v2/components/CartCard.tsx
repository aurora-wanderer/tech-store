'use client'

import React, {useCallback, useState} from 'react';
import {CartItem} from "~/interfaces/models";
import Image from "next/image";
import {Button} from "~/components/ui/button";
import numeral from 'numeral';
import {useAppDispatch, useAppSelector} from "~/redux/hooks";
import {RootState} from "~/redux";
import {decrementQuantity, incrementQuantity, removeFromCart} from "~/redux/reducer/cartReducer";
import {IoMdClose} from "react-icons/io";
import {useSwipeable} from "react-swipeable";
import {MdDeleteSweep} from "react-icons/md";
import {toast} from "react-toastify";
import {Checkbox} from "~/components/ui/checkbox";

interface CartItemProps {
    item: CartItem
}

const CartCard: React.FC<CartItemProps> = ({item}) => {

    const [swiped, setSwiped] = useState(false);
    const dispatch = useAppDispatch();

    const handleIncrement = useCallback(() => {
        dispatch(incrementQuantity(item.id))
    }, [dispatch, item.id])

    const handleDecrement = useCallback(() => {
        dispatch(decrementQuantity(item.id))
    }, [dispatch, item.id])

    const handleRemove = useCallback(() => {
        dispatch(removeFromCart(item.id))
        toast.success("Remove success")
    }, [dispatch, item.id])

    const handlers = useSwipeable({
        onSwipedRight: (eventData) => {
            setSwiped(false)
        },
        onSwipedLeft: (e) => {
            setSwiped(true)
        },
        trackMouse: true
    });

    return (
        <>
            <div className={`
                max-w-sm
                rounded-2
                flex
                gap-x-3
                space-y-2
                my-4
                first:mt-0
                last:mb-0
                py-2
                transition
                select-none
                relative
                ${swiped ? '-translate-x-[70px]' : 'translate-x-0'}
            `} {...handlers}>
                <Image
                    alt={item.name}
                    src={"/app/" + item.thumbnail}
                    width={100}
                    height={150}
                />

                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-foreground/80">{item.name}</p>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">{numeral(item.price).format("0,0") + "  VND"}</span>
                        <div className="flex items-center gap-x-2 ">
                            <Button className="rounded-full" type={"button"} variant={"outline"}
                                    onClick={handleDecrement}>-</Button>
                            <span>{item.quantity}</span>
                            <Button className="rounded-full" type={"button"} variant={"outline"}
                                    onClick={handleIncrement}>+</Button>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleRemove}
                    className="absolute right-0 w-[70px] h-full flex items-center translate-x-[70px]"
                >
                    <MdDeleteSweep size={50}/>
                </Button>
            </div>
        </>
    );
};

export default CartCard;
