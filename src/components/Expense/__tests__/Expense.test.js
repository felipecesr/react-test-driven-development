import { render, screen } from '@testing-library/react'
import Expense from '../index'

describe('Expense', () => {
  it('renders the correct values', () => {
    const props = {
      title: 'Netflix',
      value: '15,90',
      paid: false
    }

    render(<Expense {...props} />)
    expect(screen.getByText(/netflix/i)).toBeInTheDocument()
    expect(screen.getByText('R$ 15,90')).toBeInTheDocument()
    expect(screen.getByText(/a pagar/i)).toBeInTheDocument()
  })

  it('renders another correct values', () => {
    const props = {
      title: 'Spotify',
      value: '12,90',
      paid: true
    }

    render(<Expense {...props} />)
    expect(screen.getByText(/spotify/i)).toBeInTheDocument()
    expect(screen.getByText('R$ 12,90')).toBeInTheDocument()
    expect(screen.getByText(/pago/i)).toBeInTheDocument()
  })
})
