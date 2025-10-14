import { FormikProvider } from "formik"
import CustomButton from "../components/shared/customButton"
import CustomInput from "../components/shared/input"
import useAuth from "../hooks/useAuth"


export default function ResetPassword() {

    const { formikResetPassword, resetPasswordMutation } = useAuth()

    return (
        <FormikProvider value={formikResetPassword}>
            <form onSubmit={formikResetPassword.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
                <p className=" text-primary text-2xl font-bold " >Reset Password</p>
                <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
                <div className=" w-full flex flex-col items-center gap-4 pb-3 " >
                    <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" />
                    <CustomInput borderRadius="8px" name="password" isPassword label="Password" type="password" placeholder="" />
                    <CustomButton type="submit" loading={resetPasswordMutation.isLoading} rounded="44px" width="100%" height="50px"  >Change Password</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}