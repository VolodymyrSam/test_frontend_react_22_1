
import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';

import { Dispatch, STORE } from '../../_redux/types';
import { BtnList } from '../Common/BtnList';
import { selectCustomStylesFun } from '../Common/selecterStyle';

const maxLengthNewComplaint = 1300;

const complaintList = [
  { id: 'Headache', label: 'Головная боль', selected: true },
  { id: 'Cough', label: 'Кашель' },
];

const complaintProperties = [
  { value: 'localisation',
    label: 'Локализация',
    list: [
      { value: 'тeck', label: 'Шея' },
      { value: 'nape', label: 'затылок' }
    ]
  },
  { value: 'typePain',
    label: 'Характер боли',
    list: [
      { value: 'strong', label: 'Сильная' },
      { value: 'constant', label: 'Постоянная' }
    ]
  }
];

const AddComplaint = (props: Props) => {

	const [complaint, set_complaint] = useState<string>();
	const [complaints, set_complaints] = useState(complaintList);
	const [newComplaint, set_newComplaint] = useState("");
  const [selectProperty, set_selectProperty] = useState<any>();

  const AddComplaint = (opt: any) => {
    if (!complaints.find( el => el.id === opt.id)) {
      const newComplaints = [...complaints];
      newComplaints.push(opt);
      set_complaints(newComplaints);
    }
  };

  const selectComplaint = (id: string) => {
    set_complaint(id);
  };

  const remoteComplaint = (id: string) => {
    const newComplaints = complaints.filter( (el, i) => el.id != id);
    set_complaints(newComplaints);
  };

  const save = () => {
    const newComplaints = [...complaints];
    newComplaints.push( {id: complaints.length.toString(), label: newComplaint} );
    set_complaints(newComplaints);
  };

  const cansel = () => {
    set_newComplaint("");
  };

  return (
    <div className="mb-5">
      <div className="complaintListAndProperties row ">
        <div className="complaintList col">
          <Select
				  	menuPlacement="auto"
          	className="selectedComplaints mb-4"
            styles={selectCustomStylesFun({control: {border: "2px solid #CEC6FF;", height: "100%;"}, valueContainer: {paddingLeft: "15px"}})}
          	onChange={opt => AddComplaint(opt)}
            options={complaintList}
            placeholder={"Начните вводить жалобу"}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: (props) => {
                return <components.DropdownIndicator {...props}>
                  <div className="arrowDown"></div>
                </components.DropdownIndicator>;
              }
						}}
				  />
          <BtnList list={complaints} complaint={complaint} keyName={"id"} selectAct={selectComplaint} removeAct={remoteComplaint}/>
        </div>
        {complaint ? <div className="complaintProperties col mainBord mainBordRad mainPadd">
          <div className="row mb-4">
            <div className="col row ">
              <div className="complaintName col-auto mr-2"> {(complaintList.find( el => el.id === complaint) || {}).label} </div>
              <Select
				      	menuPlacement="auto"
              	className="col mr-3"
                styles={selectCustomStylesFun({control: {border: "2px solid #CEC6FF;", height: "30px", minHeight: "30px"}, valueContainer: {padding: "0 0 0 10px", fontSize: "12px;", color: "#000"}})}
              	value={complaintProperties.find( opt => opt.value === selectProperty)}
              	onChange={opt => set_selectProperty(opt)}
              	options={complaintProperties}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => {
                    return <components.DropdownIndicator {...props}>
                      <div className="arrowDownsmoll"></div>
                    </components.DropdownIndicator>;
                  }
                }}
				      />
            </div>
            <div className="col-auto">
              <button className={`quadrangleButtonLev2 mainBG mainBordRad mr-2 fa-solid fa-arrow-left`} onClick={ _ => {}}>
              </button>
              <button className={`quadrangleButtonLev2 mainBG mainBordRad fa-solid fa-floppy-disk`} onClick={ _ => {}}>
              </button>
            </div>
          </div>
          <div className="propertyValues">
            <BtnList list={selectProperty ? selectProperty.list : []} keyName={"value"}/>
          </div>
        </div> : null}
      </div>
      <div className="newComplaint row mt-4">
        <div className="col mr-4">
          <textarea
              className={'mainBord mainBordRad mainPadd newComlaintText w-100 h-100'}
              onChange={(e) => set_newComplaint(e.target.value)}
              maxLength={maxLengthNewComplaint}
              // onBlur={onFieldBlur ? onFieldBlur : () => { }}
              value={newComplaint}
              placeholder={'Введите жалобу, которой нет в списке'}
          />
          <span className={"placeholderColor lengthTextArea"}> {`${newComplaint.length}/${maxLengthNewComplaint}`} </span>
        </div>
        <div className="col-auto d-flex flex-column justify-content-between p-0">
          <button className={`mainBordRad mainBG mainBtn mb-2`} onClick={ _ => save()}>
            Сохранить
          </button>
          <button className={`mainBordRad mainBtn bcgWhite`} onClick={ _ => cansel()}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(store : STORE) {
  const { users } = store.appData;

  return {
    users
  };
}

type Props = {
  dispatch?: Dispatch
};

const connectedAddComplaint: FunctionComponent<Props> = connect(mapStateToProps)(AddComplaint as FunctionComponent);
export { connectedAddComplaint as AddComplaint };
