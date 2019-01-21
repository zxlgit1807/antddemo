import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Err404 from './pages/err/err404'
import MyButton from './pages/ui/myButton'
import Modals from './pages/ui/modals'
import MyNotice from './pages/ui/notice'
import MyLoading from './pages/ui/loading'
import MyMessages from './pages/ui/messages'
import MyTabs from './pages/ui/tabs'
import MyGallerys from './pages/ui/gallery'
import MyCarousels from './pages/ui/carousels'
import MyLogin from './pages/form/login'

export default class MyRouters extends React.Component {

    render() {
        return (
            <HashRouter>
                    <App>
                        <Route path="/login" component={Login}/>
                        <Route path="/admin" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/ui/buttons" component={MyButton}/>
                                    <Route path="/admin/ui/modals" component={Modals}/>
                                    <Route path="/admin/ui/loadings" component={MyLoading}/>
                                    <Route path="/admin/ui/notification" component={MyNotice}/>
                                    <Route path="/admin/ui/messages" component={MyMessages}/>
                                    <Route path="/admin/ui/tabs" component={MyTabs}/>
                                    <Route path="/admin/ui/gallery" component={MyGallerys}/>
                                    <Route path="/admin/ui/carousel" component={MyCarousels}/>
                                    <Route path="/admin/form/login" component={MyLogin}/>
                                    <Route component={Err404}/>
                                </Switch>
                            </Admin>
                        } />
                    </App>
        </HashRouter>
        )
    }
}