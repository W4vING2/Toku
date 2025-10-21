import { NavLink } from 'react-router-dom'
import type { ILinkTProps } from '../../types/components.types'

export default function LinkT({ to, children }: ILinkTProps) {
	return (
		<>
			<NavLink to={to} className='text-blue-800'>
				{children}
			</NavLink>
		</>
	)
}
