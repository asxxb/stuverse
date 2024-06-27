import { Button, Input } from "@nextui-org/react";
import stuverse from "../../assets/stuverse.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { loginwithemailpassword } from "../../redux/slices/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = yup
    .object({
        email: yup.string().required("enter the mail bruh"),
        password: yup.string().required(),
    })
    .required()


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        try {
            await dispatch(loginwithemailpassword(data)).unwrap();
            toast.success("login success")
            navigate("/")
        } catch (error) {
            toast.error(error.toString())

        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-[20vh] px-4">
            <img src={stuverse} className=" w-40" alt="" />
            <h1 className="text-3xl font-bold ">Welcome </h1>
            <form
                id="login-form"
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    isRequired
                    size="md "
                    variant="bordered"
                    label="Email"
                    type="text"
                    placeholder="Email"
                    isInvalid={errors.email ? true : false}
                    {...register("email")}
                    errorMessage={errors.email?.message}

                />
                <Input
                    isRequired
                    size="md "
                    variant="bordered"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    isInvalid={errors.password ? true : false}
                    errorMessage={errors.password?.message}
                />
                <Button
                    type="submit"
                    className="w-full mt-2"
                    form="login-form"
                    color="primary"
                    size="md"
                    isLoading={authState.status === "loading"}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};
