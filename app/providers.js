"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import DataLayerInit from "@/components/DataLayerInit";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <DataLayerInit />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
