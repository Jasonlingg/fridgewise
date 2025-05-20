import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/config/firebaseConfig";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
  } else {
    console.log("No user is logged in");
  }
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="home" color={color} />,
          headerTitle: 'Home',
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: 'Fridge',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="list" color={color} />,
          headerTitle: 'My Fridge',
        }}
      />
      <Tabs.Screen
        name="cameraScreen"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="camera" color={color} />,
          headerTitle: 'Scan Item',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="user" color={color} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}