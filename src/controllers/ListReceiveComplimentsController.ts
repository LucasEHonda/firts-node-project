import { Request, Response } from "express";
import { ListReceiveComplimentsService } from "../services/ListReceiveComplimentsService";


class ListReceiveComplimentsController{

    async handle(request: Request, response: Response){
        const { user_id } = request;

        const listReceiveComplimentsService = new ListReceiveComplimentsService();

        const compliments = await listReceiveComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListReceiveComplimentsController };