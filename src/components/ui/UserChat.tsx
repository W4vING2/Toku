import { openChat } from '../../services/openChat'
import { useAuthStore } from '../../store/authStore'

interface Props {
	title: string
	index: number
}

export default function UserChat({ title, index }: Props) {
	const { setSelectedChat } = useAuthStore()
	const currentUser = localStorage.getItem('user')
	return (
		<p
			className='bg-white rounded-md p-2 w-[90%] h-[50px] items-center pl-5 mb-3 flex hover:bg-slate-400'
			key={index}
			onClick={() =>
				setSelectedChat(
					openChat({ from: currentUser ? currentUser : '', to: title })
				)
			}
		>
			{title}
		</p>
	)
}
