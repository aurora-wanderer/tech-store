'use client';

import React, {useCallback, useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {MdClose} from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "~/components/ui/dialog";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = (
    {
        isOpen,
        onClose,
        title,
        body,
        footer
    }
) => {

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    h-full
                    lg:h-auto
                    md:h-auto
                    flex flex-col justify-between
                    gap-4
                    p-0
                "
            >
                <div
                    className="
                        relative
                        rounded-t
                        border-b-[1px]
                        p-4
                        text-xl font-semibold text-center
                    "
                >
                    {title}
                </div>
                <div className="flex-1 p-6">
                    {body}
                </div>
                <div className="px-4 py-6 h-fit">
                    {footer}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;