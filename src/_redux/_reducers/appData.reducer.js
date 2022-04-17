
import { allConstants } from '../_constants';

const initialState = {
	request: {
		results: '50',
		currentPage: 1
	},
	rangeLimits: [1, 100],
	users: [],
	usersForRender: [],
	user: null,
	filter: {
		name: '',
		age: [1, 50],
		gender: {
			male: true,
			female: false
		},
		sortBy: 'none'
	}
};

export function appData(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case allConstants.SET_DATA: {
			const updateUsers = [...state.users, ...payload];
			return {
				...state,
				usersForRender: filterUsers(updateUsers, state.filter),
				users: updateUsers
			};
		}
		case allConstants.SET_USER:
			return {
				...state,
				user: payload
			};
		case allConstants.CHANGE_FILTER_NAME: {
			const newFilter = {
				...state.filter,
				name: payload
			};
			const sorterUsers = filterUsers(state.users, newFilter, 'name');
			return {
				...state,
				usersForRender: sorterUsers,
				filter: newFilter
			};
		}
		case allConstants.SET_MIN_AGE: {
			const newFilter = {
				...state.filter,
				age: [payload, state.filter.age[1]]
			};
			const sorterUsers = filterUsers(state.users, newFilter, 'age');
			return {
				...state,
				usersForRender: sorterUsers,
				filter: newFilter
			};
		}
		case allConstants.SET_MAX_AGE: {
			const newFilter = {
				...state.filter,
				age: [state.filter.age[0], payload]
			};
			const sorterUsers = filterUsers(state.users, newFilter, 'age');
			return {
				...state,
				usersForRender: sorterUsers,
				filter: newFilter
			};
		}
		case allConstants.CHANGE_FILTER_GENDERS: {
			const newFilter = {
				...state.filter,
				gender: {
					...state.filter.gender,
					[payload]: !state.filter.gender[payload]
				}
			};
			const sorterUsers = filterUsers(state.users, newFilter, 'genders');
			return {
				...state,
				usersForRender: sorterUsers,
				filter: newFilter
			};
		}
		case allConstants.CHANGE_SORTING: {
			const newFilter = {
				...state.filter,
				sortBy: payload
			};
			const sorterUsers = sortUsers(state.usersForRender, newFilter);
			return {
				...state,
				usersForRender: sorterUsers,
				filter: newFilter
			};
		}
		case allConstants.CHANGE_COUNT_RESULTS:
			return {
				...state,
				request: {
					...state.request,
					results: payload.value
				}
			};
		case allConstants.SET_CURRENT_PAGE:
			return {
				...state,
				request: {
					...state.request,
					currentPage: payload
				}
			};
		default:
			return state;
	}
}

function filterUsers(users, filter, type) {
	const { name, gender, age } = filter;
	const name_lc = name.toLowerCase();
	let usersForRender = [];
	if (type === 'name') {
		usersForRender = users.filter( user => {
			if (name_lc) {
				if ( user.name.first.toLowerCase().includes(name_lc) ||
					user.name.last.toLowerCase().includes(name_lc)) return true;
			} else return true;
			return false;
		});
	} else if (type === 'age') {
		usersForRender = users.filter( user => {
			if (age[0] < user.dob.age && user.dob.age < age[1]) return true;
			return false;
		});
	} else if (type === 'genders') {
		usersForRender = users.filter( user => {
			if (!gender.male && user.gender === 'male') return false;
			if (!gender.female && user.gender === 'female') return false;
			return true;
		});
	} else {
		usersForRender = users.filter( user => {
			let name_ok;
			let age_ok;
			if (name_lc) {
				if ( user.name.first.toLowerCase().includes(name_lc) ||
					user.name.last.toLowerCase().includes(name_lc)) name_ok = true;
			} else name_ok = true;
	
			if (age[0] < user.dob.age && user.dob.age < age[1]) age_ok = true;
	
			if (!gender.male && user.gender === 'male') return false;
			if (!gender.female && user.gender === 'female') return false;
	
			if (name_ok && age_ok) return true;
			return false;
		});
	}
	return type ? usersForRender : sortUsers(usersForRender, filter);
}

function sortUsers(users, filter) {
	const sortingUsers = [...users];
	if (filter.sortBy === 'name') {
		sortingUsers.sort( ( a, b ) => {
			if ( a.name.first < b.name.first ) return -1;
			if ( a.name.first > b.name.first ) return 1;
			if ( a.name.last < b.name.last ) return -1;
			if ( a.name.last > b.name.last ) return 1;
			return 0;
		});
	} else if (filter.sortBy === 'dateOfBirth') {
		sortingUsers.sort( ( a, b ) => {
			if ( a.dob.date < b.dob.date ) return -1;
			if ( a.dob.date > b.dob.date ) return 1;
			return 0;
		});
	} else if (filter.sortBy === 'city') {
		sortingUsers.sort( ( a, b ) => {
			if ( a.location.city < b.location.city ) return -1;
			if ( a.location.city > b.location.city ) return 1;
			return 0;
		});
	}
	return sortingUsers;
}