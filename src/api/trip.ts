import service from "../utils/request";

export function getTripList(params: any) {
    // 构造查询参数
    const queryParams = {
        pageNum: params.pageNum || 1,
        pageSize: params.pageSize || 10,
        ...params
    };
    
    // 移除空值参数
    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
            delete queryParams[key];
        }
    });
    
    return service.post(`/trip/advancedSearch`, queryParams);
}

export function createTrip(data: any) {
    return service.post('/trip', data);
}

export function updateTrip(data: any) {
    return service.put(`/trip`, data);
}

export function deleteTrip(id: any) {
    return service.delete(`/trip/${id}`);
}
