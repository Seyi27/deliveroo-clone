import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import createClient from "../sanity"; // import sanityClient from "../sanity"; for if you want to use sanityClient but it is deprecated.

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    //you can use 'sanityClient' in place of 'createClient' but it is deprecated.
    // always import from the local file we create i.e '/sanity' not '@sanity/client'
    //query for the featured row to request for the all the data on the row, restaurants and dishes.
    createClient
      .fetch(
        `*[_type=='featured']{
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
}`
      )
      .then((data) => {
        // putting the data that is fetched into the 'setfeaturedCategories' state.
        setfeaturedCategories(data);
      });
  }, []);


  return (
    <SafeAreaView className="bg-white pt-10">
      {/* header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <View className='flex-row items-center'>
          <Text className="font-bold text-xl ">
            Current Location
          </Text>
          <ChevronDownIcon size={20} color="#00CCBB" />
          </View>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="#00CCBB" />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
