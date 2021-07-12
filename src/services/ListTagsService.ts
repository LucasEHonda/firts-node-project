import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";

class ListTagsService {
    async execute() {
        
        const tagRepositories =  getCustomRepository(TagRepositories);

        const tags = await tagRepositories.find()
        return tags;
    }
}

export { ListTagsService};
