
import React, { useState, ChangeEvent } from 'react';

type Props = {
  classes?: string,
  action: () => void
}

const QuadrangleButton = (props: Props) => {
  const {
    action,
    classes
  } = props;

  return (
    <button className={`quadrangleButton mainBordRad ${classes}`} onClick={ _ => action()}>
      <div className={"fa fa-plus fa-2x"}></div>
    </button>
  );
};

export { QuadrangleButton };