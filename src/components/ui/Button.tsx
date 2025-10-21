interface ButtonProps {
	text: string
	onSubmit: () => void
}

export default function Button({ text, onSubmit }: ButtonProps) {
	return (
		<>
			<button
				onClick={onSubmit}
				type='button'
				className='bg-blue-300 w-45 h-15 p-4 rounded-md mt-5 text-slate-800 font-semibold hover:bg-blue-400 transition-colors duration-600 flex items-center justify-center'
			>
				{text}
			</button>
		</>
	)
}
