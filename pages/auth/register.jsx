import InputComp from '@/components/InputComp/InputComp'
import Link from 'next/link'
import { registerSchema } from '@/Schema/registerSchema'
import { useFormik } from 'formik';

const register = () => {

    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve(alert(JSON.stringify(values, null, 2))), 2000))
        actions.resetForm()
    }

    // form validation use formik and Yup
    const formik = useFormik(
        {
            initialValues: {
                fullName: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            onSubmit,
            // Yub
            validationSchema: registerSchema
        })

    const inputs = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "your full name",
            value: formik.values.fullName,
            errorMessage: formik.errors.fullName,
            touched: formik.touched.fullName

        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "your email address",
            value: formik.values.email,
            errorMessage: formik.errors.email,
            touched: formik.touched.email
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: 'your password',
            value: formik.values.password,
            errorMessage: formik.errors.password,
            touched: formik.touched.password
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: 'retype your password ',
            value: formik.values.confirmPassword,
            errorMessage: formik.errors.confirmPassword,
            touched: formik.touched.confirmPassword
        }
    ]

    return (
        <>
            <div className="flex flex-col mt-20 items-center">
                <div className="mb-5 text-3xl capitalize">register page</div>
                <div className="w-[60%] h-fit py-10 bg-gray-200 rounded-lg">
                    <div className="mx-5">
                        <form onSubmit={formik.handleSubmit}>
                            {
                                inputs?.map((input) => {
                                    return (
                                        <InputComp
                                            key={input.id}
                                            {...input}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    )
                                })
                            }
                            <button type='submit'
                                className="bg-gray-800 w-full text-white py-3 rounded-lg capitalize hover:bg-gray-950 transition-all">submit</button>
                        </form>
                    </div>
                </div>
                <Link href="/auth/login">I have a account ...</Link>
            </div>
        </>
    )
}

export default register