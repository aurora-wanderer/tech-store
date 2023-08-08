'use client'

import {RootState} from '~/redux';
import {useAppDispatch, useAppSelector} from "~/redux/hooks";
import {clearCart, selectTotalAmount} from "~/redux/reducer/cartReducer";
import CartCard from "~/components/CartCard";
import {Button} from "~/components/ui/button";
import {ScrollArea} from "~/components/ui/scroll-area";
import numeral from "numeral";
import {Checkbox} from "~/components/ui/checkbox";

const Cart = () => {
    const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useAppDispatch();
    const totalAmount = useAppSelector(selectTotalAmount);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const content = (
        <>
            {cartItems.map(cartItem => (
                <CartCard key={cartItem.id} item={cartItem}/>
            ))}
        </>
    )

    const noContent = (
        <div className="w-full flex items-center justify-center">
            <span>No item added</span>
        </div>
    )

    return (
        <div className="px-2 space-y-5">
            <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Cart</p>
                <Button variant="link" className="px-0" onClick={handleClearCart}>Clear</Button>
            </div>
            <ScrollArea className="h-[400px] w-[400px] rounded-md border p-4">
                {cartItems.length === 0 ? noContent : content}
            </ScrollArea>
            <div className="flex items-center justify-between ">
                <div className="font-semibold text-md">
                    Amount: {numeral(totalAmount).format('0,0')}
                </div>

                <div className="space-x-4">
                    <Button variant={"outline"}>Basket</Button>
                    <Button>Order</Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
