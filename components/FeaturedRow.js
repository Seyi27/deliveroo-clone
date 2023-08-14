import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import createclient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants]= useState([])

  useEffect(() => {
    // query that will only get the id of the row that we are in. and also requesting for all the restaurants and dishes of that particular row.
    // where $id is the row id that is passed as a prop from HomeScreen.js and the same id is passed 
    // as a parameter at the end of the query
    createclient.fetch(
   `
    *[_type=='featured' && _id == $id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      },
    }[0]
    `,
    {id} //the same row id is passed as a parameter after the query
    ).then((data) =>{
      setRestaurants(data?.restaurants) // puts the restaurants data of that particular row in the state.
    });
  }, []);


  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Card */}
        {restaurants?.map((restaurant)=>(
          <RestaurantCard
          key={restaurant._id}
          id={restaurant._id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          rating={restaurant.rating}
          genre={restaurant.type?.name}
          address={restaurant.address}
          short_description={restaurant.short_description}
          dishes={restaurant.dishes}
          long={restaurant.long}
          lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
