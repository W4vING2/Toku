import { useAuthStore } from '../store/authStore'

export default function Chat() {
	const { selectedChat } = useAuthStore()
	return (
		<div className='fixed top-0 left-[630px] min-h-[100vh] w-[60vw] flex flex-col items-center justify-center'>
			{selectedChat ? (
				<div className='relative flex flex-col items-center text-center w-[100%]'>
					<h1 className='border border-slate-950 bg-slate-800 p-2 rounded-md text-white'>
						Chat with {selectedChat}
					</h1>
					<input
						type='text'
						placeholder='Type message'
						className='bg-slate-500 fixed bottom-0 right-0 w-[820px] h-[50px] focus:outline-0 text-white pl-5'
					/>
					<button className='fixed bottom-2 right-3 rounded-[50%] bg-blue-400 p-2'>
						<img
							src='../../public/search.svg'
							alt='search'
							width='20px'
							height='20px'
						/>
					</button>
				</div>
			) : (
				<p className='border border-slate-950 bg-slate-800 p-2 rounded-md text-white'>
					Select chat to continue
				</p>
			)}
		</div>
	)
}
