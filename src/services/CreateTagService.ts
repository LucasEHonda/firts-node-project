import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories"

interface ITagRequest{
    name: string;
}

class CreateTagService {
    async execute({ name } : ITagRequest) {
        const tagsRepository =  getCustomRepository(TagRepositories);

        if (!name){
            throw new Error("Incorrect name");
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name,
        });

        if (tagAlreadyExists){
            throw new Error("Tag already exists");
        }

        const tag = tagsRepository.create({
            name,
        });

        await tagsRepository.save(tag);

        return tag;
    }
}

export { CreateTagService};
