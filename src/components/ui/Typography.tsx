interface TypographyProps {
	fontSize: string
	fontWeight: string
	color: string
	text: string
}

export default function Typography({
	color,
	fontSize,
	fontWeight,
	text,
}: TypographyProps) {
	return (
		<p
			className='mb-5'
			style={{
				color: `${color}`,
				fontSize: `${fontSize}`,
				fontWeight: `${fontWeight}`,
			}}
		>
			{text}
		</p>
	)
}
