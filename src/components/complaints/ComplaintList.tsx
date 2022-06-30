
import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { Dispatch, STORE } from '../../_redux/types';

const complaintList = [
  { id: '1',
    name: 'Равным образом, базовый вектор развития требует от нас анализа текст 14 ...',
    createDate: "05.03.2022",
    createTime: "13:10:12",
    updateDate: "05.03.2022",
    updateTime: "13:10:12",
    complaints: {
      "Headache": {
        "localisation": ["neck", "nape"],
        "typePain": ["strong", "constant"]
      },
      "Cough": {
        "localisation": ["neck", "nape"]
      }
    }
  },
  { id: '2',
    name: 'Равным образом, базовый вектор развития требует от нас анализа текст 14 ...',
    createDate: "05.03.2022",
    createTime: "13:10:12",
    complaints: {
      "Headache": {
        "localisation": ["neck", "nape"],
        "typePain": ["strong", "constant"]
      },
      "Cough": {
        "localisation": ["neck", "nape"]
      }
    }
  },
];

const ComplaintList = (props: Props) => {

  return (
    <div className="">
      <p className="mb-4"> История жалоб </p>
      {complaintList.map( (el, i) => {
        return (<div className={"row mb-4 pr-5"} key={i}>
          <div className="col-auto mr-4">
            <p className="smallText createdDate">
              {el.createDate}
              <span className="placeholderColor ml-2"> {el.createTime} </span>
            </p>
          </div>
          <div className="col mr-4">
            <p className="mainBordRad bcgGrey mainText px-2 py-1 triangleLeft">
              {el.name}
            </p>
          </div>
          <div className="col-auto d-flex flex-column">
            <button className={`quadrangleButtonLev3 mainBG mainBordRad mb-2 position-relative`} onClick={ _ => {}}>
              <div className={"fa-solid fa-pen fa-1x"}></div>
            </button>
              <button className={`quadrangleButtonLev3 mainBG mainBordRad position-relative`} onClick={ _ => {}}>
                <div className={"fa-solid fa-times fa-1x"}></div>
              </button>
          </div>
        </div>);
      })}
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

const connectedComplaintList: FunctionComponent<Props> = connect(mapStateToProps)(ComplaintList as FunctionComponent);
export { connectedComplaintList as ComplaintList };
