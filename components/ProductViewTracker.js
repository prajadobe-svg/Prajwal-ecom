"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { pushProductView } from "@/lib/adobeDataLayer";

export default function ProductViewTracker({ product }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    pushProductView(product, user);
    // Re-fire if the visitor logs in/out while sitting on the page, or
    // if they navigate to a different product without a full reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, loading, user]);

  return null;
}
