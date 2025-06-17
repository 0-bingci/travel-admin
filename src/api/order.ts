import service from "../utils/request";

export function getOrderList(params: any) {
  return service.get("/travelOrder/list", params);
}