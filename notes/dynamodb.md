```javascript
const todo = {
  pk: 'user#id',
  sk: 'todo#uuid',
  data: {
    createdAt: date,
    updatedAt: date,
    done: boolean
  }
}

const settings = {
  pk: 'user#id',
  sk: 'settings',
  data: {}
}
```

partition key é exata
sort key é flexivel

O que podemos fazer é procurar por itens com a pk exatamente igual o id o usuário
e a sk começando com todo
