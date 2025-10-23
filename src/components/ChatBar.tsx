import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import Searchbar from './Searchbar'
import InputSearch from './ui/InputSearch'

export default function ChatBar() {
	const [value, setValue] = useState('')
	const { isSearching, users } = useAuthStore()
	return (
		<div className='fixed top-0 left-[80px] w-[550px] min-h-[100vh] bg-blue-400 flex flex-col items-center'>
			<InputSearch value={value} setValue={setValue} />
			{isSearching && <Searchbar value={value} />}
			{!users ? <p>Here will be Chats...</p> : ''}
		</div>
	)
}
