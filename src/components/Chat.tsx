import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { deleteMessage } from '../services/deleteMessage'
import { selectMessages } from '../services/selectMessages'
import { sendMessage } from '../services/sendMessage'
import { supabase } from '../services/supabase'
import { useAuthStore } from '../store/authStore'
import type { Chat, ChatData, Message, outChatData } from '../types/chat.types'

export default function Chat() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [data, setData] = useState<outChatData | null>(null)
	const { selectedChat } = useAuthStore()
	const { register, handleSubmit, reset } = useForm<ChatData>()

	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const currentUserRef = useRef(localStorage.getItem('user') || '')

	useEffect(() => {
		currentUserRef.current = localStorage.getItem('user') || ''
	})

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [data])

	useEffect(() => {
		if (!selectedChat) return

		const showMessages = async () => {
			try {
				const chatData: Chat = await selectedChat

				let newFrom: Array<{
					message: string
					type: string
					id: number
					created_at: string
				}> = []
				let newTo: Array<{
					message: string
					type: string
					id: number
					created_at: string
				}> = []

				if (chatData && chatData.from && chatData.to) {
					const allMessageFromYou = await selectMessages({
						from: chatData.from,
						to: chatData.to,
					})
					const allMessageFromOther = await selectMessages({
						from: chatData.to,
						to: chatData.from,
					})

					if (allMessageFromYou?.data && allMessageFromOther?.data) {
						newFrom = allMessageFromYou.data.map((el: Message) => ({
							message: el.message,
							type: 'from',
							id: el.id,
							created_at: el.created_at,
						}))
						newTo = allMessageFromOther.data.map((el: Message) => ({
							message: el.message,
							id: el.id,
							type: 'to',
							created_at: el.created_at,
						}))

						const combinedMessages = [...newFrom, ...newTo]
						const sortedMessages = combinedMessages.sort(
							(a, b) =>
								new Date(a.created_at).getTime() -
								new Date(b.created_at).getTime()
						)

						setData({
							data: sortedMessages,
						})
					}
				}
			} catch (error) {
				console.error('Ошибка при загрузке сообщений:', error)
			}
		}

		const subscription = supabase
			.channel('messages')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'messages',
				},
				payload => {
					if (payload.eventType === 'INSERT') {
						setData(prev => {
							const currentUser = currentUserRef.current
							const newMessage = {
								message: payload.new.message,
								type: payload.new.from === currentUser ? 'from' : 'to',
								id: payload.new.id,
								created_at: payload.new.created_at,
							}

							const exists = prev?.data?.some(el => el.id === newMessage.id)
							if (exists) return prev

							return {
								data: [...(prev?.data || []), newMessage].sort(
									(a, b) =>
										new Date(a.created_at).getTime() -
										new Date(b.created_at).getTime()
								),
							}
						})
					} else if (payload.eventType === 'DELETE') {
						setData(prev => ({
							data: prev?.data?.filter(el => el.id !== payload.old.id) || [],
						}))
					}
				}
			)
			.subscribe()

		showMessages()

		return () => {
			subscription.unsubscribe()
		}
	}, [selectedChat])

	const handleDeleteMessage = async (id: number) => {
		try {
			await deleteMessage(id)
		} catch (error) {
			console.error('Ошибка при удалении сообщения:', error)
		}
	}

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
					reset({ message: '' })
				}
			} catch (error) {
				console.error('Ошибка при отправке сообщения:', error)
			}
		}

		setIsSubmitting(false)
	}

	return (
		<div className='fixed top-0 left-[630px] h-[100vh] w-[60vw] flex flex-col'>
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
										className='bg-blue-300 py-3 px-4 rounded-md my-2 flex justify-between items-center flex-wrap'
										style={{
											marginLeft: el.type === 'from' ? 'auto' : '0',
											marginRight: el.type === 'from' ? '50px' : 'auto',
											maxWidth: '50%',
										}}
									>
										{el.message}

										<span className='text-xs text-slate-400'>
											{new Date(el.created_at).toLocaleString()}
										</span>
										<button onClick={() => handleDeleteMessage(el.id)}>
											<img
												src='../../public/x.svg'
												alt='x'
												width='10'
												height='10'
											/>
										</button>
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
