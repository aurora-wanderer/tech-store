"use client"

import {Button} from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import {Input} from "~/components/ui/input"
import {z} from "zod";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import Modal from "~/components/modals/Modal";
import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";
import {toast, ToastOptions} from "react-toastify";
import axios from "axios";
import {Loader} from "lucide-react";

const LoginModal = () => {
    const router = useRouter();

    //modal hooks
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        email: z.string()
            .nonempty({message: "Email is required"})
            .email({message: "Invalid email address"}),
        password: z.string()
            .nonempty({message: "Password is required"})
            .min(6, {message: "Must be 6 or more characters long"})
            .max(12, {message: "Must be 12 or fewer characters long"}),
        confirm: z.string()
            .nonempty({message: "Confirm is required"})
            .min(6, {message: "Must be 6 or more characters long"})
            .max(12, {message: "Must be 12 or fewer characters long"})
    }).required().refine((data) => data.password === data.confirm, {
        message: 'Passwords do not match',
        path: ["confirm"],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: ""
        },
    })

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
        form.reset();
    }, [loginModal, registerModal, form]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastOptions: ToastOptions = {
            isLoading: false,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
        };

        setIsLoading(true);
        const id = toast.loading("Please waiting...");

        try {
            await axios.post(process.env.API_URL + "/auth/sign-up", data);

            setIsLoading(false);
            toast.update(id, {
                type: "success",
                render: (
                    <div className="
                        flex flex-col gap-y-2
                    ">
                        <span className="font-bold text-lg text-green-500">Sign up successfully</span>
                        <span
                            className="text-sm text-neutral-700"
                        >
                            Please check your email and verify your account !
                        </span>
                    </div>
                ),
                ...toastOptions
            });

            registerModal.onClose();
            loginModal.onOpen();
            form.reset();
        } catch (error: any) {
            toast.update(id, {
                type: "error",
                render: "Sign up failed!" + error.message,
                ...toastOptions
            });
            form.reset();
        }
    };

    const handleClose = useCallback(() => {
        registerModal.onClose();
        form.reset();
    }, [registerModal, form]);

    const bodyContent = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 justify-center h-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">
                    {isLoading && <Loader/>}
                    Sign up
                </Button>
            </form>
        </Form>
    )

    const footerContent = (
        <>
            <div
                className="
                    mt-0
                    text-center
                    font-light
                    text-muted-foreground
                "
            >
                <p>
                    Already have an account?
                    <span
                        onClick={onToggle}
                        className="
                            cursor-pointer
                            pl-2
                            text-foreground
                            hover:underline
                        "
                    >
                    Log in
                    </span>
                </p>
            </div>
        </>
    )

    return (
        <Modal
            isOpen={registerModal.isOpen}
            title="Register"
            onClose={registerModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
