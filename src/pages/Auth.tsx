import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import LinkT from '../components/ui/LinkT'
import { supabase } from '../services/supabase'
import { useAuthStore } from '../store/authStore'
import type { FormData } from '../types/form.types'
import Home from './Home'

export default function Register() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>()
	const { isLogged, setIsLogged, setAuthErrors, authErrors } = useAuthStore()

	const navigate = useNavigate()
	useEffect(() => {
		const isLogged = localStorage.getItem('user')
		if (isLogged) {
			setTimeout(() => {
				navigate('/home', { replace: true })
			}, 0)
		}
	}, [navigate])

	const onSubmit = async (dataI: FormData) => {
		setAuthErrors('')
		const { error } = await supabase.auth.signInWithPassword({
			email: dataI.email,
			password: dataI.password,
		})
		if (error) {
			setAuthErrors(error.message)
		} else {
			setIsLogged(true)
		}
		localStorage.setItem('user', JSON.stringify(dataI.username))
	}

	return (
		<>
			{isLogged ? (
				<Home />
			) : (
				<div className='flex flex-col justify-center items-center h-screen gap-y-15 text-center'>
					<h1 className='md:text-6xl text-4xl font-bold'>Sign Up</h1>
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
						{authErrors && <p className='text-red-500'>{authErrors}</p>}
						<Button text='Sign up' onSubmit={handleSubmit(onSubmit)} />
					</form>
					<LinkT to='/register'>doesn't have an account?</LinkT>
				</div>
			)}
		</>
	)
}
