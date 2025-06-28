import service from "../utils/request";

export function getAttractionList(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return service.get(`/sightDetail/list?${queryString}`);
}
