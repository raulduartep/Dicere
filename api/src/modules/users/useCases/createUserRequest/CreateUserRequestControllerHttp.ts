import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserRequestUseCase } from './CreateUserRequestUseCase';

export class CreateUserRequestControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const createUserRequestUseCase = container.resolve(
      CreateUserRequestUseCase
    );

    await createUserRequestUseCase.execute({
      email,
      name,
      password,
    });

    return response.status(201).send();
  }
}
