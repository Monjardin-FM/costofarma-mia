import { ShoppingCartItem } from "../../domain/entities/shopping-cart-item";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/hooks/use-store";
import * as actions from "../store/shopping-cart-slice";

export const useShoppingCart = () => {
  const state = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();

  const addItem = (payload: { item: ShoppingCartItem }) =>
    dispatch(actions.addItem(payload));

  const removeItem = (payload: { index: number }) =>
    dispatch(actions.removeItem(payload));

  const clear = () => dispatch(actions.clear());

  const updateItem = (payload: { index: number; changes: ShoppingCartItem }) =>
    dispatch(actions.updateItem(payload));

  const updateItemQuantity = (payload: { index: number; quantity: number }) =>
    dispatch(actions.updateQuantity(payload));

  return {
    ...state,
    addItem,
    removeItem,
    clear,
    updateItem,
    updateItemQuantity,
  };
};
