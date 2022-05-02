
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { Dispatch } from '../../_redux/types';

type PropsFromRedux = {
  dispatch: Dispatch
}

const UserData = ({dispatch}: PropsFromRedux) => {
	const { isLoading, error, data, isSuccess } = useQuery("user", () =>
		fetch(
			"https://randomuser.me/api/"
		).then((res) => res.json())
	);

	function renderUserFields(obj) {
		if (!obj) return null;
		const keys = Object.keys(obj);
		return (
			keys.map( key => {
				if (obj[key] && (typeof obj[key] === 'number' || typeof obj[key] === 'string')) {
					return (<div className={' mainBorder editField row'} key={key}>
						<input type="text"
							disabled={true}
							value={`${key}: ${obj[key]}`}
							className={'col'}
						/>
					</div>);
				}
				return renderUserFields(obj[key]);
			})
		);
	};

	function closeUserdata() {
    dispatch({
      type: allConstants.OPEN_CLOSE_USER_DATA
    });
	}

	return (
		<div className={'modal'}>
		<button className="btnMain" onClick={ _ => closeUserdata()}>{'< Back'}</button>
			{isSuccess &&
				renderUserFields(data.results[0])}
			{isLoading && <p>Loading..</p>}
			{error && <p>Error occurred!</p>}
		</div>
	);
};

const queryClient = new QueryClient();

const UserDataProvider = ({dispatch}) => {
	return (
    <QueryClientProvider client={queryClient}>
      <UserData dispatch={dispatch}/>
    </QueryClientProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};


const connectedUserDataProvider: FunctionComponent = connect(null, mapDispatchToProps)(UserDataProvider as FunctionComponent);
export { connectedUserDataProvider as UserDataProvider };
