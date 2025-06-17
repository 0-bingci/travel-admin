import service from "../utils/request";

export function getTripList(params: any) {
  return service.get("/trip/advancedSearch", params);
}