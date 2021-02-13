import { render, screen } from '@testing-library/react'
import Expense from '../index'

describe('Expense', () => {
  it('renders the description', () => {
    const description = 'Netflix'
    render(<Expense description={description} />)
    expect(screen.getByText(/netflix/i)).toBeInTheDocument()
  })

  it('renders another description', () => {
    const description = 'Spotify'
    render(<Expense description={description} />)
    expect(screen.getByText(/spotify/i)).toBeInTheDocument()
  })
})
