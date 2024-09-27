import { UserFactory, NutriFactory } from './../../../database/factories/index';
import Database from '@ioc:Adonis/Lucid/Database';
import { assert } from '@japa/preset-adonis';
import { Group, test } from '@japa/runner';

test.group('User', (group) =>{

  test('Deve ser criado um usuario', async ({ client, assert }) => {
    const userPayload = {
      email: 'test@test.com',
      nome: 'tester',
      sobrenome: 'testador',
      apelido: 'test',
      senha: 'test',
      crm: '',
      tipo: 1,
      avatar: 'https://imags.com/image/1'
    }

    const response = await client.post('/users').json(userPayload)

    const { senha, avatar, ...expected } = userPayload

    response.assertStatus(201)
    response.assertBodyContains({ user: expected })


    assert.exists(response.body().user.senha, 'Senha definida')

  })



  test('deve retornar 409 quando email ja em uso', async ({client, assert})=>{

    const {email} = await UserFactory.create()


    const response = await client.post('/users').json({
      email,
      nome: 'tester',
      sobrenome: 'testador',
      apelido: 'test',
      senha: 'test',
      tipo: 1,
      avatar: 'https://imags.com/image/1'
    })

    response.assertStatus(409)
    response.assertTextIncludes(response.body().message)


    //assert.include(response.body.message, 'email')

    console.log(response.body());

    console.log('Mensagem: ' + response.body().message)

  })

  test('deve retornar 409 quando apelido ja em uso', async ({client, assert})=>{

    const {apelido} = await UserFactory.create()
    console.log("Apelido" + apelido);



    const response = await client.post('/users').json({
      email: 'teste@tester.com',
      nome: 'tester',
      sobrenome: 'testador',
      apelido,
      senha: 'test',
      tipo: 1,
      avatar: 'https://imags.com/image/1'
    })

    response.assertStatus(422)
    response.assertTextIncludes(response.body().message)


    //assert.include(response.body.message, 'email')

    console.log(response.body());

    console.log('Mensagem: ' + response.body().message)

  })

  test('deve retornar 409 quando CRM ja em uso', async ({client, assert})=>{

    const {crm} = await NutriFactory.create()


    const response = await client.post('/users').json({
      email: 'teste@tester.com',
      nome: 'tester',
      sobrenome: 'testador',
      apelido: 'test',
      senha: 'test',
      crm,
      tipo: 1,
      avatar: 'https://imags.com/image/1'
    })

    response.assertStatus(409)
    response.assertTextIncludes(response.body().message)


    //assert.include(response.body.message, 'email')

    console.log(response.body());

    console.log('Mensagem: ' + response.body().message)

  })

  test('Deve retornar 422 quando dado obrigatorio nao fornecido', async ({client, assert}) =>{
    const response = await client.post('/users').json({
    })

    response.assertStatus(422)
    response.assertTextIncludes(response.body().message)


    console.log(response.body());

    console.log('Mensagem: ' + response.body().message)

  })



  group.each.setup(async ()=>{
    await Database.beginGlobalTransaction()
    return ()=>{
      Database.rollbackGlobalTransaction()
    }
  })
})
