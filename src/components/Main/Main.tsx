
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { allActions } from '../../_redux/_actions';

import { UserInfo } from '../Users/UserInfo';
import { UserDataProvider } from '../Users/UserData';
import { Filters } from './Filters';
import { ListOfUsers } from './ListOfUsers';
import { Dispatch, STORE } from '../../_redux/types';

const Main = (props: Props) => {
	const { results, dispatch } = props;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
		const res: any = await dispatch(allActions.loadUsers(Number(results))) as any;
  }


  return props.user ?
		<UserInfo/>
		: props.openUserdata ?
			<UserDataProvider/>
			: (<div className="mainContant row">
        <Filters/>
        <ListOfUsers/>
      </div>);
};

function mapStateToProps(store : STORE) {
  const { request, users, user, openUserdata } = store.appData;

  return {
		results: request.results,
    users,
		user,
		openUserdata
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

type Props = {
	results: number,
  dispatch: Dispatch,
  user: any,
	openUserdata: boolean
};

const connectedMain: FunctionComponent = connect(mapStateToProps, mapDispatchToProps)(Main as FunctionComponent);
export { connectedMain as Main };
