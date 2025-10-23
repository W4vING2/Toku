import type { UseFormRegisterReturn } from 'react-hook-form'

export interface IButtonProps {
	text: string
	onSubmit: () => void
}

export interface IInputProps {
	placeholder: string
	type?: 'text' | 'email' | 'password'
	error?: string
	registration: UseFormRegisterReturn
}

export interface ILinkTProps {
	to: string
	children: string
}

export interface ITypographyProps {
	fontSize: string
	fontWeight: string
	color: string
	text: string
}

export interface IInputSearchProps {
	value: string
	setValue: (value: string) => void
}

export interface IUserCardProps {
	email: string
	name: string
}
