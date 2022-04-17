
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { allActions } from '../../_redux/_actions';
import { UserInList } from '../Users/UserInList';
import { Dispatch, STORE, Request } from '../../_redux/types';
import { selectCustomStylesFun } from '../Common/selecterStyle';

type PropsFromRedux = {
  users: any[],
  usersForRender: any[],
  request: Request,
  dispatch: Dispatch
}

const ListOfUsers = (props: PropsFromRedux) => {
	const { users, usersForRender, request, dispatch } = props;
	const { currentPage, results } = request;

	const resultsNum = Number(results);
	const preFirstElementIndex = resultsNum * (currentPage - 1);
	const lestElementIndex = resultsNum * currentPage;
	let userForView: any[] = []; // -1
	let countPages = 1;
	if (usersForRender.length) {
		userForView = usersForRender.slice(preFirstElementIndex, lestElementIndex); // -1
		const count = usersForRender.length / resultsNum;
		countPages = Math.ceil(count);
	}

	const countVariants = [
		{ value: '10', label: '10' },
		{ value: '50', label: '50' },
		{ value: '100', label: '100' },
		{ value: '500', label: 'all' }
	];

	const changeCountResults = (selectedOpt: any) => {
		const resultsNum = Number(selectedOpt.value);

		// for additional download no need to switch pages
		if (usersForRender.length && usersForRender.length < resultsNum) {
			loadNewUsers(resultsNum); // resultsNum - users.length
		}

		let countPages = 1;
		if (usersForRender.length) {
			const count = usersForRender.length / resultsNum;
			countPages = Math.ceil(count);
		}
		if (countPages < currentPage) {
			dispatch({
				type: allConstants.SET_CURRENT_PAGE,
				payload: countPages
			});
		}
	
    dispatch({
      type: allConstants.CHANGE_COUNT_RESULTS,
      payload: selectedOpt
    });
	};

	const setPage = (page: number) => {
    dispatch({
      type: allConstants.SET_CURRENT_PAGE,
      payload: page
    });
	};

	const buttons = () => {
		const btnOnSides = 3;
		const arrBtn: any[] = [];
		const renderPages: number[] = [];
		for (let i = 1; i <= countPages; i++ ) {
			if (i > currentPage - btnOnSides && i < currentPage + btnOnSides) {
				renderPages.push(i);
			}
		}
		for (let i = renderPages[0]; i <= renderPages[renderPages.length - 1]; i++ ) {
			arrBtn.push(
				<button className={`circleStyle circleBtnFont nextPage ${i === currentPage ? 'selected' : ''}`} onClick={ () => setPage(i) } key={i}>{i}</button>
			);
		}
		return arrBtn;
	};

	const loadNewUsers = async (count?: number) => {
		if (countPages === currentPage) {
			const res: any = await dispatch(allActions.loadUsers(count || resultsNum)) as any;
			dispatch({
				type: allConstants.SET_CURRENT_PAGE,
				payload: (count || usersForRender.length < resultsNum*currentPage) ? countPages : countPages + 1 // for additional download no need to switch pages or render count lees resultsNum
			});
		} else {
			dispatch({
				type: allConstants.SET_CURRENT_PAGE,
				payload: currentPage + 1
			});
		}
	};

  return (
    <div className="listOfUsers  col-sm-12 col-md-7">
      <b className='fontBig'>{'List of users'}</b>
      <div className="mainContainer">
      	<div className="usersList">
					{userForView.map( (user, index) => {
						return (<UserInList
							key={index}
							user={user}
						/>);
					})}
      	</div>
				<div className="loadPanel row ml-0 mr-0 placeholderFont">
					{buttons()}
					<button className={"circleStyle nextPage circleBtnFont"} onClick={ () => loadNewUsers() }>{"Next page >"}</button>
        	<Select
						menuPlacement="top"
        		styles={selectCustomStylesFun()}
        		className='countResults mainBorder'
        		value={countVariants.find( opt => opt.value === request.results)}
        		onChange={opt => changeCountResults(opt)}
						options={countVariants}
						components={{
							IndicatorSeparator: () => null
						}}
					/>
				</div>
      </div>
    </div>
  );
};

function mapStateToProps(store : STORE) {
  const { users, usersForRender, request } = store.appData;

  return {
		users,
		usersForRender,
		request
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedListOfUsers: FunctionComponent = connect(mapStateToProps, mapDispatchToProps)(ListOfUsers as FunctionComponent);
export { connectedListOfUsers as ListOfUsers };
