import { build, fake } from 'test-data-bot'

export const expenseBuilder = build('Expense').fields({
  _id: fake(f => f.random.uuid()),
  text: fake(f => f.lorem.word()),
  value: fake(f => f.random.number()).toString(),
  paid: fake(f => f.random.boolean())
})
