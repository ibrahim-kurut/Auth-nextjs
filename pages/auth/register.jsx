import InputComp from '@/components/InputComp/InputComp'
import Link from 'next/link'

const register = () => {
    return (
        <>
            <div className="flex flex-col mt-20 items-center">
                <div className="mb-5 text-3xl capitalize">register page</div>
                <div className="w-[60%] h-fit py-10 bg-gray-200 rounded-lg">
                    <div className="mx-5">
                        <InputComp />
                        <InputComp />
                        <InputComp />
                        <InputComp />
                        <button className="bg-gray-800 w-full text-white py-3 rounded-lg capitalize hover:bg-gray-950 transition-all">submit</button>
                    </div>
                </div>
                <Link href="/auth/login">i have a account ...</Link>
            </div>
        </>
    )
}

export default register