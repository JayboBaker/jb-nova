import React from 'react'
import { render } from '@testing-library/react'
import Todos from './Todos'

describe('<Todos />', () => {
  it('renders an empty state by default', () => {
    const { getByText } = render(<Todos />)
    const text = getByText(/You don\'t have any todos./i)
    expect(text).toBeInTheDocument()
  })
})
