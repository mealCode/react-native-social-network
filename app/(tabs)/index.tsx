import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { User } from './type';

export default function HomeScreen() {
  const currentUserId = '6651d29b6da739afd68196b9';

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:3000/users/${currentUserId}`
      );
      const user = await response.json();
      setUser(user.data);
      return user.data;
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ paddingHorizontal: 24, marginTop: 70 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 72,
        }}
      >
        <Image
          source={{
            uri: user?.profile_picture,
          }}
          style={{ width: 90, height: 90, borderRadius: 100 }}
        />
        <Text style={{ ...styles.title, marginTop: 12 }}>{user?.name}</Text>
        <Text
          style={{
            ...styles.label,
            marginTop: 8,
          }}
        >
          {user?.bio}
        </Text>

        <Text style={{ ...styles.title, marginTop: 12 }}>Interested in</Text>
        <Text
          style={{
            ...styles.label,
            marginTop: 8,
          }}
        >
          {user?.interests.join(' | ')}
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={styles.label}>Photos</Text>
          <Text style={{ ...styles.title }}>143</Text>
        </View>

        <View>
          <Text style={styles.label}>Followers</Text>
          <Text style={{ ...styles.title }}>321</Text>
        </View>

        <View>
          <Text style={styles.label}>Following</Text>
          <Text style={{ ...styles.title }}>50</Text>
        </View>
      </View>

      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 400,
    color: Colors.gray['500'],
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: Colors.gray['900'],
    textAlign: 'center',
  },
});
