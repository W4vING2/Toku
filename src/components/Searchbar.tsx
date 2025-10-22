import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useCounterStore } from '../store/authStore'

interface UserFromDB {
	name: string
	email: string
}

export default function Searchbar() {
	const [isLoaded, setIsLoaded] = useState(false)
	const { users, setUsers, setIsSearching } = useCounterStore()

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
		<div className='bg-slate-700 p-4 w-[37%] rounded-md flex flex-col items-center gap-y-3 min-h-[100%] fixed z-[-1] pt-20 top-1'>
			<button
				className='text-white absolute top-3 right-5 font-bold text-2xl'
				onClick={() => setIsSearching(false)}
			>
				x
			</button>
			{users && users.length > 0
				? users.map(user => (
						<p className='text-white bg-blue-200 rounded-md p-2 w-[100%] text-center hover:bg-blue-500 transition-all duration-600'>
							{user.name}
						</p>
				  ))
				: 'Nothing to see'}
		</div>
	)
}
