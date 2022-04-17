
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { EditField } from '../Common/EditField';
import { Dispatch, STORE, Opt } from '../../_redux/types';

type PropsFromRedux = {
	user: any
  dispatch: Dispatch
}

const UserInfo = ({ user, dispatch }: PropsFromRedux) => {
	const {
		name,
		location,
		email,
		dob,
		phone,
		picture
	} = user && user.name ? user
		: {
			name: {
				first: '',
				last: ''
			},
			location: {
				city: '',
				street: {
					name: '',
					number: ''
				}
			},
			email: '',
			dob: {
				date: ''
			},
			phone: '',
			picture: {
				large: ''
			}
		};
	const { first, last } = name;
	const fullName = `${first} ${last}`;
	const fullStreet = `${location.street.name} ${location.street.number}`;
	const birthData = new Date(dob.date);
	const data = birthData.getDate();
	const dataFull = data < 10 ? '0'+data : data;
	const month = birthData.getMonth()+1;
	const monthFull = month < 10 ? '0'+month : month;
	const monthLong = birthData.toLocaleString('en-us', {month:'long', year:'numeric'});
	const birthDate = `${dataFull}.${monthFull}.${birthData.getFullYear()}`;
	const birthDateLong = `${dataFull} ${monthLong}`;
	const editedFields: Opt[] = [
		{ value: 'fullName', label: fullName },
		{ value: 'email', label: email },
		{ value: 'phoneNumber', label: phone },
		{ value: 'city', label: location.city },
		{ value: 'fullStreet', label: fullStreet },
		{ value: 'dobDate', label: birthDate }
	];

	function backToList() {
		// save change
    dispatch({
      type: allConstants.SET_USER,
      payload: null
    });
	}

  return (
		<div className="userInfo">
			<div className="fullWidth">
				<button className="btnMain" onClick={ _ => backToList()}>{'< Back'}</button>
			</div>
			<div className="user row">
				<div className="mainUserData">
					<img className="mainUserImg" src={picture.large} alt=""/>
					<h1>{fullName}</h1>
					<span className="grayFont">{birthDateLong}</span>
					<button className="btnMain">{'Delete'}</button>
				</div>
				<div className="userContacts">
					{
						editedFields.map( (fieldData, i) =>
							(<EditField
								key={i}
								fieldData={fieldData}
							/>)
						)
					}
				</div>
			</div>
		</div>
  );
};

function mapStateToProps(store : STORE) {
  const { user } = store.appData;

  return {
		user
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedUserInfo: FunctionComponent = connect(mapStateToProps, mapDispatchToProps)(UserInfo as FunctionComponent);
export { connectedUserInfo as UserInfo };
