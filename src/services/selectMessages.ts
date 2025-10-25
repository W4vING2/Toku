import { supabase } from '../services/supabase'

interface Props {
	from: string
	to: string
}

export const selectMessages = async ({ from, to }: Props) => {
	const { data, error } = await supabase
		.from('messages')
		.select('message, created_at')
		.eq('from', from)
		.eq('to', to)
	if (error) {
		console.log(error)
	}
	console.log('data:', data)
	if (!data) {
		return null
	}
	return {
		data,
		error,
	}
}
