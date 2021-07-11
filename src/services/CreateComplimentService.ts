import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string,
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message} : IComplimentRequest) {
        const complimentsRepositories =  getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UserRepositories);

        if(user_receiver === user_sender){
            throw Error("User can't send compliments to your self");
        }
        
        const userReceiverExists = await usersRepository.findOne(user_receiver);

        if (!userReceiverExists){
            throw new Error("User receiver doesn't exists");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });
        
        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService};
