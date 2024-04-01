import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems";

const initialState = {
  cartItems: cartItems,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_CART:
      //Sepette urun olup olmadigini kontrol etmek icin kullanilir.
      let product = state.cartItems.find((c) => c.product.id === payload.id);
      if (product) {
        product.quantity++; //eger sepette eleman varsa onun sayisini bir arttir
        return {
          ...state, //... icindeki elemanlari yeniden ayirarak olusturur
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { quantity: 1, product: payload }], //sepette eleman bulunmadigi icin sifirdan ekledi.
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.product.id !== payload.id),
      };

    default:
      return state;
  }
}
