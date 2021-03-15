import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import RoomPage from '../pages/RoomPage/RoomPage'
import SignUp from '../pages/SignUpPage/SignUp'


export const routes  = [
    {   
        path: '/',
        exact: true,
        main : ()=><RoomPage/>
    },
    {   
        path: '/Login',
        exact: false,
        main : ()=><LoginPage/>
    },
    {   
        path: '/SignUp',
        exact: false,
        main : ()=><SignUp/>
    },
    {   
        path: '/Profile',
        exact: false,
        main : ()=><ProfilePage/>
    },
    {   
        path: '',
        exact: false,
        main : ()=><NotFoundPage/>
    },
]