import React from 'react';
import {PaymentMethod} from "~/components/PaymentMethod";

const PayPage = () => {
    return (
        <div className="grid grid-cols-2 h-[100vh] w-full place-content-center">
            <PaymentMethod/>
        </div>
    );
};

export default PayPage;
