import InputComp from '@/components/InputComp/InputComp'
import Link from 'next/link'
import { useFormik } from 'formik';
import { loginSchema } from '@/Schema/loginSchema'



const Login = () => {
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        actions.resetForm()
    }

    // use formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit,
        // Yup
        validationSchema: loginSchema,
    })

    const inputs = [
        {
            id: 1,
            type: "email",
            name: "email",
            placeholder: "your email address",
            value: formik.values.email,
            errorMessage: formik.errors.email,
            touched: formik.touched.email



        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: "your password",
            value: formik.values.password,
            errorMessage: formik.errors.password,
            touched: formik.touched.password




        }
    ]




    return (
        <>
            <div className="flex flex-col mt-20 items-center">
                <div className="mb-5 text-3xl capitalize">login page</div>
                <div className="w-[60%] h-fit py-10 bg-gray-200 rounded-lg">
                    <div className="mx-5">
                        {/* <InputComp />
                        <InputComp /> */}


                        <form onSubmit={formik.handleSubmit}>
                            {inputs.map((input) => {
                                return (
                                    <InputComp
                                        key={input.id}
                                        {...input}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}

                                    />
                                )
                            })}
                            <button type='submit' className="bg-gray-800 w-full text-white py-3 rounded-lg capitalize hover:bg-gray-950 transition-all">submit</button>
                        </form>







                    </div>
                </div>
                <Link href="/auth/register">create a new account ...</Link>
            </div>
        </>
    )
}

export default Login