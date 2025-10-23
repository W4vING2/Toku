export interface User {
	name: string
	email: string
}

export interface IInitialState {
	isLogged: boolean
	authErrors: string
	isSearching: boolean
	users: User[] | null
	selectedChat: string | null
}

export interface IActions {
	setIsLogged: (isLogged: boolean) => void
	setAuthErrors: (authErrors: string) => void
	setIsSearching: (isSearching: boolean) => void
	setUsers: (users: User[] | null) => void
	setSelectedChat: (selectedChat: string) => void
}

export interface ICounterState extends IInitialState, IActions {}
