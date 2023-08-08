import * as Yup from "yup"
export const loginSchema = Yup.object({

    email: Yup.string()
        .required("email is required")
        .email("email is not valid"),
    password: Yup.string()
        .required("password is required")
        .min(8, "password must be at least 8 chracters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase, one lowercase, one number and one special character."
        ),


})