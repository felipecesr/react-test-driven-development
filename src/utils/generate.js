import { build, fake } from 'test-data-bot'

export const itemBuilder = build('Item').fields({
  _id: fake(f => f.random.uuid()),
  title: fake(f => f.lorem.word()),
  quantity: fake(f => f.random.number()),
  price: fake(f => f.random.number())
})

export const userBuilder = build('User').fields({
  full_name: fake(f => `${f.name.firstName()} ${f.name.lastName()}`)
})

export const loginBuilder = build('Login').fields({
  username: fake(f => f.internet.userName()),
  password: fake(f => f.internet.password())
})
