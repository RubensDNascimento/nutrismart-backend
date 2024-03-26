import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({request, response}:HttpContextContract){
    const userPayload = request.only(['nome','sobrenome','apelido','email','senha','avatar', 'tipo'])
    
    const user = await User.create(userPayload)    

    return response.created({ user })
  }
}
