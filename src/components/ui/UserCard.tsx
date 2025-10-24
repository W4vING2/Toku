import { openChat } from '../../services/openChat'
import { useAuthStore } from '../../store/authStore'
import type { IUserCardProps } from '../../types/components.types'

export default function UserCard({ email, name }: IUserCardProps) {
	const currentUser = localStorage.getItem('user')
	const { setSelectedChat } = useAuthStore()
	return (
		<p
			className='text-white rounded-md bg-blue-400 p-2 w-[80%] text-center hover:bg-blue-500 transition-all duration-600'
			key={email}
			onClick={() =>
				setSelectedChat(
					openChat({ from: currentUser ? currentUser : '', to: name })
				)
			}
		>
			{name}
		</p>
	)
}
