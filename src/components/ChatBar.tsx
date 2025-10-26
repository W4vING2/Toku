import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useAuthStore } from '../store/authStore'
import Searchbar from './Searchbar'
import InputSearch from './ui/InputSearch'
import UserChat from './ui/UserChat'

export default function ChatBar() {
	const currentUser = localStorage.getItem('user')
	const [value, setValue] = useState('')
	const [chats, setChats] = useState<string[] | null>(null)
	const { isSearching } = useAuthStore()
	useEffect(() => {
		const selectChats = async () => {
			const { data } = await supabase
				.from('chats')
				.select('*')
				.or(`from.eq.${currentUser},to.eq.${currentUser}`)
			if (data === null) return
			const filteredChat = data.map(el => {
				return el.from !== currentUser ? el.from : el.to
			})
			const unoqueArray = [...new Set(filteredChat)]
			setChats(unoqueArray)
		}
		selectChats()
	}, [currentUser])
	return (
		<div className='fixed top-0 left-[80px] w-[550px] min-h-[100vh] bg-blue-400 flex flex-col items-center'>
			<InputSearch value={value} setValue={setValue} />
			{isSearching && <Searchbar value={value} />}
			{!chats || isSearching || chats === null
				? ''
				: chats.map((el, index) => {
						return <UserChat key={index} index={index} title={el} />
				  })}
		</div>
	)
}
