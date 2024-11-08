import { StatusBar } from 'expo-status-bar';
import { Slot} from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Hova</Text>
      <StatusBar style="auto" />
    </View>
  );
}
