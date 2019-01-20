import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Err404 from './pages/err/err404'
import MyButton from './pages/ui/myButton'
import Modals from './pages/ui/modals'

export default class MyRouters extends React.Component {

    render() {
        return (
            <HashRouter>
                    <App>
                        <Route path="/login" component={Login}/>
                        <Route path="/admin" render={()=>
                            <Admin>
                                <switch>
                                    <Route path="/admin/ui/buttons" component={MyButton}/>
                                    <Route path="/admin/ui/modals" component={Modals}/>
                                    {/* <Route component={Err404}/> */}
                                </switch>
                            </Admin>
                        } />
                    </App>
        </HashRouter>
        )
    }
}