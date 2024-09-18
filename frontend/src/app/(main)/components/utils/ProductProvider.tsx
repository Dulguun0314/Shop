import { createContext, PropsWithChildren, useContext } from "react";

interface Product {
  id: string;
  productName: string;
  price: number;
  qty: number;
  images: string;
  categoryId: string;
  type: string;
}
interface AuthProduct {
  products: Product | null;
}
interface ProductContextType {
  products: AuthProduct;
  createProduct: (product: Product) => void;
  getProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
}
const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  return (
    <ProductContext.Provider
      value={{
        products: {
          products: null,
        },
        createProduct: (product) => {},
        getProduct: (product) => {
          // Fetch product from the database or state
        },
        deleteProduct: (productId) => {
          // Delete product from the database or state
        },
        updateProduct: (product) => {
          // Update product in the database or state
        },
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
