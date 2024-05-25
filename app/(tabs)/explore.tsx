import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';

import { Colors } from '@/constants/Colors';
import { User } from './type';

export default function TabTwoScreen() {
  const currentUserId = '6651d29b6da739afd68196b9';

  const [followers, setFollowers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `http://localhost:3000/users/nearby/${currentUserId}`
      );
      const users = await response.json();
      setFollowers(users.data);
      return users.data;
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 24, flex: 1 }}>
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          Followers
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: Colors.gray['500'],
          }}
        >
          Your nearby followers with similar interests.
        </Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.0206085,
          longitude: -118.7413622,
          latitudeDelta: 1.5206,
          longitudeDelta: 4.4414,
        }}
      >
        {followers?.map((follower, index) => (
          <Marker
            key={follower.id}
            coordinate={{
              longitude: follower.location.coordinates[0],
              latitude: follower.location.coordinates[1],
            }}
            title={follower.name}
            description={`Interested in: ${follower.interests.join(' , ')}`}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
