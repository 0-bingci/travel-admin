import service from "../utils/request";

export function getAttractionList(params: any) {
    return service.get("/sightDetail/list", params);
}
