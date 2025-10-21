import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/ui/Button'
import LinkT from '../components/ui/LinkT'
import { supabase } from '../services/supabase'

interface FormData {
	email: string
	password: string
}

export default function Register() {
	const [isLogged, setIsLogged] = useState(false)
	const { handleSubmit, register } = useForm<FormData>()

	const onSubmit = async (dataI: FormData) => {
		const { error } = await supabase.auth.signInWithPassword({
			email: dataI.email,
			password: dataI.password,
		})
		if (error) {
			console.log(error)
		} else {
			setIsLogged(true)
		}
	}

	return (
		<>
			{isLogged ? (
				<div className='text-center'>
					<h1 className='mb-5'>Logged successfully</h1>
					<p>Forward to home page...</p>
				</div>
			) : (
				<div className='flex flex-col justify-center items-center h-screen gap-y-15 text-center'>
					<h1 className='md:text-6xl text-4xl font-bold'>Sign Up</h1>
					<form
						className='flex flex-col gap-y-5 text-center items-center'
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							className='focus:outline-0 rounded-md border border-blue-300 text-blue-300 pl-3 text-md px-2 py-1 md:w-[300px] w-[250px] focus:shadow-2xl transition-all duration-600 focus:border-blue-400  focus:placeholder:translate-y-[-50px] focus:placeholder:text-blue-300 focus:placeholder:translate-x-[1px] focus:placeholder:z-90 focus:placeholder:transition-all'
							placeholder='Enter email'
							type='email'
							{...register('email')}
						/>
						<input
							className='focus:outline-0 rounded-md border border-blue-300 text-blue-300 pl-3 text-md px-2 py-1 md:w-[300px] w-[250px] focus:shadow-2xl transition-all duration-600 focus:border-blue-400  focus:placeholder:translate-y-[-50px] focus:placeholder:text-blue-300 focus:placeholder:translate-x-[1px] focus:placeholder:z-90 focus:placeholder:transition-all'
							placeholder='Enter password'
							type='password'
							{...register('password')}
						/>

						<Button text='Sign up' onSubmit={handleSubmit(onSubmit)} />
					</form>
					<LinkT to='/register'>doesn't have an account?</LinkT>
				</div>
			)}
		</>
	)
}
