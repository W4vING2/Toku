import InputSearch from './ui/InputSearch'

export default function ChatBar() {
	return (
		<div className='fixed top-0 left-[80px] w-[550px] min-h-[100vh] bg-blue-400 flex flex-col items-center'>
			<InputSearch />
			<p>Here will be Chats...</p>
		</div>
	)
}
