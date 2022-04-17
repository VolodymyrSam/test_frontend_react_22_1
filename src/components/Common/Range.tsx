
import React, { useEffect, FunctionComponent } from 'react';
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

	const minRange = rangeLimits[0];
	const maxRange = rangeLimits[1];

	let inputsRa = {
		sliderWidth: 293,
		minRange: minRange,
		maxRange: maxRange,
		thumbWidth: 18,
		trackHeight: 3,
		theValue: [age[0], age[1]]
	};
	let isDragging0 = false;
	let isDragging1 = false;
	let range = inputsRa.maxRange - inputsRa.minRange;
	let rangeK = inputsRa.sliderWidth / range;

  useEffect(() => {
		let container: HTMLElement = document.querySelector(".containerRangeAg") as HTMLElement;
		let thumbRealWidth = inputsRa.thumbWidth;
		// styles
		let slider: HTMLElement = document.querySelector(".slider") as HTMLElement;
		slider.style.height = inputsRa.trackHeight + "px";
		slider.style.width = inputsRa.sliderWidth + "px";
		slider.style.paddingLeft = (inputsRa.theValue[0] - inputsRa.minRange) * rangeK + "px";
		slider.style.paddingRight = inputsRa.sliderWidth - inputsRa.theValue[1] * rangeK + "px";
		let track: HTMLElement = document.querySelector(".track") as HTMLElement;
		track.style.width = inputsRa.theValue[1] * rangeK - inputsRa.theValue[0] * rangeK + "px";
		let thumbs: NodeListOf<HTMLElement> = document.querySelectorAll(".thumb") as NodeListOf<HTMLElement>;
		for (let i = 0; i < thumbs.length; i++) {
			thumbs[i].style.width = thumbs[i].style.height = inputsRa.thumbWidth + "px";
			thumbs[i].style.top = -(inputsRa.thumbWidth / 2 - inputsRa.trackHeight / 2) + "px";
			thumbs[i].style.left = (inputsRa.theValue[i] - inputsRa.minRange) * rangeK - (thumbRealWidth / 2) + "px";
		}
		//events
		thumbs[0].addEventListener("mousedown", function(evt) {
			isDragging0 = true;
		}, false);
		thumbs[1].addEventListener("mousedown", function(evt) {
			isDragging1 = true;
		}, false);
		container.addEventListener("mouseup", function(evt) {
			isDragging0 = false;
			isDragging1 = false;
		}, false);
		container.addEventListener("mouseout", function(evt) {
			isDragging0 = false;
			isDragging1 = false;
		}, false);
		container.addEventListener("mousemove", function(evt) {
			let mousePos = oMousePos(this, evt);
			let theValue0 = (isDragging0) ? Math.round(mousePos.x / rangeK) + inputsRa.minRange : inputsRa.theValue[0];
			// console.log(theValue0);
			let theValue1 = (isDragging1) ? Math.round(mousePos.x / rangeK) + inputsRa.minRange : inputsRa.theValue[1];
			if (isDragging0) {
				if (theValue0 < theValue1 - (thumbRealWidth / 2) &&
					theValue0 >= inputsRa.minRange) {
					inputsRa.theValue[0] = theValue0;
					dispatch({
						type: allConstants.SET_MIN_AGE,
						payload: theValue0
					});
				
					thumbs[0].style.left = (theValue0 - inputsRa.minRange) * rangeK - (thumbRealWidth / 2) + "px";
					slider.style.paddingLeft = (theValue0 - inputsRa.minRange) * rangeK + "px";
					track.style.width = (theValue1 - theValue0) * rangeK + "px";
				}
			} else if (isDragging1) {
				if (theValue1 > theValue0 + (thumbRealWidth / 2) &&
					theValue1 <= inputsRa.maxRange) {
					inputsRa.theValue[1] = theValue1;
					dispatch({
						type: allConstants.SET_MAX_AGE,
						payload: theValue1
					});
				
					thumbs[1].style.left = (theValue1 - inputsRa.minRange) * rangeK - (thumbRealWidth / 2) + "px";
					slider.style.paddingRight = (inputsRa.maxRange - theValue1) * rangeK + "px";
					track.style.width = (theValue1 - theValue0) * rangeK + "px";
				}
			}
		}, false);
  }, []);

	// helper
	function oMousePos(elmt, evt) {
		let ClientRect = elmt.getBoundingClientRect();
		return {
			x: Math.round(evt.clientX - ClientRect.left),
			y: Math.round(evt.clientY - ClientRect.top)
		}
	}

  return (
		<div className="wrapperRangeAg">
			<div className="containerRangeAg">
				<div className="slider">
					<div className="track"></div>
				</div>
				<div className="thumb t0"></div>
				<div className="thumb t1"></div>
			</div>
			<div className="rangeAge">{`${age[0]} - ${age[1]}`}</div>
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