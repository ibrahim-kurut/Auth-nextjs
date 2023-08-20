import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/util/dbConnection";
import bcrypt from 'bcryptjs'
dbConnect()
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials.email
                const password = credentials.password

                const user = await User.findOne({ email: email })
                if (!user) {
                    throw new Error("you haven`t registered yet !")
                }
                if (user) {
                    return signInUser({ user, password })
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    database: process.env.MONGODB_URI,
    secret: "secret",
})


const signInUser = async ({ user, password }) => {
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("password is not match")
    }
    return user
}
