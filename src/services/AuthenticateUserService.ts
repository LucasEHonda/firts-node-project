import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest{
    email: string;
    password: string,
}

class AuthenticateUserService {
    async execute({ email, password } : IAuthenticateRequest) {
        const usersRepository =  getCustomRepository(UserRepositories);

        const user = await usersRepository.findOne({
            email,
        });

        if(!user){
            throw new Error("User doesn't exist");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Password incorrect");
        }

        const token = sign({
            email: user.email
        },"30d751d3565053529539ae13bd70521d", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService};
