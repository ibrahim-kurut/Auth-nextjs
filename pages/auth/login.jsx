import InputComp from '@/components/InputComp/InputComp'
import Link from 'next/link'


const Login = () => {
    return (
        <>
            <div className="flex flex-col mt-20 items-center">
                <div className="mb-5 text-3xl capitalize">login page</div>
                <div className="w-[60%] h-fit py-10 bg-gray-200 rounded-lg">
                    <div className="mx-5">
                        <InputComp />
                        <InputComp />
                        <button className="bg-gray-800 w-full text-white py-3 rounded-lg capitalize hover:bg-gray-950 transition-all">submit</button>
                    </div>
                </div>
                <Link href="/auth/register">create a new account ...</Link>
            </div>
        </>
    )
}

export default Login