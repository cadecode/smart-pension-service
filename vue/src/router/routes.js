import Home from '../views/Home'

import User from '../views/User'
import UserLogin from '../components/user/Login'
import UserRegister from '../components/user/Register'
import UserAccount from '../components/user/Account'

import Merchart from '../views/Merchart'
import MerchartLogin from '../components/merchart/Login'
import MerchartRegister from '../components/merchart/Register'
import GroupAccount from '../components/merchart/GroupAccount'
import ShopAccount from '../components/merchart/ShopAccount';

import Groups from '../components/merchart/Groups'
import Service from '../components/merchart/Service'

var routes = [

    {
        path: "/",
        component: Home
    },
    {
        path: "/groups",
        component: Groups
    },
    {
        path: "/service",
        component: Service
    },
    {
        path: '/user',
        component: User,
        children: [

            {
                path: 'login',
                component: UserLogin
            },
            {
                path: 'register',
                component: UserRegister
            },
            {
                path: 'account',
                component: UserAccount,
                meta: {
                    flag: true
                }
            },
            {
                path: 'setting',
                meta: {
                    flag: true
                }
            }
        ]
    },
    {
        path: '/merchart',
        component: Merchart,
        children: [

            {
                path: 'login',
                component: MerchartLogin
            },
            {
                path: 'register',
                component: MerchartRegister
            },
            {
                path: 'groupaccount',
                component: GroupAccount,
                meta: {
                    flag: true
                }
            },
            {
                path: 'shopaccount',
                component: ShopAccount,
                meta: {
                    flag: true
                }
            },
        ]
    }
]

export default routes