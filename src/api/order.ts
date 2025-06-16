import service from "@/utils/request";
export default function getOrderList(params: any) {
  return service.get("/travelOrder/list", params);
}