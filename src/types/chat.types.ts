export interface Chat {
	from: string
	to: string
}

export interface ChatData {
	message: string
}

export interface Message {
	id: number
	message: string
	created_at: string
}

export interface outChatData {
	data: Array<{
		message: string
		type: string
		id: number
		created_at: string
	}>
}
