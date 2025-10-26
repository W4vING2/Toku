import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { selectMessages } from '../services/selectMessages'
import { sendMessage } from '../services/sendMessage'
import { useAuthStore } from '../store/authStore'
import type { Chat, ChatData, Message, outChatData } from '../types/chat.types'

export default function Chat() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [data, setData] = useState<outChatData | null>(null)
	const { selectedChat } = useAuthStore()
	const { register, handleSubmit, reset } = useForm<ChatData>()

	const messagesContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [data])

	useEffect(() => {
		const showMessages = async () => {
			if (selectedChat) {
				try {
					const chatData: Chat = await selectedChat

					let newFrom: Array<{
						message: string
						type: string
						created_at: string
					}> = []
					let newTo: Array<{
						message: string
						type: string
						created_at: string
					}> = []

					if (chatData && chatData.from && chatData.to) {
						const allMessageFromYou = await selectMessages({
							from: chatData?.from,
							to: chatData?.to,
						})
						const allMessageFromOther = await selectMessages({
							from: chatData?.to,
							to: chatData?.from,
						})
						if (allMessageFromYou && allMessageFromOther) {
							newFrom = allMessageFromYou.data.map((el: Message) => {
								return {
									message: el.message,
									type: 'from',
									created_at: el.created_at,
								}
							})
							newTo = allMessageFromOther.data.map((el: Message) => {
								return {
									message: el.message,
									type: 'to',
									created_at: el.created_at,
								}
							})
							console.log(newFrom, newTo)
						}
						let allMessage
						if (allMessageFromYou !== null && allMessageFromOther !== null) {
							const combinedMessages = [...newFrom, ...newTo]
							const sortedMessages = combinedMessages.sort(
								(a, b) =>
									new Date(a.created_at).getTime() -
									new Date(b.created_at).getTime()
							)

							allMessage = {
								data: sortedMessages,
							}
						}
						if (allMessage !== undefined) {
							setData({
								data: allMessage.data,
							})
						}
					}
				} catch (error) {
					console.error('🔴 Ошибка при загрузке сообщений:', error)
				}
			}
		}
		try {
			showMessages()
		} catch (error) {
			console.error('🔴 Ошибка при отображении сообщений:', error)
		}
	}, [selectedChat])

	const onSubmit = async (data: ChatData) => {
		if (isSubmitting) return
		setIsSubmitting(true)
		if (selectedChat !== null) {
			try {
				const chatData: Chat = await selectedChat

				if (chatData && chatData.from && chatData.to) {
					await sendMessage({
						from: chatData.from,
						to: chatData.to,
						message: data.message,
					})

					const allMessageFromYou = await selectMessages({
						from: chatData.from,
						to: chatData.to,
					})

					const allMessageFromOther = await selectMessages({
						from: chatData.to,
						to: chatData.from,
					})
					const newFrom =
						allMessageFromYou?.data?.map((el: Message) => ({
							message: el.message,
							type: 'from',
							created_at: el.created_at,
						})) || []

					const newTo =
						allMessageFromOther?.data?.map((el: Message) => ({
							message: el.message,
							type: 'to',
							created_at: el.created_at,
						})) || []

					const combinedMessages = [...newFrom, ...newTo]
					const sortedMessages = combinedMessages.sort(
						(a, b) =>
							new Date(a.created_at).getTime() -
							new Date(b.created_at).getTime()
					)

					const allMessage = {
						data: sortedMessages,
					}

					console.log('All messages after send:', allMessage)
					setData({
						data: allMessage.data,
					})
					reset({ message: '' })
				}
			} catch (error) {
				console.error('🔴 Ошибка при отправке сообщения:', error)
			}
		}
		setIsSubmitting(false)
	}

	return (
		<div className='fixed top-0 left-[630px] h-[100vh] w-[60vw] flex flex-col'>
			{' '}
			{selectedChat ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col h-full'
				>
					<div className='flex-1 overflow-auto p-4' ref={messagesContainerRef}>
						{data && data.data && Array.isArray(data.data) ? (
							data.data.map((el, index) => {
								return (
									<p
										key={index}
										className='bg-blue-300 py-3 px-4 rounded-md my-2'
										style={{
											marginLeft: el.type === 'from' ? 'auto' : '0',
											marginRight: el.type === 'from' ? '50px' : 'auto',
											maxWidth: '50%',
										}}
									>
										{el.message}
									</p>
								)
							})
						) : (
							<h1 className='border border-slate-950 bg-slate-800 p-2 rounded-md text-white text-center'>
								Enter the message
							</h1>
						)}
					</div>
					<div className='bg-slate-500 p-2 flex items-center relative'>
						<input
							{...register('message')}
							onKeyDown={e => {
								if (e.key === 'Enter' && !isSubmitting) {
									handleSubmit(onSubmit)()
								}
							}}
							id='message'
							type='text'
							placeholder='Type message'
							className='bg-slate-500 w-full h-[50px] focus:outline-0 text-white pl-5'
						/>
						<button
							type='submit'
							className='rounded-[50%] bg-blue-400 p-2 hover:bg-blue-500 transition-all duration-500 ml-2 absolute right-15 bottom-4 z-90'
						>
							<img
								src='../../public/search.svg'
								alt='search'
								width='20px'
								height='20px'
							/>
						</button>
					</div>
				</form>
			) : (
				<p className='border border-slate-950 bg-slate-800 p-2 rounded-md text-white m-auto'>
					Select chat to continue
				</p>
			)}
		</div>
	)
}
