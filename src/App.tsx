
import React, { useEffect, FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';

import { Dispatch, STORE } from './_redux/types';
import { allActions } from './_redux/_actions';
import { Main } from './components/Main/Main';
import { Complaints } from './components/complaints/Complaints';


type PropsFromRedux = {
	results: number,
  dispatch: Dispatch
}
const Router = ({ children }) => {
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) return <HashRouter>{children}</HashRouter>;

    return <BrowserRouter>{children}</BrowserRouter>;
};

function App(props: PropsFromRedux) {
	const { results, dispatch } = props;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
		const res: any = await dispatch(allActions.loadUsers(Number(results))) as any;
  }

  return (
    <div className="mainScreen app">
      <Router>
        <Fragment>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/complaints' element={<Complaints/>} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

function mapStateToProps(store : STORE) {
  const { request, user, openUserdata } = store.appData;

  return {
		results: request.results
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const connectedApp: FunctionComponent<PropsFromRedux> = connect(mapStateToProps, mapDispatchToProps)(App as FunctionComponent);
export { connectedApp as App };
