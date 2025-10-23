import { create, type StateCreator } from 'zustand'
import type { ICounterState, IInitialState } from './auth.types'

const initialState: IInitialState = {
	isLogged: false,
	isSearching: false,
	authErrors: '',
	users: null,
	selectedChat: null,
}

const authStore: StateCreator<ICounterState> = set => ({
	...initialState,
	setIsLogged: isLogged => set({ isLogged }),
	setAuthErrors: authErrors => set({ authErrors }),
	setIsSearching: isSearching => set({ isSearching }),
	setUsers: users => set({ users }),
	setSelectedChat: selectedChat => set({ selectedChat }),
})

export const useAuthStore = create<ICounterState>()(authStore)
