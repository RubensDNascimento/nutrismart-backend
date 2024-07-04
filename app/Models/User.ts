import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string
  @column()
  public sobrenome: string
  @column()
  public apelido: string
  @column()
  public email: string
  @column()
  public senha: string
  @column()
  public crm: string
  @column()
  public tipo: number
  @column()
  public avatar: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User){
    if(user.$dirty.senha)
      user.senha = await Hash.make(user.senha)
  }
}
