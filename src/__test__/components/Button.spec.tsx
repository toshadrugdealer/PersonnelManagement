import { render, fireEvent } from '@testing-library/react'
import { Button } from '../../components/Button/Button'
import { expect, test, vi } from 'vitest'

test('check children', () => {
	const { getByRole } = render(<Button>Click Me</Button>)
	const buttonElement = getByRole('button')
	expect(buttonElement).toBeInTheDocument()
	expect(buttonElement).toHaveTextContent('Click Me')
})

test('check onClick', () => {
	const handleClick = vi.fn()
	const { getByRole } = render(<Button onClick={handleClick}>Click Me</Button>)
	const buttonElement = getByRole('button')

	fireEvent.click(buttonElement)
	expect(handleClick).toHaveBeenCalledTimes(1)
})
