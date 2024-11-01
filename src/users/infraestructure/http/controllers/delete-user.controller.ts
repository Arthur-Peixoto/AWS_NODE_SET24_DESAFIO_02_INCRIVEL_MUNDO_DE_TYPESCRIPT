import { Request, Response } from 'express';
import { UsersTypeormRepository } from '@/users/infraestructure/typeorm/repositories/users-typeorm.repository';
import { User } from '../../typeorm/entities/users.entity';
import { dataSource } from '@/common/infraestructure/typeorm';
import { DeleteUserUseCase } from '@/users/usecases/delete-user.usecase';


    export async function DeleteUserController(req: Request, res: Response) {
        const { id } = req.params;

        const deleteUserUseCase = new DeleteUserUseCase(
            new UsersTypeormRepository(dataSource.getRepository(User)),
        );

        const deletedUser = await deleteUserUseCase.execute(id);

        return res.status(201).json(deletedUser);
    }
