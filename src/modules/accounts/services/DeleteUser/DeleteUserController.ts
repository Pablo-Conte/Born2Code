import { Request, Response } from "express";
import { DeleteUserService } from "./DeleteUserService";

class DeleteUserController {
    async control(request: Request, response: Response): Promise<Response> {

        const { userId } = request.user;

        const userIdDelete = request.headers["x-user-id"] as string

        const deleteUserService = new DeleteUserService();

        const deleteUser = await deleteUserService.execute({ myId: userId, id: userIdDelete })

        return response.status(204).send();
    }
}

export { DeleteUserController };

// passar os dois requests criados para dentro do serviço
// verificar se os IDs são diferentes ou não para saber se sou eu ou não
// se for igual deleta-me
// se não, verifica se existe
// se existir, deleta, senão, joga mensagem de erro