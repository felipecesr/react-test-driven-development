function makeTodo(sk, data) {
  return {
    _id: sk.replace('todo#', ''),
    ...data
  }
}

module.exports = { makeTodo }
