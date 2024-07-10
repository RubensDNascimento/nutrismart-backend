import User  from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const UserFactory = Factory.define(User, ({ faker }) =>{

  return {

    email: faker.internet.email(),
    nome: faker.name.findName(),
    sobrenome: faker.name.lastName(),
    apelido: faker.name.middleName(),
    senha: faker.internet.password(),
    tipo: 1,
    avatar: faker.internet.avatar()
  }

}).build()

export const NutriFactory = Factory.define(User, ({ faker }) =>{

  return {

    email: faker.internet.email(),
    nome: faker.name.findName(),
    sobrenome: faker.name.lastName(),
    apelido: faker.name.middleName(),
    senha: faker.internet.password(),
    crm: faker.random.numeric(6),
    tipo: 1,
    avatar: faker.internet.avatar()
  }

}).build()
