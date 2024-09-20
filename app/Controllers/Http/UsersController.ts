import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException';
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class UsersController {
  public async store({request, response}:HttpContextContract){
    const userPayload = await request.validate(CreateUserValidator) //request.only(['nome','sobrenome','apelido','email','senha','crm','avatar', 'tipo'])


    const userByEmail = await User.findBy('email', userPayload.email)
    const userByApelido = await User.findBy('apelido', userPayload.apelido)

    if (userByEmail) throw new BadRequestException("Email já em uso", 409);
    if (userByApelido) throw new BadRequestException("Apelido já em uso", 409);
    if ( userPayload.crm ) {
      const userByCRM = await User.findBy('crm', userPayload.crm)
      if (userByCRM) throw new BadRequestException("CRM já em uso", 409);
    }



    const user = await User.create(userPayload)

    return response.created({ user })
  }
}
