"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getDataLayer, userContext, pushToDataLayer } from "@/lib/adobeDataLayer";

/**
 * Mounted once near the root of the tree. Ensures window.adobeDataLayer
 * exists before any other component tries to push to it, and keeps a
 * running "user" context in sync so downstream events (addToCart,
 * productView, etc.) always reflect the current authenticated status.
 */
export default function DataLayerInit() {
  const { user, loading } = useAuth();

  // Create the array as early as possible, even before auth resolves,
  // so Adobe Launch / Web SDK bootstrapping on the page never races us.
  useEffect(() => {
    getDataLayer();
  }, []);

  useEffect(() => {
    if (loading) return;
    pushToDataLayer({
      event: "userStatus",
      user: userContext(user),
    });
  }, [loading, user]);

  return null;
}
