import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';

test.group('User', (group) =>{

  test('Deve ser criado um usuario', async ({ client, assert }) => {
    const userPayload = {
      email: 'test@test.com',
      nome: 'tester',
      sobrenome: 'testador',
      apelido: 'test',
      senha: 'test',
      tipo: 1,
      avatar: 'https://imags.com/image/1'
    }

    const response = await client.post('/users').json(userPayload)

    const { senha, avatar, ...expected } = userPayload

    response.assertStatus(201)
    response.assertBodyContains({ user: expected })

    console.log('Senha: '+response.body().user.senha);

    assert.exists(response.body().user.senha, 'Senha definida')

  })

  group.each.setup(async ()=>{
    await Database.beginGlobalTransaction()
    return ()=>{
      Database.rollbackGlobalTransaction()
    }
  })

})
