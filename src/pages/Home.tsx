import Chat from '../components/Chat'
import ChatBar from '../components/ChatBar'
import SideBar from '../components/SideBar'

export default function Home() {
	return (
		<main className='flex justify-start'>
			<SideBar />
			<ChatBar />
			<Chat />
		</main>
	)
}
