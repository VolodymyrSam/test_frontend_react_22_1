
import React, { useState, ChangeEvent } from 'react';

import { Opt } from '../../_redux/types';

type Props = {
  fieldData: Opt
}

const EditField = (props: Props) => {
  const {
    fieldData
  } = props;
  const ready_for_change = 'ready_for_change';
  const ready_for_save = 'ready_for_save';
  const edit = 'Edit';
  const update = 'Update';
  const undo = 'Undo';
  const [btnState, set_btnState] = useState(ready_for_change);
  const [inputValue, set_inputValue] = useState(fieldData.label);

  function changeVal(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (btnState === ready_for_save) set_inputValue(value);
  }

  function action() {
    if (btnState === ready_for_change) {
      set_btnState(ready_for_save);
    } else {
      if (inputValue !== fieldData.label) saveField(fieldData, inputValue);
      set_btnState(ready_for_change);
    }
  }

	function saveField(opt: Opt, newValue: string) {
		console.log(`save change\n
			create reverse map of fields\n
			in reducers create function set value by map`);
		// save change
		// create reverse map of fields
		// in reducers create function set value by map
	}

  return (
    <div className={' mainBorder editField row'}>
      <input type="text"
        disabled={btnState === ready_for_change}
        value={inputValue}
        onChange={changeVal}
      />
      {btnState === ready_for_save ?
				<button className="btnMain btnMainShort btnMainUndo" onClick={ _ => action()}>
      	  {undo}
				</button>
				: null
			}
      <button className="btnMain btnMainShort" onClick={ _ => action()}>
        {btnState === ready_for_change ? edit : update}
      </button>
    </div>
  );
};

export { EditField };