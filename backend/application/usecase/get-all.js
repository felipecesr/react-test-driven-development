const { makeTodo } = require('../../domain/entity/todo')

const getAllTodos = listByUser => async userid => {
  const items = await listByUser(userid)
  return items.map(({ sk, data }) => makeTodo(sk, data))
}

module.exports = { getAllTodos }
