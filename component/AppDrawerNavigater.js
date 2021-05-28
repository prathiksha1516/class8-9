import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigaor'
import CustomSideBar from './CustomSideBar'
import SettingScreen from '../screens/SettingScreen'
import NotificationScreen from '../screens/NotificationScreen'
import MyDonationScreen from '../screens/MyDonationScreen'
export const AppDrawerNavigaor = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator,
        navigationOptions :{
            drawerIcon : <Icon name = "home" type = "fontawesome5"/>
        }
    },
    MyDonations:{
        screen:MyDonationScreen,
        navigationOptions :{
            drawerIcon : <Icon name = "gift" type = "fontawesome5"/>,
            drawerLabel : "My Donations"  
        }
    },
    Notification:{
        screen:NotificationScreen,
        navigationOptions :{
            drawerIcon : <Icon name = "bell" type = "fontawesome5"/>,
            drawerLabel : "Notifications" 
        }

    },


    setting:{
        screen:SettingScreen,
        navigationOptions :{
            drawerIcon : <Icon name = "settings" type = "fontawesome5"/>,
            drawerLabel : "settings" 
        }

    }
},
    {
        contentComponent:CustomSideBar
 },
{
    initialRouteName:'Home'
})