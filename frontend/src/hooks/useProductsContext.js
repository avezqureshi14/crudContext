import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

export const useProductsContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProductsContext must be inside our ProductContextProvider');
  }

  return context;
};
