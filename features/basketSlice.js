import { createSlice } from "@reduxjs/toolkit";

const initialState: CounterState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]; //this means it should keep whatever it is in basket and also add whatever the payload is.
    },
    removeFromBasket: (state, action) => {
      // means that is finds if the items you are trying to remove is there i.e is the id we are looping through equal to the id that we provided ?
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items]; // creates a copy of the basket

      //   if the index returned is greater than 0, it should remove the  item
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant remove product {id: ${action.payload.id}} as its nit in basket`
        );
      }

      state.items = newBasket; // replace existing basket with new basket
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions; //to access the actions.

export const selectBasketItems = (state) => state.basket.items; //selector to access the items

//to filter value of length of the items for that particular row using the id
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id); // this means that it should filter the items that match the id.
// which will return the items with same id.

// using the reduce function which reduces the array to a single number.
// everytime we loop through, we have the acummulator(i.e total) and the individual item (i.e item).
// it accumulates the value (i.e item.price) into the 'total' variable where 0 is the initial number.
export const selectBasketTotal = (state)=> state.basket.items.reduce((total, item)=>
    total += item.price, 0)

export default basketSlice.reducer;
