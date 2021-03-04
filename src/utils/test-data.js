import { build, fake } from 'test-data-bot'

export const itemBuilder = build('Item').fields({
  _id: fake(f => f.random.uuid()),
  title: fake(f => f.lorem.word()),
  quantity: fake(f => f.random.number()),
  price: fake(f => f.random.number())
})
