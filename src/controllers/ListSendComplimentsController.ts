import { Request, Response } from "express";
import { ListSendComplimentsService } from "../services/ListSendComplimentsService";


class ListSendComplimentsController{

    async handle(request: Request, response: Response){
        const { user_id } = request;

        const listSendComplimentsService = new ListSendComplimentsService();

        const compliments = await listSendComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListSendComplimentsController };