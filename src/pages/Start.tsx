import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Typography from '../components/ui/Typography'

export default function HelloPage() {
	const navigate = useNavigate()
	useEffect(() => {
		const isLogged = localStorage.getItem('user')
		if (isLogged) {
			setTimeout(() => {
				navigate('/home', { replace: true })
			}, 0)
		}
	}, [navigate])
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center'>
			<div className='bg-blue-300 p-6 rounded-md md:w-[1000px] md:h-[240px] mb-8 flex items-center justify-center w-[325px] h-[200px]'>
				<img src='/public/logo.svg' alt='logo' />
			</div>
			<Typography
				fontSize='45px'
				fontWeight='bold'
				color='#1E293B'
				text='Toku'
			/>
			<Typography
				fontSize='22px'
				fontWeight='normal'
				color='#1E293B'
				text='Welcome to the toku messenger. Free, fast and secure '
			/>
			<NavLink
				to='/auth'
				className='bg-blue-300 w-45 h-15 p-4 rounded-md mt-5 text-slate-800 font-semibold hover:bg-blue-400 transition-colors duration-600 flex items-center justify-center'
			>
				Start Chatting
			</NavLink>
		</div>
	)
}
