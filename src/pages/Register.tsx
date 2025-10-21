import { useForm } from 'react-hook-form'
import SuccessPage from '../components/SuccessPage'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import LinkT from '../components/ui/LinkT'
import { supabase } from '../services/supabase'
import { useCounterStore } from '../store/authStore'
import type { FormData } from '../types/form.types'

export default function Register() {
	const { isLogged, setIsLogged, setAuthErrors } = useCounterStore()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		mode: 'onChange',
	})

	const onSubmit = async (dataI: FormData) => {
		setAuthErrors('')
		const { error } = await supabase.auth.signUp({
			email: dataI.email,
			password: dataI.password,
		})
		if (error) {
			setAuthErrors(error.message)
		} else {
			setIsLogged(true)
		}
	}

	return (
		<>
			{isLogged ? (
				<SuccessPage />
			) : (
				<div className='flex flex-col justify-center items-center h-screen gap-y-15 text-center'>
					<h1 className='md:text-6xl text-4xl font-bold'>Register</h1>
					<form
						className='flex flex-col gap-y-5 text-center items-center'
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							placeholder='Enter email'
							type='email'
							registration={register('email', {
								required: 'Email is required',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Invalid email format',
								},
							})}
							error={errors.email?.message}
						/>
						<Input
							placeholder='Enter password'
							type='password'
							registration={register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters',
								},
							})}
							error={errors.password?.message}
						/>

						<Button text='Login' onSubmit={handleSubmit(onSubmit)} />
					</form>
					<LinkT to='/auth'>already have an account?</LinkT>
				</div>
			)}
		</>
	)
}
