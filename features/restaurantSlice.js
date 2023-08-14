import { createSlice } from "@reduxjs/toolkit";

const initialState: CounterState = {
  restaurant:{
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  }
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions; //to access the actions.

export const selectRestaurant = (state) => state.restaurant.restaurant; //selector to access the restaurant

export default restaurantSlice.reducer;
