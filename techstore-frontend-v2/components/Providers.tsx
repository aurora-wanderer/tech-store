'use client'

import React, {PropsWithChildren} from 'react';
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import {store} from "~/redux";
import {SessionProvider} from "next-auth/react";
import {MantineProvider} from "@mantine/styles";
import {ThemeProvider} from "next-themes";

const Providers = ({children}: PropsWithChildren) => {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme={"light"}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Provider store={store}>
                    <MantineProvider withNormalizeCSS>
                        {children}
                    </MantineProvider>
                </Provider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default Providers;
