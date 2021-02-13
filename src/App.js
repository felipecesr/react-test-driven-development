import Expense from 'components/Expense'

function App() {
  return (
    <div>
      <h1>Expenses</h1>
      <Expense title="Spotify" value="15,60" paid={false} />
    </div>
  )
}

export default App
