import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { Exception } from '@adonisjs/core/build/standalone'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: Exception, ctx: HttpContextContract){
    if (error.status === 422)
      return ctx.response.status(error.status).send({
    code: 'BAD_REQUEST',
    message: error.status,
    status: error.status,
    errors: error['messages']?.errors ? error['messages'].errors : '',
  })
  return super.handle(error, ctx)
  }


}
