
import React, { useState, useEffect, useRef, FunctionComponent, RefObject } from 'react';
import { connect } from 'react-redux';

import { allConstants } from '../../_redux/_constants/all_constants.constants';
import { Dispatch, STORE, Filter } from '../../_redux/types';

type PropsFromRedux = {
	filter: Filter,
	rangeLimits: [number, number],
  dispatch: Dispatch
}

const Range = (props: PropsFromRedux) => {
	const { filter, rangeLimits, dispatch } = props;
	const { age } = filter;

	const [minAge, set_minAge] = useState(age[0]);
	const [maxAge, set_maxAge] = useState(age[1]);

	const [isDragging0, set_isDragging0] = useState(false);
	const [isDragging1, set_isDragging1] = useState(false);

	const slider = useRef(null) as RefObject<HTMLDivElement>;
	const track = useRef(null) as RefObject<HTMLDivElement>;
	const thumb0 = useRef(null) as RefObject<HTMLDivElement>;
	const thumb1 = useRef(null) as RefObject<HTMLDivElement>;

	const minRange = rangeLimits[0];
	const maxRange = rangeLimits[1];

	const sliderWidth = 288;
	const thumbRealWidth = 14;
	const trackHeight = 3;
	const range = maxRange - minRange;
	const rangeK = (sliderWidth) / range;

	function mousedown0(evt) {
		set_isDragging0(true);
	}
	function mousedown1(evt) {
		set_isDragging1(true);
	}
	function mouseup(evt) {
		set_isDragging0(false);
		set_isDragging1(false);
	}
	function mousemove(evt) {
		let mousePos = oMousePos(slider.current, evt);
		const theValue = Math.round((mousePos.x / rangeK) + minRange);
		if (isDragging0) {
			if (theValue < maxAge - (thumbRealWidth / 2) &&
			theValue >= minRange) {
				thumb0.current!.style.left = (theValue - minRange) * rangeK - (thumbRealWidth / 2) + "px";
				slider.current!.style.paddingLeft = (theValue - minRange) * rangeK + "px";
				set_minAge(theValue);
			}
		} else if (isDragging1) {
			if (theValue > minAge + (thumbRealWidth / 2) &&
				theValue <= maxRange) {
				thumb1.current!.style.left = (theValue - minRange) * rangeK - (thumbRealWidth / 2) + "px";
				slider.current!.style.paddingRight = (maxRange - theValue) * rangeK + "px";
				set_maxAge(theValue);
			}
		}
	}

	// helper
	function oMousePos(elmt: any, evt) {
		let ClientRect = elmt.getBoundingClientRect();
		return {
			x: Math.round(evt.clientX - ClientRect.left),
			y: Math.round(evt.clientY - ClientRect.top)
		}
	}

  useEffect(() => {
		// styles
		slider.current!.style.height = trackHeight + "px";
		slider.current!.style.width = sliderWidth + "px";

		thumb0.current!.style.width = thumb0.current!.style.height = thumbRealWidth + "px";
		thumb0.current!.style.top = (thumbRealWidth / 2 + trackHeight) + "px";

		thumb1.current!.style.width = thumb1.current!.style.height = thumbRealWidth + "px";
		thumb1.current!.style.top = (thumbRealWidth / 2 + trackHeight) + "px";

		thumb0.current!.style.left = (minAge - minRange) * rangeK - (thumbRealWidth / 2) + "px";
		thumb1.current!.style.left = (maxAge - minRange) * rangeK - (thumbRealWidth / 2) + "px";

		slider.current!.style.paddingLeft = minAge - minRange * rangeK + "px";
		slider.current!.style.paddingRight = sliderWidth - maxAge * rangeK + "px";
	}, []);

	useEffect( () => {
		if (!isDragging0) dispatch({
			type: allConstants.SET_MIN_AGE,
			payload: minAge
		});
	}, [isDragging0])

	useEffect( () => {
		if (!isDragging1) dispatch({
			type: allConstants.SET_MAX_AGE,
			payload: maxAge
		});
	}, [isDragging1])

  return (
		<div className="wrapperRangeAg"
			onMouseMove={mousemove}
			onMouseUp={mouseup}
			onMouseLeave={mouseup}>
			<div className="containerRangeAge">
				<div className="slider" ref={slider}>
					<div id="track" ref={track}></div>
				</div>
				<div className="thumb t0"
					ref={thumb0}
					onMouseDown={mousedown0}></div>
				<div className="thumb t1"
					ref={thumb1}
					onMouseDown={mousedown1}></div>
			</div>
			<div className="rangeAge">{`${minAge} - ${maxAge}`}</div>
		</div>
  );
};

function mapStateToProps(store : STORE) {
  const { filter, rangeLimits } = store.appData;

  return {
		filter,
		rangeLimits
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedRange: FunctionComponent = connect(mapStateToProps, mapDispatchToProps)(Range as FunctionComponent);
export { connectedRange as Range };