import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useAuthStore } from '../store/authStore'
import type { Props, UserFromDB } from '../types/searchBar.types'
import UserCard from './ui/UserCard'

export default function Searchbar({ value }: Props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const { users, setUsers, setIsSearching } = useAuthStore()

	const currentUser = localStorage.getItem('user')

	useEffect(() => {
		const getData = async () => {
			const { data, error } = await supabase.from('usersname').select('*')

			if (error) {
				console.log('Supabase error:', error)
			} else {
				setUsers((data as UserFromDB[]) || [])
			}
		}

		if (!isLoaded) {
			const timer = setTimeout(() => {
				getData()
				setIsLoaded(true)
			}, 1)
			return () => clearTimeout(timer)
		}
	}, [isLoaded, setUsers])

	return (
		<div className='bg-slate-700 p-4 w-[550px] flex flex-col items-center gap-y-3 min-h-[100%] fixed z-[-1] pt-20 top-0'>
			<button
				className='text-white absolute top-6 right-5 font-bold text-2xl'
				onClick={() => setIsSearching(false)}
			>
				<img src='../../public/x.svg' alt='x' width='15px' height='15px' />
			</button>
			{users && users.length > 0 && value.length > 0
				? users
						.filter(
							el =>
								el.name.toLowerCase().includes(value.toLowerCase()) &&
								el.name !== currentUser
						)
						.map(el => <UserCard key={el.email} {...el} />)
				: 'Enter the name of the user...'}
		</div>
	)
}
