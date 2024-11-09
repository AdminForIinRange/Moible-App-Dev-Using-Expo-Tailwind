import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <FlatList 
      data={[{id: 1}, {id: 2}, {id: 3}]}
      keyExtractor={item => item.$id} 
      renderItem={({item}) => (<Text className="text-3xl">{item.id}</Text>)}/>
    </View>
  )
}

export default Home