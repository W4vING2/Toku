import type { ITypographyProps } from '../../types/components.types'

export default function Typography({
	color,
	fontSize,
	fontWeight,
	text,
}: ITypographyProps) {
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
