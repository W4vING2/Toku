import { supabase } from './supabase'

interface User {
	email: string
	username: string | undefined
}

export const insertUsersName = async (dataI: User) => {
	const { data, error } = await supabase
		.from('usersname')
		.insert([
			{
				email: dataI.email,
				name: dataI.username,
			},
		])
		.select()
	if (error) throw error
	return data
}
