import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';

import { routes } from '../../routes/routes';

const showContent =(routes
        : {
            path: string;
            exact: boolean;
            main: any;
        }[]
        ) =>{
    var content = null;
    if(routes.length>0){
        content = routes.map((route,index)=>{
            return <Route key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
        })
    }
    return content
}
function HomePage() {
    return (
        <Router>
            
            <MenuBar/>
            <div>
                <Switch>
                    {
                        showContent(routes)
                    }  
                </Switch>           
            </div>
         
        </Router>
    );
}

export default HomePage;