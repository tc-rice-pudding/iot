import { JSONFetch } from './CommonFetch';

const prefix = '/umonitor';

export interface ResType {
    data: any;
    status: string;
    message: string;
}

export interface TermType {
    field: string,
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte',
    value: any,
}
export interface SortType {
    field: string,
    type: "ASC" | "DESC"
}
export interface PageType {
    number: number,
    size: number
}
export interface SearchType {
    advParam?: TermType[],
    where: TermType[],
    sorts: SortType[],
    page: PageType
}

// ----------------灯带展示 start----------------
// 空间树
// export const getSpaceSubsInfo = () => JSONFetch.get<ResType>('/dcim/cabinet/getSpaceSubsInfo');
export type AOB = ({ resourceId?: never } & { name: string; }) | ({ name?: never } & { resourceId: string; });
export const getSpaceSubsInfo = (params: AOB) => JSONFetch({ method: 'post', url: `/dcim/cabinet/doPosition`, data: params });
// 定位/取消定位
export interface PositionType {
    cabinetId: string, // 所在机柜id，点击U位定位需要传机柜id和起始U位 是定位状态
    unitList: number[], // 定位的起始U位，点击U位定位需要传机柜id和起始U位 是定位状态
    status: number, // 定位为1，取消定位为0
    resourceId: string[], // 设备resourceId，点击设备定位是需要传设备resourceId
}
export const doPosition = (params: PositionType) => JSONFetch({ method: 'post', url: `/dcim/cabinet/doPosition`, data: params });
export const monitInfo = (resourceId: string) => JSONFetch({ method: 'post', url: `/dcim/cabinet/monit/info`, data: { resourceId } });
// 机柜监控信息
// ----------------灯带展示 end----------------


// ----------------机房盘点 start----------------
// 机房盘点-列表
export const getInventoryList = (params: SearchType) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/list`, data: params });

// 机房盘点-全部导出
export const exportAll = (params: SearchType) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/export/list`, data: params });

// 机房盘点-选中导出
export const exportSelect = (resourceIds: string[]) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/export`, data: resourceIds });

// 机房盘点明细-选中导出
export const detailExportSelectRes = (resourceIds: string[]) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/export/list/resultList`, data: resourceIds });

// 机房盘点-操作
export const inventoryDo = (resourceId: string) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/do`, data: { resourceId } });

// 盘点报告
export const report = (resourceId: string, page: PageType) => JSONFetch({ method: 'post', url: `${prefix}room/inventory/view/report/${resourceId}`, data: { page } });

// 盘点报告导出
export const reportExport = (resourceId: string) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/export/report/${resourceId}`, data: null });

// 盘点结果
export const getInfo = (key: string, page: PageType) => JSONFetch({ method: 'post', url: `${prefix}/room/inventory/resultList`, data: { key, page } });

// 盘点结果导出
export const infoExport = (key: string) => JSONFetch({ method: 'post', url: `${prefix}/umonitor/room/inventory/export/resultList`, data: { key } });
// ----------------机房盘点 end----------------


// ----------------盘点分析 start----------------
// 准确率趋势 
export const inventoryList2 = (startTime: string, endTime: string, resourceIds: string[]) => JSONFetch({ method: 'post', url: `${prefix}/umonitor/room/inventory/list`, data: { startTime, endTime, resourceIds } });
// 不准确原因/不准确设备趋势
export const inventoryList3 = (startTime: string, endTime: string, resourceIds: string[]) => JSONFetch({ method: 'post', url: `${prefix}/umonitor/room/inventory/list`, data: { startTime, endTime, resourceIds } });
// ----------------盘点分析 end----------------


// ----------------总览 start----------------
// ----------------总览 end----------------