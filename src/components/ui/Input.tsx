import type { IInputProps } from '../../types/components.types'

export default function Input({
	placeholder,
	type = 'text',
	error,
	registration,
}: IInputProps) {
	return (
		<div className='flex flex-col'>
			<input
				type={type}
				placeholder={placeholder}
				className={`
          focus:outline-0 rounded-md border pl-3 text-md px-2 py-1 
          md:w-[300px] w-[250px] focus:shadow-2xl transition-all 
          duration-600 focus:placeholder:translate-y-[-50px] 
          focus:placeholder:translate-x-[1px] focus:placeholder:z-90 
          focus:placeholder:transition-all
          ${
						error
							? 'border-red-300 text-red-300 focus:border-red-400 focus:placeholder:text-red-300'
							: 'border-blue-300 text-blue-300 focus:border-blue-400 focus:placeholder:text-blue-300'
					}
        `}
				{...registration}
			/>
			{error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
		</div>
	)
}
