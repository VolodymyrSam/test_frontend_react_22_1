
import React, { useState, ChangeEvent } from 'react';

type Props = {
  list: any[],
  keyName: string,
  complaint?: string,
  selectAct?: (el) => void,
  removeAct?: (el) => void,
}

const BtnList = (props: Props) => {
  const {
    list,
    keyName,
    selectAct,
    removeAct,
    complaint
  } = props;

  return (
    <div className={' btnList row'}>
      {list && list.map( (el, i) => {
        const selected = el.id === complaint;
        return (<button key={i} className={`col-auto mainBordRad px-2 mr-2 ${selected ? "mainBG" : "mainBord bcgWhite bcgVioletHover"}`} onClick={ ev => selectAct && selectAct(el[keyName])}>
          {el.label}
          {selected ? <i className={`ml-2 fa-solid fa-times ${selected ? "mainBG" : ""}`} onClick={ ev => removeAct && removeAct(el[keyName])}>
          </i> : null}
        </button>);
      })}
    </div>
  );
};

export { BtnList };