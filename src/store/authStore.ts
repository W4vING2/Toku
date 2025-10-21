import { create, type StateCreator } from 'zustand'

interface IInitialState {
	isLogged: boolean
	authErrors: string
}

interface IActions {
	setIsLogged: (isLogged: boolean) => void
	setAuthErrors: (authErrors: string) => void
}

interface ICounterState extends IInitialState, IActions {}

const initialState: IInitialState = {
	isLogged: false,
	authErrors: '',
}

const counterStore: StateCreator<ICounterState> = set => ({
	...initialState,
	setIsLogged: isLogged => set({ isLogged }),
	setAuthErrors: authErrors => set({ authErrors }),
})

export const useCounterStore = create<ICounterState>()(counterStore)
