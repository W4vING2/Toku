import { Route, Routes } from 'react-router-dom'
import './index.css'
import Auth from './pages/Auth'
import Register from './pages/Register'
import Start from './pages/Start'

export default function App() {
	return (
		<>
			<Routes>
				<Route path='*' element={<Start />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</>
	)
}
