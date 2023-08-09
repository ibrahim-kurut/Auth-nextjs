import User from "@/models/User";
import dbConnect from "@/util/dbConnection";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
    await dbConnect()

    const body = req.body

    // Block registration with same email
    const user = await User.findOne({ email: body.email })
    if (user) {
        res.status(400).json({ msg: "This User Already Exists" })
        return;
    }
    try {
        const newUser = await new User(body)
        // encrypting passwords
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt)
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error);
    }
}

export default handler