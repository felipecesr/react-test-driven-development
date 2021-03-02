import ListItem from 'components/ListItem/ListItem'

function App() {
  return (
    <div>
      <h1>My app</h1>
      <ListItem
        name='netflix'
        label='Netflix'
        value={45.9}
        onChange={() => null}
      />
    </div>
  )
}

export default App
