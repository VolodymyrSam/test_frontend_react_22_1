
export type Dispatch = (requestBody: any) => Promise<any>;


export type Opt = {
	value: string,
  label: string
}
export type STORE = {
	appData: {
		request: Request,
		rangeLimits: [number, number],
		users: any[],
		usersForRender: any[],
		user: any,
		filter: Filter,
		openUserdata: boolean
	}
}

export type Filter = {
	name: string,
	age: [number, number],
	gender: Gender,
	sortBy: string
}

export type Gender = {
	male: boolean,
	female: boolean
}

export type Request = {
	results: string,
	currentPage: number
}
