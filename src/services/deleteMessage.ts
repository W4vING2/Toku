import { supabase } from './supabase'

export async function deleteMessage(id: number) {
	const { data } = await supabase.from('messages').delete().eq('id', id)
	console.log(data)
}
