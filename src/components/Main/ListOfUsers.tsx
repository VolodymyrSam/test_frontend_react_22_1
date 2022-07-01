
import React, { useState, useRef, FunctionComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { allActions } from '../../_redux/_actions';
import { UserInList } from '../Users/UserInList';
import { Dispatch, STORE, Request } from '../../_redux/types';
import { selectCustomStylesFun } from '../Common/selecterStyle';

type PropsFromRedux = {
  usersForRender: any[],
  request: Request,
  sortBy: string,
  dispatch: Dispatch
}

const ListOfUsers = (props: PropsFromRedux) => {
	const { usersForRender, request, sortBy, dispatch } = props;
	const { currentPage, results } = request;

	const [draggingIndex, set_draggingIndex] = useState(-1);
	const [startPageY, set_startPageY] = useState(0);

	const container = useRef(null) as RefObject<HTMLDivElement>;

	const resultsNum = Number(results);
	const preFirstElementIndex = resultsNum * (currentPage - 1);
	const lestElementIndex = resultsNum * currentPage;
	let userForView: any[] = []; // -1
	let countPages = 1;

	const dragAndDrop = sortBy === 'customSort';
	const elHeight = 143;

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

	const startDragging = (e, index) => {
		if (dragAndDrop) {
			set_draggingIndex(index);
			const contRect = container.current!.getBoundingClientRect();
			const scrollTop = container.current!.scrollTop;
			set_startPageY(e.pageY + scrollTop - contRect.top);
		}
	};


	const onMouseMove = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (dragAndDrop && draggingIndex !== -1) {
			const contRect = container.current!.getBoundingClientRect();
			const scrollTop = container.current!.scrollTop;
			const currentPos = e.pageY + scrollTop - contRect.top;
			let offset = currentPos - startPageY;
			const topBorder = contRect.top + 50;
			const bottomBorder = contRect.bottom - 50;
			if (e.pageY < topBorder) container.current!.scrollBy(0, -10);
			if (e.pageY > bottomBorder) container.current!.scrollBy(0, 10);
			if (offset > 0 && offset > elHeight && draggingIndex < usersForRender.length) {
				// Движение вниз
				offset -= startPageY;
				const newIndex = draggingIndex + 1;
				set_draggingIndex(newIndex);
				set_startPageY(currentPos);
				dispatch({
					type: allConstants.CHANGE_MANUAL_MOVE,
					payload: {startIndex: draggingIndex, toIndex: newIndex}
				});
			} else if (offset < 0 && offset < -elHeight && draggingIndex > 0) {
				// Двигаться вверх
				offset += startPageY;
				const newIndex = draggingIndex - 1;
				set_draggingIndex(newIndex);
				set_startPageY(currentPos);
				dispatch({
					type: allConstants.CHANGE_MANUAL_MOVE,
					payload: {startIndex: draggingIndex, toIndex: newIndex}
				});
			};
			const el = document.querySelector(`[data-key='${draggingIndex}']`) as HTMLDivElement;
			if (el) el.style.transform = 'translate(0px, ' + offset + 'px)';
		};
	};

	const onMouseUp = (e) => {
		set_draggingIndex(-1);
		set_startPageY(0);
	};

  return (
    <div className={`listOfUsers  col-sm-12 col-md-7 pb-5 ${dragAndDrop ? 'dragAndDrop' : ''}`}>
      <b className='fontBig'>{'List of users'}</b>
      <div className="mainContainer">
      	<div className="usersList"
					onMouseUp={onMouseUp}
					onMouseMove={e => onMouseMove(e)}
					ref={container}>
					{userForView.map( (user, index) => {
						return (<UserInList
							key={index}
							user={ (draggingIndex === index) ?
								{...user, index, itsDragging: true}
								: {...user, index} }
							startDragging={startDragging}
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
  const { usersForRender, request, filter } = store.appData;

  return {
		usersForRender,
		request,
		sortBy: filter.sortBy
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedListOfUsers: FunctionComponent = connect(mapStateToProps, mapDispatchToProps)(ListOfUsers as FunctionComponent);
export { connectedListOfUsers as ListOfUsers };
