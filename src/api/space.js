/* eslint-disable @typescript-eslint/camelcase */
import { JSONFetch } from './CommonFetch';

export const baseUrl = process.env.NODE_ENV === 'development' ? '/api/v1/xaidc/resource' : '/api/v1/xaidc/resource';
export const RESOURCE_IMPORT = `${baseUrl}/resource/{class}/import`; // 资源导入
export const BATCH_UPDATE = `${baseUrl}/resource/{class}/batchUpdate`; // 批量更新
export const TEMPLATE_DOWNLOAD = `${baseUrl}/resource/{class}/download`; // 模板下载
export const EXPORT_SELECT = `${baseUrl}/resource/{class}/export`; // 导出选中
export const CUSTOM_EXPORT = `${baseUrl}/resource/{class}/custom/export`; // 导出选中

export const EXPORT_ALL = `${baseUrl}/resource/{class}/export/all`; // 导出全部

export const ITurl = process.env.NODE_ENV === 'development' ? '/umonitor/overview' : '/umonitor/overview';

// =======空间列表配置======= //

/**
 * 解析REST参数
 * @param {*} url
 * @param {*} restParams
 */
export function parseRestParams(url, restParams = {}) {
  return url.replace(/\{([\w]+)\}/g, (str, $1) => {
    let value = restParams[$1];
    if (typeof value === 'string') return value || '';
    return value;
  });
}

/**
 * 获取空间下所有资源列表信息
 * @param {*} params
 * @param {*} restParams
 */
export function spaceDeviceList(params, restParams) {
  const url = `${baseUrl}/resource/{class}/{resourceId}/{subclass}`;
  return JSONFetch({
    method: 'post',
    url: parseRestParams(url, restParams),
    data: params,
  });
}

/**
 * 资源概况获取
 * @param {*} params
 * @param {*} restParams
 */
export function resourceInfo(params, restParams) {
  let url = `${baseUrl}/resource/{class}/{resourceId}`;
  return JSONFetch({
    method: 'get',
    url: parseRestParams(url, restParams),
    data: params,
  });
}

/**
 * 资源信息编辑
 * @param {*} params
 * @param {*} restParams
 */
export function editResourceInfo(params, restParams) {
  let url = `${baseUrl}/resource/{class}/{resourceId}`;
  return JSONFetch({
    method: 'put',
    url: parseRestParams(url, restParams),
    data: params,
  });
}

/**
 * 资源概况获取
 * @param {*} params
 * @param {*} restParams
 */
export function resourceStatistics(params, restParams) {
  let url = `${baseUrl}/resourcestatistics/survey/{class}/{resourceId}`;
  return JSONFetch({
    url: parseRestParams(url, restParams),
    data: params,
  });
}

/**
 * 资源导入
 * @param {*} params
 * @param {*} restParams
 */
export function resourceImport(params, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(RESOURCE_IMPORT, restParams),
    data: params,
  });
}

/**
 * 资源选中导出
 * @param {*} params
 * @param {*} restParams
 */
export function resourceExport(params, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(EXPORT_SELECT, restParams),
    data: params,
  });
}

/**
 * 资源全部导出
 * @param {*} params
 * @param {*} restParams
 */
export function resourceExportAll(params, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(EXPORT_ALL, restParams),
    data: params,
  });
}

/**
 * 模板下载
 * @param {*} params
 * @param {*} restParams
 */
export function templateDownload(params, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(TEMPLATE_DOWNLOAD, restParams),
    data: params,
  });
}

/**
 * 资源实例信息
 * @param {*} params
 * @param {*} restParams
 */
export function resourceMessage(params, restParams) {
  let url = `${baseUrl}/api/v1/xaidc/resource/resource/{class}/{resourceId}`;
  return JSONFetch({
    method: 'post',
    url: parseRestParams(url, restParams),
    data: params,
  });
}

/**
 * it设备定位接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewDoPosition(params, uuid) {
  return JSONFetch({
    method: 'post',
    url: `${ITurl}/doPosition/${uuid}`,
    data: params,
  });
}

/**
 * it设备匹配接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewMatchEic(params, uuid) {
  return JSONFetch({
    method: 'post',
    url: `${ITurl}/matchEic/${uuid}`,
    data: params,
  });
}

/**
 * it标签绑定接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewSingleMatch(resourceId) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/singleMatch?resourceId=${resourceId}`,
  });
}

/**
 * it标签绑定确定接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewSingleMatchUpdateSingleEic(serialNum, eicNum) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/updateSingleEic?serialNum=${serialNum}&eicNum=${eicNum}`,
  });
}

/**
 * it标签读取和写入公共接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewJudgeEIC(resourceId) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/judgeEIC?resourceId=${resourceId}`,
  });
}

/**
 * it标签读取接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewToReadEic(resourceId) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/toReadEic?resourceId=${resourceId}`,
  });
}

/**
 * it标签写入接口
 * @param {*} params
 * @param {*} restParams
 */
export function overviewGetDeviceInfo(resourceId) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/getDeviceInfo?resourceId=${resourceId}`,
  });
}

/**
 * it设备标签写入确定
 * @param {*} params
 * @param {*} restParams
 */
export function overviewToWriteEic(params) {
  return JSONFetch({
    method: 'post',
    url: `${ITurl}/toWriteEic`,
    data: params,
  });
}

/**
 * it设备批量解除绑定确定
 * @param {*} params
 */
export function overviewUnboundByNumber(params, uuid) {
  return JSONFetch({
    method: 'post',
    url: `${ITurl}/unboundByNumber/${uuid}`,
    data: params,
  });
}

/**
 * it设备单独解除绑定确定
 * @param {*} serialNum
 */
export function overviewUnbound(serialNum) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/unbound?serialNum=${serialNum}`,
  });
}

/**
 * it设备详情位置信息接口
 * @param {*} serialNum
 */
export function getLocationInfo(resourceId) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/getLocationInfo?resourceId=${resourceId}`,
  });
}

/**
 * 资源分配空间树获取接口
 * @param {*} params
 */
export function getSpaceNew(params) {
  return JSONFetch({
    method: 'post',
    url: `${ITurl}/getSpace`,
    data: params,
  });
}
/**
 * 资源分配空间树 搜索
 * @param {*} params
 */
export function searchTree(params) {
  return JSONFetch({
    method: 'post',
    url: `${ITurl}/getSpaceTree`,
    data: params,
  });
}

/**
 * 进度条数据
 * @param {*}
 * @returns
 */
export function getItPorcessKey(processKey) {
  return JSONFetch({
    method: 'get',
    url: `${ITurl}/getPorcessStatusByKey/${processKey}`,
  });
}

/**
 * it设备全部导出下载
 * @param {*}
 * @returns
 */
export function getItDownloadFile(fileName) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/resource/downloadFile?fileName=${fileName}&jasypt=Mg88pRowiEEFySXbnv9NPw==`,
  });
}

// --------------------------------------------------------- 数据报告报表-------------------------------------------------------

/**
 * 数据报告报表列表获取
 * @param {*} params
 */
export function getList(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/dataUsageReport/dataUsageResource/list`,
    data: params,
  });
}

/**
 * 数据报告报表获取
 * @param {*} params
 */
export function getDetailList(params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/dataUsageReport/getInitialData/list`,
  });
}

/**
 * 数据报告报表新增
 * @param {*} params
 */
export function getDetailAdd(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/dataUsageReport/dataUsageResource/save`,
    data: params,
  });
}

/**
 * 数据报告报表删除
 * @param {*} params
 */
export function getDetailDelete(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/dataUsageReport/dataUsageResource/delete`,
    data: params,
  });
}

/**
 * 数据报告报表编辑
 * @param {*} params
 */
export function getDetailUpdate(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/dataUsageReport/dataUsageResource/update`,
    data: params,
  });
}

/**
 * 数据报告报表查询
 * @param {*} params
 */
export function getDetailView(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/dataUsageReport/dataUsageResource/listByTime`,
    data: params,
  });
}

/**
 * 数据报告报表导出
 * @param {*} params
 */
export function getDetailExport(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/dataUsageReport/dataUsageResource/export`,
    data: params,
  });
}

/**
 * 机柜详情物理子系统页签数据获取
 * @param {*} params
 */
export function getSubSystemByNumber(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/subSystem/getSubSystemByNumber`,
    data: params,
  });
}

// --------------------------------------------------------- PUE报表-------------------------------------------------------

/**
 * pue列表数据获取
 * @param {*} params
 */
export function getPueHistoryData(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/pueHistoryData/pueData/list`,
    data: params,
  });
}

/**
 * pue列表新增
 * @param {*} params
 */
export function addPueSave(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/pueHistoryData/pueData/save`,
    data: params,
  });
}

/**
 * pue列表删除
 * @param {*} params
 */
export function deletePueSave(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/pueHistoryData/pueData/delete`,
    data: params,
  });
}

// --------------------------------------------------------- 碳排放报表-------------------------------------------------------

/**
 * 碳排放列表数据获取
 * @param {*} params
 */
export function getCarbonHistoryData(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/carbonHistoryData/carbonData/list`,
    data: params,
  });
}

/**
 * 碳排放列表新增
 * @param {*} params
 */
export function addCarbonSave(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/carbonHistoryData/carbonData/save`,
    data: params,
  });
}

/**
 * 碳排放列表删除
 * @param {*} params
 */
export function deleteCarbonSave(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/carbonHistoryData/carbonData/delete`,
    data: params,
  });
}
