import { View } from 'react-native';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const screenOptions = {
	headerStyle: { backgroundColor: '#5637DD' },
	headerTintColor: '#fff',
};

const HomeNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{ title: 'Home' }}
			/>
		</Stack.Navigator>
	);
};

const AboutNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name='About'
				component={AboutScreen}
				options={{ title: 'About' }}
			/>
		</Stack.Navigator>
	);
};

const ContactNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name='Contact'
				component={ContactScreen}
				options={{ title: 'Contact' }}
			/>
		</Stack.Navigator>
	);
};

const DirectoryNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName='Directory' screenOptions={screenOptions}>
			<Stack.Screen
				name='Directory'
				component={DirectoryScreen}
				options={{ title: 'Campsite Directory' }}
			/>
			<Stack.Screen
				name='CampsiteInfo'
				component={CampsiteInfoScreen}
				options={({ route }) => ({
					title: route.params.campsite.name,
				})}
			/>
		</Stack.Navigator>
	);
};

const Main = () => {
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<Drawer.Navigator
				initialRouteName='Home'
				drawerStyle={{ backgroundColor: '#CEC8FF' }}
			>
				<Drawer.Screen
					name='Home'
					component={HomeNavigator}
					options={{ title: 'Home' }}
				/>
				<Drawer.Screen
					name='Directory'
					component={DirectoryNavigator}
					options={{ title: 'Directory' }}
				/>
				<Drawer.Screen name='About' component={AboutNavigator} />
				<Drawer.Screen name='Contact Us' component={ContactNavigator} />
			</Drawer.Navigator>
		</View>
	);
};

export default Main;
