import { supabase } from './supabase'

interface Props {
	message: string
	from: string
	to: string
}

export const sendMessage = async ({ from, to, message }: Props) => {
	const { data, error } = await supabase
		.from('messages')
		.insert({ from, to, message })
		.select()
		.eq('from', from)
		.eq('to', to)
	if (error) {
		console.log(error)
	}
	return {
		data,
		error,
	}
}
