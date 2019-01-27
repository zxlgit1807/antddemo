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
import MyRegister from './pages/form/register'
import MyBasicTable from './pages/table/basicTable'
import MyHighTable from './pages/table/highTable'
import MyCity from './pages/city/city'
import MyOrders from './pages/order/oders'
import MyCommon from './commons'
import OderDetails from './pages/order/details'
import MyPermission from './pages/permission/index'
import MyUsers from './pages/user/index'
import BikeMap from './pages/map/bike'
import MyBars from './pages/echarts/myBar'
import MyPies from './pages/echarts/myPie'
import MyLines from './pages/echarts/myLine'
import MyRichText from './pages/rich/myRichText'

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
                                    <Route path="/admin/form/reg" component={MyRegister}/>
                                    <Route path="/admin/table/basic" component={MyBasicTable}/>
                                    <Route path="/admin/table/high" component={MyHighTable}/>
                                    <Route path="/admin/city" component={MyCity}/>
                                    <Route path="/admin/order" component={MyOrders}/>
                                    <Route path="/admin/permission" component={MyPermission}/>
                                    <Route path="/admin/user" component={MyUsers}/>
                                    <Route path="/admin/bikeMap" component={BikeMap}/>
                                    <Route path="/admin/echarts/bars" component={MyBars}/>
                                    <Route path="/admin/echarts/pies" component={MyPies}/>
                                    <Route path="/admin/echarts/lines" component={MyLines}/>
                                    <Route path="/admin/rich" component={MyRichText}/>
                                    <Route component={Err404}/>
                                </Switch>
                            </Admin>
                        } />
                        <Route path="/common" render={() =>
                            <MyCommon>
                                <Route path="/common/order/detail/:orderId" component={OderDetails} />
                            </MyCommon>
                        }
                        />
                    </App>
        </HashRouter>
        )
    }
}