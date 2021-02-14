import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import Expense from '../index'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Expense', () => {
  it('renders the correct values', () => {
    const props = {
      title: 'Netflix',
      value: '15,90',
      paid: false
    }

    renderWithTheme(<Expense {...props} />)

    expect(
      screen.getByRole('heading', { name: /netflix/i })
    ).toBeInTheDocument()
    expect(screen.getByText('R$ 15,90')).toBeInTheDocument()
    expect(screen.getByText(/a pagar/i)).toBeInTheDocument()
    expect(screen.getByText(/a pagar/i)).toHaveStyleRule(
      'background-color',
      '#f44336'
    )
  })

  it('renders another correct values', () => {
    const props = {
      title: 'Spotify',
      value: '12,90',
      paid: true
    }

    renderWithTheme(<Expense {...props} />)

    expect(
      screen.getByRole('heading', { name: /spotify/i })
    ).toBeInTheDocument()
    expect(screen.getByText('R$ 12,90')).toBeInTheDocument()
    expect(screen.getByText(/pago/i)).toBeInTheDocument()
    expect(screen.getByText(/pago/i)).toHaveStyleRule(
      'background-color',
      '#4caf50'
    )
  })
})
