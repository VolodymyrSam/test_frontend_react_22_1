
import React, { useEffect, FunctionComponent } from 'react';

import { allActions } from './_redux/_actions';
import { Main } from './components/Main/Main';
import { UserInfo } from './components/Users/UserInfo';
import { connect } from 'react-redux';

import { Dispatch, STORE } from './_redux/types';

type PropsFromRedux = {
	results: number,
  user: any,
  dispatch: Dispatch
}

function App(props: PropsFromRedux) {
	const { results, user, dispatch } = props;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
		const res: any = await dispatch(allActions.loadUsers(Number(results))) as any;
  }

  return (
    <div className="mainScreen app">
			{ user ?
				<UserInfo/> :
        <Main/>
			}
    </div>
  );
}

function mapStateToProps(store : STORE) {
  const { request, user } = store.appData;

  return {
		results: request.results,
    user
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedApp: FunctionComponent<PropsFromRedux> = connect(mapStateToProps, mapDispatchToProps)(App as FunctionComponent);
export { connectedApp as App };
