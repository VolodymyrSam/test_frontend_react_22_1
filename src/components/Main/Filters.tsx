
import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { Dispatch, STORE, Gender } from '../../_redux/types';
import { selectCustomStylesFun } from '../Common/selecterStyle';
import { Range } from '../Common/Range';

type PropsFromRedux = {
	gender: Gender,
	sortBy: string,
  dispatch: Dispatch
}

const Filters = (props: PropsFromRedux) => {
	const { gender, sortBy, dispatch } = props;

	const sortOptions = [
		{ value: 'none', label: 'No' },
		{ value: 'name', label: 'Name' },
		{ value: 'nameRevers', label: 'Name in reverse' },
		{ value: 'dateOfBirth', label: 'Date of birth' },
		{ value: 'dateOfBirthRevers', label: 'Date of birth in reverse' },
		{ value: 'city', label: 'City' },
		{ value: 'cityRevers', label: 'City in reverse' },
		{ value: 'customSort', label: 'Custom sort' }
	];

	const btnClass = (select: any) => {
    return `inputStyle circleStyle circleBtnFont ${select ? 'selected' : ''}`;
	};

	const changeName = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
    dispatch({
      type: allConstants.CHANGE_FILTER_NAME,
      payload: value
    });
	};

  const toggleSex = (sex: string) => {
    dispatch({
      type: allConstants.CHANGE_FILTER_GENDERS,
      payload: sex
    });
  };
	
	const changeSortSelect = (selectedOpt: any) => {
    dispatch({
      type: allConstants.CHANGE_SORTING,
      payload: selectedOpt.value
    });
	};

	function openUserdata() {
    dispatch({
      type: allConstants.OPEN_CLOSE_USER_DATA
    });
	}

  return (
    <div className="filters col-sm-12 col-md-5">
      <b className='fontBig'>{'Filter2'}</b>
      <div className="mainContainer lightBorder placeholderFont">
        <span className={'grayFont'}>{'Name'}</span>
        <input
					className={'inputStyle mainBorder'}
					placeholder="Search by name"
					type="text"
					onChange={changeName}
				/>
        <span className={'grayFont'}>{'Age'}</span>
				<Range/>
        <span className={'grayFont'}>{'Gender'}</span>
				<div>
					<button className={btnClass(gender.male)} onClick={ () => toggleSex('male') }>{"Male"}</button>
					<button className={btnClass(gender.female)} onClick={ () => toggleSex('female') }>{"Female"}</button>
				</div>
        <span className={'grayFont'}>{'Sort By'}</span>
        <Select
					menuPlacement="auto"
        	styles={selectCustomStylesFun()}
        	className='sortSelecter inputStyle mainBorder'
        	value={sortOptions.find( opt => opt.value === sortBy)}
        	onChange={opt => changeSortSelect(opt)}
        	options={sortOptions}
				/>
				<button className="btnMain" onClick={ _ => openUserdata()}>{'Open random data'}</button>
      </div>
    </div>
  );
};

function mapStateToProps(store : STORE) {
  const { filter } = store.appData;
	const { gender, sortBy } = filter;

  return {
		filter,
		gender,
		sortBy
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedFilters: FunctionComponent = connect(mapStateToProps, mapDispatchToProps)(Filters as FunctionComponent);
export { connectedFilters as Filters };