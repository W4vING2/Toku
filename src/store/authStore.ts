import { create, type StateCreator } from 'zustand'

interface User {
	name: string
	email: string
}

interface IInitialState {
	isLogged: boolean
	authErrors: string
	isSearching: boolean
	users: User[] | null
}

interface IActions {
	setIsLogged: (isLogged: boolean) => void
	setAuthErrors: (authErrors: string) => void
	setIsSearching: (isSearching: boolean) => void
	setUsers: (users: User[] | null) => void
}

interface ICounterState extends IInitialState, IActions {}

const initialState: IInitialState = {
	isLogged: false,
	isSearching: false,
	authErrors: '',
	users: null,
}

const counterStore: StateCreator<ICounterState> = set => ({
	...initialState,
	setIsLogged: isLogged => set({ isLogged }),
	setAuthErrors: authErrors => set({ authErrors }),
	setIsSearching: isSearching => set({ isSearching }),
	setUsers: users => set({ users }),
})

export const useCounterStore = create<ICounterState>()(counterStore)
