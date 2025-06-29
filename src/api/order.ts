import service from "../utils/request";

export function getOrderList(params: any) {
  return service.get("/travelOrder/list", params);
}
export function addOrder(params: any) {
  return service.post(`/travelOrder/createTravelOrder`, params);
}
export function updateOrder( data: any) {
  return service.post(`/travelOrder/`, data);
}
export function deleteOrder(orderId: string) {
  return service.delete(`/travelOrder/deleteTravelOrder/${orderId}`);
}