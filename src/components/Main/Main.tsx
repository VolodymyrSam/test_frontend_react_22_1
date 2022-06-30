
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { UserInfo } from '../Users/UserInfo';
import { UserDataProvider } from '../Users/UserData';
import { Filters } from './Filters';
import { ListOfUsers } from './ListOfUsers';
import { Dispatch, STORE } from '../../_redux/types';

const Main = (props: Props) => {

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
  const { users, user, openUserdata } = store.appData;

  return {
    users,
		user,
		openUserdata
  };
}

type Props = {
  dispatch?: Dispatch,
  user: any,
	openUserdata: boolean
};

const connectedMain: FunctionComponent = connect(mapStateToProps)(Main as FunctionComponent);
export { connectedMain as Main };
