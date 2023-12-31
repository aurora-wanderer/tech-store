import './globals.css'

import {Inter} from 'next/font/google'
import React from "react";
import Header from "../components/header/Header";
import Providers from "~/components/Providers";
import LoginModal from "~/components/modals/LoginModal";
import RegisterModal from "~/components/modals/RegisterModal";


const font = Inter({subsets: ['vietnamese']})

export const metadata = {
    title: 'Tech Store',
    description: 'Generated by create next app',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi">
        <body className={font.className}>
        <Providers>
            <LoginModal/>
            <RegisterModal/>
            <Header/>
            {children}
        </Providers>
        </body>
        </html>
    )
}
