
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { Filters } from './Filters';
import { ListOfUsers } from './ListOfUsers';
import { Dispatch, STORE } from '../../_redux/types';

type PropsFromRedux = {
  users: any
}

const Main = (props: PropsFromRedux) => {

  return (
    <div className="mainContant row">
      <Filters/>
      <ListOfUsers/>
    </div>
  );
};

function mapStateToProps(store : STORE) {
  const { users } = store.appData;

  return {
    users
  };
}

type Props = {
  dispatch?: Dispatch
};

const connectedMain: FunctionComponent<Props> = connect(mapStateToProps)(Main as FunctionComponent);
export { connectedMain as Main };
