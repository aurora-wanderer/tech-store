import React from 'react';

export interface Typography {

}

interface HeadingProps {
    title: string;
    typography: "h1" | "h2" | "h3" | "h4" | "h5"
    children?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = (
    {
        title,
        children,
        typography
    }
) => {
    return (
        <div
            className="flex flex-row items-center justify-between"
        >
            {typography === "h1" && (
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {title}
                </h1>
            )}

            {typography === "h2" && (
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    {title}
                </h2>
            )}

            {typography === "h3" && (
                <h3 className="scroll-m-20 text-2xl font-medium tracking-wide">
                    {title}
                </h3>
            )}

            {typography === "h4" && (
                <h1 className="scroll-m-20 text-xl font-normal tracking-normal">
                    {title}
                </h1>
            )}

            {typography === "h5" && (
                <h1 className="scroll-m-20 text-lg font-light">
                    {title}
                </h1>
            )}
            {children}
        </div>
    );
};

export default Heading;
