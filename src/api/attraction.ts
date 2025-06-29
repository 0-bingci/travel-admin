import service from "../utils/request";

export function getAttractionList(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return service.get(`/sightDetail/list?${queryString}`);
}
export function addAttraction(data: any) {
    return service.post(`/sightDetail`, data);
}
export function updateAttraction(data: any) {
    return service.put(`/sightDetail`, data);
}
export function deleteAttraction(id: number) {
    return service.delete(`/sightDetail/${id}`);
}