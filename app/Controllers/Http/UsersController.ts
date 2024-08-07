import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException';
import User from 'App/Models/User'

export default class UsersController {
  public async store({request, response}:HttpContextContract){
    const userPayload = request.only(['nome','sobrenome','apelido','email','senha','crm','avatar', 'tipo'])

    if (!userPayload.email || !userPayload.nome || !userPayload.sobrenome || !userPayload.apelido) {
      throw new BadRequestException("Campo obrigatório não preenchido", 422);
    }


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
