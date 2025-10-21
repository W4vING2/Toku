import { NavLink } from 'react-router-dom'

interface ButtonProps {
	to: string
	children: string
}

export default function LinkT({ to, children }: ButtonProps) {
	return (
		<>
			<NavLink to={to} className='text-blue-800'>
				{children}
			</NavLink>
		</>
	)
}
