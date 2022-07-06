import bcryptjs from "bcryptjs";

export const encrypt = (password) => {
    const hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

    return hashedPassword;
}