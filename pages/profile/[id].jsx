import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const index = () => {
    const { data: session } = useSession()
    const { push } = useRouter()


    // create handle signout function
    const handleSignOut = () => {
        if (confirm("are you sure")) {
            signOut({ redirect: false })
        }
    }

    useEffect(() => {
        if (!session) {
            push("/auth/login")
        }
    }, [session, push])





    return (
        <div className="text-center text-3xl capitalize">
            <div>user profile</div>
            <div className='container mx-auto flex justify-start'>
                <div
                    onClick={handleSignOut}
                    className="cursor-pointer">exit</div>
            </div>
        </div>
    )
}

export default index