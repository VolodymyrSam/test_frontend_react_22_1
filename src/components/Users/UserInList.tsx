
import React, { useRef, useEffect, RefObject, FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { Dispatch, STORE } from '../../_redux/types';

type Props = {
	user: any,
	startDragging: (e, index) => void
};

type PropsFromRedux = {
	dispatch: Dispatch
};

const UserInList = ({ user, startDragging, dispatch }: Props & PropsFromRedux) => {
	const {
		name,
		location,
		dob,
		email,
		picture,
		index,
		itsDragging
	} = user;
	const { first, last } = name;
	const { city, street } = location;

	const el = useRef(null) as RefObject<HTMLDivElement>;

	useEffect( () => {
		if (!itsDragging && el) {
			el.current!.style.transform = 'none';
		}
	}, [itsDragging]);

	function editUser() {
    dispatch({
      type: allConstants.SET_USER,
      payload: user
    });
	}

	function gerDate(date) {
		const birthData = new Date(date);
		const data = birthData.getDate();
		const dataFull = data < 10 ? '0'+data : data;
		const monthLong = birthData.toLocaleString('en-us', {month:'long', year:'numeric'});
		const birthDateLong = `${dataFull} ${monthLong}`;
		return birthDateLong;
	}

	return (
		<div className={`userInList lightBorder ${itsDragging ? 'itsDragging' : ''}`}
			ref={el}
			data-key={index}
			onMouseDown={(e) => startDragging(e, index)}>
			<img src={picture.medium} alt="" className="userImgShort" />
			<div className="userInfoShort">
				<div className="fontBig">{`${first} ${last}`}</div>
				<span className="grayFont">{gerDate(dob.date)}</span>
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
