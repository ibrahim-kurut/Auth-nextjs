import InputComp from '@/components/InputComp/InputComp'
import Link from 'next/link'
import { useFormik } from 'formik';
import { loginSchema } from '@/Schema/loginSchema'
import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';

import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Login = () => {


    const { push } = useRouter()
    const { data: session } = useSession()
    console.log('session => ', session);




    const onSubmit = async (values, actions) => {
        const { email, password } = values
        // console.log(values);
        let options = { redirect: false, email, password };

        const res = await signIn("credentials", options);

        if (res.status === 200) {
            toast.success("Logged in successfully")
            actions.resetForm()
        } else {
            toast.error(res.error)
        }
        actions.resetForm()
    }





    const [currentUser, setCurrentUser] = useState();


    console.log(session);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
                setCurrentUser(
                    res.data?.find((user) => user.email === session?.user?.email)
                );
                // session true ise push la
                session && push("/profile/" + currentUser?._id);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [session, push, currentUser]);







    // form validation use formik and Yup
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


export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    // db`ten user almak id sine gore

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const user = await res.data?.find((user) => user.email === session?.user.email)

    console.log(user);
    if (session && user) {
        return {
            redirect: {
                // Giriş yaptıktan sonra dinamik olarak yonlendirmek istiyoruz 
                destination: "/profile/" + user._id,
                permanent: false
            }
        }
    }
    return {
        props: {}
    }

}

export default Login