import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import createClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //query to fetch all the categories
    createClient.fetch(
      ` 
      *[_type=='category']
      `
      ).then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/* Cartegory Card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imageUrl={urlFor(category.image).url()} //imagehelper to convert the image from the database. 
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
