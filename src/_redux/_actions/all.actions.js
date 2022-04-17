
import axios from 'axios';

import { allConstants } from '../_constants';

export const allActions = {
	loadUsers
};


function loadUsers(countUsers) {
	const url = `https://randomuser.me/api/?results=${countUsers}`;
	const fullRequestBody = {};
	const cancelToken = null;

	return async dispatch => {
		return axios.get(url).then( (res) => { // , fullRequestBody, cancelToken
			if (res.status !== 200) {
				console.log('error: ', res);
			} else {
				console.log('users: ', res);
				dispatch({
					type: allConstants.SET_DATA,
					payload: res.data.results
				});
			}
			return res;
		}).catch((e) => {
			if (axios.isCancel(e)) {
				console.log('Request canceled', e);
			}
			console.log('Request error', e);
		});
	};
};