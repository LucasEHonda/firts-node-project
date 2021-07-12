import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController{

    async handle(request: Request, response: Response){
        const listSendTagsService = new ListTagsService();

        const tags = await listSendTagsService.execute();

        return response.json(tags);
    }
}

export { ListTagsController };