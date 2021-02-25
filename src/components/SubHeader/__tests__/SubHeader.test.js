import { render, screen } from '@testing-library/react'
import SubHeader from '../SubHeader'

test('renders the title', () => {
  render(<SubHeader title='My Expenses' />)
  expect(
    screen.getByRole('heading', { name: /my expenses/i })
  ).toBeInTheDocument()
})
