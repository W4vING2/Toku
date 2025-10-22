import { useCounterStore } from '../../store/authStore'

export default function InputSearch() {
	const { setIsSearching, isSearching } = useCounterStore()
	return (
		<input
			type='text'
			id='input-search'
			name='searchinput'
			placeholder='Search'
			className='w-[80%] rounded-xl bg-slate-400 h-[40px] mt-3 mb-10 pl-5 focus:outline-0 text-white'
			onClick={() => {
				console.log('tap')
				setIsSearching(!isSearching)
			}}
		/>
	)
}
