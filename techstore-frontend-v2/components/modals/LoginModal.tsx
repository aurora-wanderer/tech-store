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
import {AiFillGithub, AiOutlineGoogle} from "react-icons/ai";
import {z} from "zod";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import Modal from "~/components/modals/Modal";
import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";
import {toast, ToastOptions} from "react-toastify";
import {signIn} from "next-auth/react";

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
            .max(12, {message: "Must be 12 or fewer characters long"})
    }).required();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
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

        // server
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(callback => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.update(id, {
                    ...toastOptions,
                    render: "Login Successfully",
                    type: "success",
                })
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.update(id, {
                    ...toastOptions,
                    render: callback.status + " Login Failed! ",
                    type: "error",
                })
            }
        })
    };

    const handleClose = useCallback(() => {
        loginModal.onClose();
        form.reset();
    }, [loginModal, form]);

    const bodyContent = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 justify-center h-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className="flex items-center justify-between"
                            >
                                <span>Email</span>
                                <FormMessage/>
                            </FormLabel>

                            <FormControl>
                                <Input type="text" placeholder="Enter your email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className="flex items-center justify-between"
                            >
                                <span>Password</span>
                                <FormMessage/>
                            </FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit" disabled={isLoading}>Login</Button>
            </form>
        </Form>
    )

    const footerContent = (
        <div className="flex flex-col gap-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div
                className="
                  flex flex-col gap-4
                  lg:flex-row
                "
            >
                <Button
                    disabled={isLoading}
                    className="flex-1"
                    variant="outline"
                    onClick={() => signIn('google')}
                >
                    <AiOutlineGoogle className="mr-4"/>
                    Continue with Google
                </Button>
                <Button
                    disabled={isLoading}
                    className="flex-1"
                    variant="outline"
                    onClick={() => signIn("github")}
                >
                    <AiFillGithub className="mr-4"/>
                    Continue with Github
                </Button>
            </div>
            <div
                className="
                  mt-4 text-center font-light text-muted-foreground
                "
            >
                <p>
                    Don{"'"}t any have Account?
                    <span
                        onClick={onToggle}
                        className="
                            cursor-pointer
                            text-foreground
                            hover:underline
                        "
                    >
                        {" "}
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            title="Login"
            onClose={handleClose}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
