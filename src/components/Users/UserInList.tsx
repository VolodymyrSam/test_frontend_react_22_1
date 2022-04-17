
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { Dispatch, STORE } from '../../_redux/types';

type Props = {
	user: any
};

type PropsFromRedux = {
	dispatch: Dispatch
};

const UserInList = ({ user, dispatch }: Props & PropsFromRedux) => {
	const {
		name,
		location,
		dob,
		email,
		picture
	} = user;
	const { first, last } = name;
	const { city, street } = location;

	function editUser() {
    dispatch({
      type: allConstants.SET_USER,
      payload: user
    });
	}
	return (
		<div className="userInList lightBorder">
			<img src={picture.medium} alt="" className="userImgShort" />
			<div className="userInfoShort">
				<div className="fontBig">{`${first} ${last}`}</div>
				<span className="grayFont">{dob.date}</span>
				<p className="address fontLittleSize">{`${city}, ${street.name} ${street.number}`}</p>
				<p className="email fontLittleSize">{email}</p>
			</div>
			<button className="btnMain btnMainShort" onClick={ _ => editUser()}>{"Edit"}</button>
		</div>
	);
};

function mapStateToProps(store: STORE) {
	const { users } = store.appData;

	return {
		users
	};
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedUserInList: FunctionComponent<Props> = connect(mapStateToProps, mapDispatchToProps)(UserInList as FunctionComponent);
export { connectedUserInList as UserInList };
