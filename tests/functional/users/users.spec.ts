import { test } from '@japa/runner';

test.group('User', (group) =>{

  test('Deve ser criado um usuario', async ({ client, assert }) => {
    const userPayload = {
      email: 'test@test.com',
      username: 'test',
      senha: 'test',
      avatar: 'https://images.com/image/1'
    }

    const response = await client.post('/users').json(userPayload)

    const { senha, avatar, ...expected } = userPayload

    response.assertStatus(201)
    response.assertBodyContains({user: expected})

    assert.notExists(response.body().user.senha, 'Senha defined')

  })
})
