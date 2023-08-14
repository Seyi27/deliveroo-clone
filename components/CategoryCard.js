import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CategoryCard = ({imageUrl, title}) => {
  return (
    <TouchableOpacity className='relative mx-2'>
        <Image
         source={{
            uri: imageUrl
         }}
         className='h-20 w-20 rounded'
        />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({})