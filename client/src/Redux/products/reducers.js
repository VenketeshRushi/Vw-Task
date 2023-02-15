import {
  ADD_TO_CART_SUCCESS,
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  REMOVE_FROM_CART,
  ORDER_SUCCESS,
} from "./actionTypes";

const init = {
  isLoading: false,
  isError: false,
  products: [],
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  ordersummry: JSON.parse(localStorage.getItem("ordersummry")) || {
    quantity: 0,
    total: 0,
  },
};

export const productReducer = (state = init, { type, payload }) => {
  switch (type) {
    case GET_DATA_LOADING: {
      return { ...state, isLoading: true };
    }

    case GET_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    }

    case GET_DATA_ERROR: {
      return { ...state, isLoading: false, isError: true };
    }

    case ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        cartItems: [...payload.cartData],
        ordersummry: { ...state.ordersummry, ...payload.ordersummarydata },
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter((e, i) => i !== payload.index),
        ordersummry: { ...state.ordersummry, ...payload.ordersummarydata },
      };
    }

    case ORDER_SUCCESS: {
      return {
        ...state,
        cartItems: [],
        ordersummry: {
          quantity: 0,
          total: 0,
        },
      };
    }

    default:
      return state;
  }
};
