export default function SideBar() {
	return (
		<div className='w-[80px] min-h-[100vh] bg-blue-900 flex flex-col justify-start items-center fixed top-0 left-0'>
			<div className='w-[50px] h-[50px] mt-5 flex flex-col gap-y-1 items-center'>
				<input type='checkbox' className='opacity-0 hidden' />
				<span className='block bg-white w-[50%] h-[3px] rounded-md'></span>
				<span className='bg-white w-[50%] h-[3px] rounded-md'> </span>
				<span className='bg-white w-[50%] h-[3px] rounded-md'></span>
			</div>
		</div>
	)
}
