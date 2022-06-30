
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { Dispatch, STORE } from '../../_redux/types';
import { QuadrangleButton } from '../Common/QuadrangleButton';
import { AddComplaint } from './AddComplaint';
import { ComplaintList } from './ComplaintList';

const Complaints = (props: Props) => {
  return (
    <div className="mainScreenComplaint">
      <div className="row justify-content-between align-items-center mb-5">
        <div className="row align-items-center">
          <img src="icon clients сomplaints.png" alt="" />
          <h1 className={"mainBoldFont px-4"}>Жалобы</h1>
        </div>
        <QuadrangleButton classes={""} action={() => { }} />
      </div>
      <AddComplaint />
      <ComplaintList />
    </div>
  );
};

function mapStateToProps(store: STORE) {
  const { users } = store.appData;

  return {
    users
  };
}

type Props = {
  dispatch?: Dispatch
};

const connectedComplaints: FunctionComponent<Props> = connect(mapStateToProps)(Complaints as FunctionComponent);
export { connectedComplaints as Complaints };
