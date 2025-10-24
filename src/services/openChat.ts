import { supabase } from './supabase'

interface Props {
	from: string
	to: string
}

export const openChat = async ({ from, to }: Props) => {
	const { data, error } = await supabase
		.from('chats')
		.select('id')
		.eq('from', from)
		.eq('to', to)
	if (error) {
		console.log(error)
	}
	if (!data || data.length === 0) {
		const { error } = await supabase
			.from('chats')
			.insert({ from, to })
			.select()
			.eq('from', from)
			.eq('to', to)
		if (error) {
			console.log(error)
		}
		return {
			from: from,
			to: to,
		}
	} else {
		return {
			from: from,
			to: to,
		}
	}
}
