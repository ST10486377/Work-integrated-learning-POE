import * as React from 'react';
import { Image, View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HeaderLogo() {
  return (
    <Image source={require('./assets/logo.jpg')} style={{ width: 100, height: 50, resizeMode: 'contain' }} />
  );
}

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Empowering the Nation</Text>
      <Text style={styles.text}>
        Providing accredited training programs designed to equip individuals with practical skills
        for employment and entrepreneurship.
      </Text>
    </ScrollView>
  );
}

function CoursesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>
      <Text style={styles.text}>• Six-month Courses: First Aid, Sewing, Life Skills, Landscaping...</Text>
      <Text style={styles.text}>• Six-week Courses: Cooking, Baking, Computer Literacy...</Text>
    </View>
  );
}

function CalculatorScreen() {
  const [total, setTotal] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fee Calculator</Text>
      <Button title="Simulate Total (R4200)" onPress={() => setTotal(4200)} />
      {total > 0 && <Text style={styles.text}>Total (incl. VAT): R{total.toFixed(2)}</Text>}
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.text}>📞 Phone: 011 456 7890</Text>
      <Text style={styles.text}>✉ Email: info@empowerthenation.co.za</Text>
      <Text style={styles.text}>🏢 Sandton Centre, Soweto Branch, Roodepoort Campus</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: { backgroundColor: '#1E90FF' },
          headerTintColor: 'white',
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: { backgroundColor: '#1E90FF' }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
        <Tab.Screen name="Calculator" component={CalculatorScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5
  }
});
