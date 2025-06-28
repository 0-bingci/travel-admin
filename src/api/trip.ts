import service from "../utils/request";

export function getTripList(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return service.post(`/trip/advancedSearch?${queryString}`);
}