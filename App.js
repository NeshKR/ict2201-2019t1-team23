import Login from './Src/Login'
import Feedback from './Src/Feedback'
import Challenge from './Src/Challenge'
import ExampleMap from './Src/Map'
import Homepage from './Src/Homepage'
import Profile from './Src/Profile'
import Custom_Leaderboard from './Src/Leaderboard'
import Reward from './Src/Reward'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RootStack = createStackNavigator ({
    //Challenge_Screen : {screen: Challenge},
    Login_Screen : {screen: Login},
    Map_Screen : {screen: ExampleMap},
    Homepage_Screen : {screen: Homepage},
    Feedback_Screen : {screen: Feedback},
    Challenge_Screen : {screen: Challenge},
    Profile_Screen : {screen: Profile},
    Leaderboard_Screen : {screen: Custom_Leaderboard},
    Reward_Screen : {screen: Reward},
})

const App = createAppContainer(RootStack);

export default App;

