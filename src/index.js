import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './_less/index.less';
import './_less/complaints.less';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';

import { store } from './_redux/Store.js';
import { Main } from './components/Main/Main';
import { Complaints } from './components/complaints/Complaints';

const Router = ({ children }) => {
  const isProduction = process.env.NODE_ENV === 'production';

  return <HashRouter>{children}</HashRouter>;
  // if (isProduction) return <HashRouter>{children}</HashRouter>;

  // return <BrowserRouter>{children}</BrowserRouter>;
};

ReactDOM.render(
  <Provider store={store} >
    <div className="mainScreen app">
      <Router>
        <Fragment>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/test_frontend_react_22_1/complaints' element={<Complaints/>} />
          </Routes>
        </Fragment>
      </Router>
    </div>
    {/* <React.StrictMode> */}
      {/* <HashRouter>
        <App />
      </HashRouter> */}
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
