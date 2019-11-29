import Login from './Src/Login'
import Old_Homepage from './Src/Old_Homepage'
import Feedback from './Src/Feedback'
import Challenge from './Src/Challenge'
import ExampleMap from './Src/Map'
import Homepage from './Src/Homepage'
import Profile from './Src/Profile'
import Custom_Leaderboard from './Src/Leaderboard'
import Reward from './Src/Reward'
import TestProfile from './Src/testProfile'
import Cba from './Src/Get_Current_Location_Map'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RootStack = createStackNavigator ({
    //Challenge_Screen : {screen: Challenge},
    Login_Screen : {screen: Login},
    Map_Screen : {screen: ExampleMap},
    Cba_Screen : {screen: Cba},
    Test_Profile_Screen : {screen: TestProfile},
    Homepage_Screen : {screen: Homepage},
    Feedback_Screen : {screen: Feedback},
    Old_Homepage_Screen : {screen: Old_Homepage},
    Challenge_Screen : {screen: Challenge},
    Profile_Screen : {screen: Profile},
    Leaderboard_Screen : {screen: Custom_Leaderboard},
    Reward_Screen : {screen: Reward},
})

const App = createAppContainer(RootStack);

export default App;

