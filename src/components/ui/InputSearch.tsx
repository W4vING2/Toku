import { useAuthStore } from '../../store/authStore'
import type { IInputSearchProps } from '../../types/components.types'

export default function InputSearch({ value, setValue }: IInputSearchProps) {
	const { setIsSearching } = useAuthStore()
	return (
		<input
			type='text'
			value={value}
			onChange={e => setValue(e.target.value)}
			id='input-search'
			name='searchinput'
			placeholder='Search'
			className='w-[80%] rounded-xl bg-slate-400 h-[40px] mt-3 mb-10 pl-5 focus:outline-0 text-white'
			onClick={() => {
				console.log('tap')
				setIsSearching(true)
			}}
		/>
	)
}
