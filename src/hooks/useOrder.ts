import React from "react"

export function useOrder() {
  const cacheOrders = (orders: any) => {}
  return { getOrderPage, cacheOrderPage, getOrder, cacheOrder, getOrders, cacheOrders }
}
