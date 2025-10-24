import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { selectMessages } from '../services/selectMessages'
import { sendMessage } from '../services/sendMessage'
import { useAuthStore } from '../store/authStore'

interface Data {
	message: string
}

export interface Chat {
	from: string
	to: string
}

interface inData {
	message: string
}

interface outData {
	data: inData[]
}

export default function Chat() {
	const [data, setData] = useState<outData | null>(null)
	const { selectedChat } = useAuthStore()
	const { register, handleSubmit } = useForm<Data>()

	useEffect(() => {
		const showMessages = async () => {
			if (selectedChat !== null) {
				try {
					const chatData: Chat = await selectedChat

					if (chatData && chatData.from && chatData.to) {
						let allMessage = await selectMessages({
							from: chatData?.from,
							to: chatData?.to,
						})
						if (allMessage === null || !allMessage) {
							allMessage = await selectMessages({
								from: chatData?.to,
								to: chatData?.from,
							})
						}

						console.log(allMessage)
						setData({
							data: allMessage.data,
						})
						console.log('✅ Message bring successfully')
					}
				} catch (error) {
					console.error('🔴 Ошибка при отправке сообщения:', error)
				}
			}
		}
		try {
			showMessages()
		} catch (error) {
			console.error('🔴 Ошибка при отображении сообщений:', error)
		}
	}, [selectedChat])

	const onSubmit = async (data: Data) => {
		if (selectedChat !== null) {
			try {
				const chatData: Chat = await selectedChat

				if (chatData && chatData.from && chatData.to) {
					await sendMessage({
						from: chatData.from,
						to: chatData.to,
						message: data.message,
					})
					const allMessage = await selectMessages({
						from: chatData?.from,
						to: chatData?.to,
					})
					console.log(allMessage)
					setData({
						data: allMessage.data,
					})
					console.log('✅ Message sent successfully')
				}
			} catch (error) {
				console.error('🔴 Ошибка при отправке сообщения:', error)
			}
		}
	}

	return (
		<div className='fixed top-0 left-[630px] min-h-[100vh] w-[60vw] flex flex-col items-center justify-center'>
			{selectedChat ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='relative flex flex-col items-center text-center w-[100%]'
				>
					{data && data.data && Array.isArray(data.data) ? (
						data.data.map((el, index) => {
							return (
								<p key={index} className='bg-blue-300 p-2 rounded-md my-2'>
									{el.message}
								</p>
							)
						})
					) : (
						<h1 className='border border-slate-950 bg-slate-800 p-2 rounded-md text-white'>
							Enter the message
						</h1>
					)}
					<input
						{...register('message')}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								handleSubmit(onSubmit)
							}
						}}
						type='text'
						placeholder='Type message'
						className='bg-slate-500 fixed bottom-0 right-0 w-[820px] h-[50px] focus:outline-0 text-white pl-5'
					/>
					<button
						type='submit'
						className='fixed bottom-2 right-3 rounded-[50%] bg-blue-400 p-2 z-90 hover:bg-blue-500 transition-all duration-500'
					>
						<img
							src='../../public/search.svg'
							alt='search'
							width='20px'
							height='20px'
						/>
					</button>
				</form>
			) : (
				<p className='border border-slate-950 bg-slate-800 p-2 rounded-md text-white'>
					Select chat to continue
				</p>
			)}
		</div>
	)
}
