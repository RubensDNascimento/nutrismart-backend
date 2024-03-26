import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: String
  @column()
  public sobrenome: String
  @column()
  public apelido: String
  @column()
  public email: String
  @column()
  public senha: String
  @column()
  public crm: String
  @column()
  public tipo: number
  @column()
  public avatar: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
