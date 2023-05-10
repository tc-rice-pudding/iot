/* eslint-disable @typescript-eslint/camelcase */
import { JSONFetch } from './CommonFetch';
const user = process.env.NODE_ENV === 'development' ? '/niemp/system' : '/niemp/system';
const southBaseUrl = process.env.NODE_ENV === 'development' ? '/das/api' : '/das/api';
const IOTBaseUrl = process.env.NODE_ENV === 'development' ? '/umonitor' : '/umonitor';
export const baseUrl = process.env.NODE_ENV === 'development' ? '/api/v1/xaidc/resource' : '/api/v1/xaidc/resource';
export const deviceModelsImportAction = `${baseUrl}/deviceModels/import`;
export const cabinetModelsImportAction = `${baseUrl}/cabinetModels/import`;
export const deploymentModelsImportAction = `${baseUrl}/deploymentModels/import`;
export const deviceModelsDownloadAction = `${baseUrl}/deviceModels/download`;
export const cabinetModelsDownloadAction = `${baseUrl}/cabinetModels/download`;
export const layoutModelsDownloadAction = `${baseUrl}/resource/layout/download`;
export const deploymentModelsDownloadAction = `${baseUrl}/deploymentModels/download`;

export const EXPORT_ALL = `${baseUrl}/{class}/export/all`; // 导出全部
export const EXPORT_SELECT = `${baseUrl}/{class}/export`; // 导出选中
export const TEMPLATE_DOWNLOAD = `${baseUrl}/{class}/download`; // 模板下载
export const overview_export = `${baseUrl}/overview/roomHistorical/export`; // 概览历史报告导出Excel接口
// export const resourceRealTimeAction = `${baseUrl}/tsdb/status/last`;
export const resourceRealTimeAction = `${southBaseUrl}/tsdb/status/last`;
export const changeUStatusAction = `${baseUrl}/resource/changeUStatus`;

// 附件上传
export const attachmentAction = `${baseUrl}/attachment/save`;
// 附件下载
export const downloadAttachment = `${baseUrl}/attachment/download`;
// 附件预览
export const viewAttachment = `${baseUrl}/attachment/view`;
// 附件删除
export const deleteAttachment = `${baseUrl}/attachment/delete`;

//  获取 AB 路数据的曲线
export function getAggMultiple(params) {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/tsdb/orig/aggMultiple`,
    data: params,
  });
}

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

export function cabinetNumberList(number, params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/optional/editItDevice/cabinetNumber/${number}`,
    data: params,
  });
}

export function cabinetGroup(type, params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/optional/editCabinet/cabinetGroup/${type}`,
    data: params,
  });
}

// ------------ 角色 start--------------
export function getAllList(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/baseRoles/getAllList`,
    data: params,
  });
}
export function getRoleInfo(id, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/baseRoles/get?id=${id}`,
    data: params,
  });
}
export function delRole(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/baseRoles/delete`,
    data: params,
  });
}
export function updateRole(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/baseRoles/saveRole`,
    data: params,
  });
}
export function getAllMenu(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/baseMenu/getAllList`,
    data: params,
  });
}
export function getAllOper(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/baseOperations/getAllList`,
    data: params,
  });
}
// ------------ 角色 end--------------

// PUE历史数据信息
export function pueHistoryData(params) {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/tsdb/orig/pueHistoryData`,
    data: params,
  });
}
// 碳排放历史数据信息
export function carbonHistoryData(params) {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/tsdb/orig/carbonHistoryData`,
    data: params,
  });
}

// 查询物理子系统信息
export function getSubSystemByNumber(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/subSystem/getSubSystemByNumber`,
    data: params,
  });
}
// 查询物理子系统各级别数量
export function getSystemLevelCount(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/subSystem/getSystemLevelCount`,
    data: params,
  });
}

export function getModularAccessRecord(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/accessRecord/getModularAccessRecord`,
    data: params,
  });
}
export function getUserAccessRecord(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/accessRecord/getUserAccessRecord`,
    data: params,
  });
}
export function getUserDetailedInfo(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/accessRecord/getUserDetailedInfo`,
    data: params,
  });
}

export function get3dTemperature(params) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/cabinet/u/monit/temperature`,
    data: params,
  });
}

// 查看采集器测点接口--查看实时值列表
// {
//   "zct_id": "0_34_0",//资产条id
//   "number": 1,//页数
//   "size": 10 //每页大小
// }
export function getCIList(params) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/cabinet/zct/ci/list`,
    data: params,
  });
}
// 机柜监控信息接口
// {
//   "number": "DXC110AA01",//机柜编号
// }
export function getMonitInfo(params) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/cabinet/monit/info`,
    data: params,
  });
}
// 定位/取消定位接口
export function doPosition(params, processKey) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/overview/doPosition/${processKey}`,
    data: params,
  });
}
// 查看U位监控状态接口
export function getUSpacesListStatus(params) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/cabinet/u/monit/status`,
    data: params,
  });
}
/**
 * 进度条数据
 */
export function getPorcessByKey(processKey, params) {
  return JSONFetch({
    method: 'get',
    url: `${IOTBaseUrl}/overview/getPorcessStatusByKey/${processKey}`,
    data: params,
  });
}

// 获取图片
export function getImgByName(params) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/cabinet/device/background/image`,
    data: params,
  });
}

// 根据机柜编号 查询树
export function getCabinetTree(params) {
  return JSONFetch({
    method: 'post',
    url: `${IOTBaseUrl}/cabinet/u/monit/search/cabinet`,
    data: params,
  });
}

// 查询电力、物理拓扑关系
export function getTopoLotyData(restParams, params) {
  const url = `${baseUrl}/resource/getTopologicalGraph/{relNumber}/{name}/{beginType}/{targetType}`;
  return JSONFetch({
    method: 'get',
    url: parseRestParams(url, restParams),
    data: params,
  });
}
/**
 * 概览历史报告查看某个日期报表
 * @param {*} processKey
 * @param {*} params
 * @returns
 */
export function getRoomHistorical(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/overview/roomHistorical`,
    data: params,
  });
}
/**
 * 概览历史报告查询接口
 * @param {*} processKey
 * @param {*} params
 * @returns
 */
export function getHistoricalReportByTime(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/overview/getHistoricalReportByTime`,
    data: params,
  });
}

/**
 * 统一视图 全局搜索关键字
 */
export function queryKeyword(keyword) {
  return JSONFetch({
    method: 'get',
    url: `${southBaseUrl}/es/query/${keyword}`,
    data: {},
  });
}
/**
 * 统一视图 全局搜索关键字，更新热度
 */
export function queryUpdate(param) {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/es/save`,
    data: param,
  });
}

/**
 * 进度条数据
 * @param {*}
 * @returns
 */
export function getPorcessStatusByKey(processKey, params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/resource/getPorcessStatusByKey?processKey=${processKey}`,
    data: params,
  });
}

/**
 * 物联定位自定义导出进度条数据
 * @param {*}
 * @returns
 */
export function deviceGetPorcessStatusByKey(processKey, params) {
  return JSONFetch({
    method: 'get',
    url: `${IOTBaseUrl}/device/getPorcessStatusByKey?processKey=${processKey}`,
    data: params,
  });
}

/**
 * 获取所有的机房
 * @param {*} params
 * @returns
 */
export function getAllRoom(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/root/project_root/room`,
    data: params,
  });
}

/**
 * 获取所有的园区
 * @param {*} params
 * @returns
 */
export function getAllPark(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/root/project_root/park`,
    data: params,
  });
}

/**
 * 机房资源概览接口
 * @param {*} params
 * @returns
 */
export function getOverviewRoom(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/overview/room`,
    data: params,
  });
}

/**
 * 获取历史履历
 * @param {*} number
 * @returns
 */
export function getHistoryList(restParams, params) {
  return JSONFetch({
    method: 'get',
    url: parseRestParams(`${user}/history/list?pageNumber={pageNumber}&pageSize={pageSize}&module={module}&relId={relId}`, restParams),
    data: params,
  });
}

/**
 * 获取配电柜支路
 * @param {*} number
 * @returns
 */
export function getListByElectricCab(number, params) {
  return JSONFetch({
    method: 'get',
    url: `/das/api/resource/getListByElectricCab?number=${number}`,
    data: params,
  });
}
/**
 * 根据机房获取所有机柜列
 * @param {*} resourceId
 * @returns
 */
export function getAllCabinetRow(resourceId, params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/resource/getResourcesByParentId/${resourceId}`,
    data: params,
  });
}

/**
 * 点击机柜获取设备信息
 * @param {*} resourceId
 * @returns
 */
export function getDeviceFieldByClassCode(classCode) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/resource/getDeviceFieldByClassCode/${classCode}`,
  });
}

/**
 * 根据机柜列ID获取所有的机柜
 * @param {*} params
 * @returns
 */
export function getAllCabinet(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/root/project_root/cabinet`,
    data: params,
  });
}
/**
 * 获取库房机柜
 * @param {*} params
 * @returns
 */
export function getAllStockCabinet(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/root/project_root/inventory_cabinet`,
    data: params,
  });
}
/**
 * 机柜退库
 * @param {*} params
 * @returns
 */
export function withdrawalCabinet(resourceId, params) {
  return JSONFetch({
    method: 'put',
    url: `${baseUrl}/resource/cabinet/${resourceId}`,
    data: params,
  });
}
/**
 * 新增机柜
 * @param {*} params
 * @returns
 */
export function addCabinet(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/save/cabinet`,
    data: params,
  });
}

/**
 * 更新机柜
 * @param {*} resourceId
 * @param {*} params
 */
export function modifyCabinet(resourceId, params) {
  return JSONFetch({
    method: 'put',
    url: `${baseUrl}/resource/cabinet/${resourceId}`,
    data: params,
  });
}
/**
 * 删除机柜
 * @param {*} params
 * @returns
 */
export function delCabinet(moudelName, params) {
  return JSONFetch({
    method: 'delete',
    timeout: 1000000,
    url: `${baseUrl}/resource/${moudelName}`,
    data: params,
  });
}
/**
 * 移除机柜
 * @param {*} params
 * @returns
 */
export function removeCabinet(params) {
  return JSONFetch({
    method: 'delete',
    timeout: 1000000,
    url: `${baseUrl}/resource/removeCabinet`,
    data: params,
  });
}

/**
 * 获取本地用户组
 * @param {*} params
 * @returns
 */
export function getGroups(name, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/group/getGroups?name=${name}`,
    data: params,
  });
}
/**
 * 获取本地用户组信息
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getGroupInfo(id, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/group/getGroupInfo?groupId=${id}`,
    data: params,
  });
}
/**
 * 查询行方所有组
 * @param {*} params
 * @returns
 */
export function getOpccAllGroup(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/group/getOpccAllGroup`,
    data: params,
  });
}

/**
 * 保存用户组
 * @param {*} params
 * @returns
 */
export function getGroupUsers(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/group/getGroupUsers`,
    data: params,
  });
}
/**
 * 删除用户组
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function deleteGroup(id, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/group/deleteGroup?groupId=${id}`,
    data: params,
  });
}
/**
 * 查询组关联的用户
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function storeGroupInfos(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/group/storeGroupInfos`,
    data: params,
  });
}

/**
 * 查询组关联的角色
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getCurrentGroupRoles(id, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/group/getCurrentGroupRoles?groupId=${id}`,
    data: params,
  });
}
/**
 * 查询角色列表
 * @param {*} roleName
 * @param {*} params
 * @returns
 */
export function getAllRoles(roleName, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/group/getAllRoles?roleName=${roleName}`,
    data: params,
  });
}
/**
 * 保存组角色关联
 * @returns
 */
export function saveGroupRoles(params) {
  return JSONFetch({
    method: 'post',
    timeout: 1000000,
    url: `${user}/group/saveGroupRoles`,
    data: params,
  });
}
/**
 * 删除角色
 * @param {*} params
 * @returns
 */
export function delGroupRoles(params) {
  return JSONFetch({
    method: 'delete',
    timeout: 1000000,
    url: `${user}/group/deleteGroupRole`,
    data: params,
  });
}

/**
 * 校验动态属性的合法性
 * @param {*} params
 * @returns
 */
export function checkProperties(params) {
  return JSONFetch({
    method: 'post',
    timeout: 1000000,
    url: `${baseUrl}/field/checkProperties`,
    data: params,
  });
}
/**
 * 删除动态属性
 * @param {*} params
 * @returns
 */
export function delModule(id, params) {
  return JSONFetch({
    method: 'delete',
    timeout: 1000000,
    url: `${baseUrl}/field/delete/${id}`,
    data: params,
  });
}
/**
 * 新增和编辑动态属性
 * @param {*} params
 * @returns
 */
export function addOrModifyModule(params) {
  return JSONFetch({
    method: 'post',
    timeout: 1000000,
    url: `${baseUrl}/field/save`,
    data: params,
  });
}
/**
 * 获取模块的动态属性列表
 * @param {*} moduleName
 * @param {*} params
 * @returns
 */
export function getListByModule(moduleName, params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/field/getListByModule/${moduleName}`,
    data: params,
  });
}
/**
 * 获取列表字段
 * @param {*} url
 * @returns
 */
export function getResourceTableFileds(url, params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/field/getResourceTableFileds/${url}`,
    data: params,
  });
}
/**
 * 自定义高级查询查询接口
 * @param {*} url
 * @returns
 */
export function getAdvenceFileds(moduleName, params) {
  return JSONFetch({
    method: 'get',
    url: `${user}/custom/module/data/fields?moduleName=${moduleName}`,
    data: params,
  });
}

/**
 * 获取列表字段
 * @param {*} url
 * @returns [
  {
    id: 'wd32d32',
    modlueName: 'itDevice',
    userId: 1,
    fieldName: 'cabinet_type', // 字段名
    fieldDesc: '机柜类别', // 字段描述
    isShow: 1, // 是否展示0不展示，1展示，2默认
    sequence: 1, // 顺序
  },
];
 */
export function getTableFileds(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/custom/module/data/user/fields`,
    data: params,
  });
}
/**
 * 列表展示排序自定义更新接口
 * @param {*} url
 * @returns
 */
export function updateTableFileds(moduleName, userId, params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/custom/module/data/user/fields/update/${moduleName}/${userId}`,
    data: params,
  });
}

/**
 * 附件删除
 * @param {*} 附件id
 */
export function doDeleteAttachment(id) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/attachment/delete/${id}`,
  });
}

/**
 * 资源实例查询接口
 * @param {*} resourceId
 * @param {*} start
 * @param {*} end
 */
export function getResourceData(number, startTime, endTime, dataType = '3', type) {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/tsdb/orig/agg`,
    data: {
      startTime,
      endTime,
      number,
      dataType,
      spots: 'total_power',
      type,
    },
  });
}

/**
 * 资源实例查询接口
 * @param {*} resourceId
 * @param {*} start
 * @param {*} end
 */
export function getResourceDataFn(params) {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/tsdb/orig/agg`,
    data: params,
  });
}

// =======预布局======= //

export function layoutAfresh(params) {
  return JSONFetch({
    method: 'post',
    timeout: 1000000,
    url: `${baseUrl}/preplace/layout/afresh`,
    data: params,
  });
}
/**
 * 布局匹配
 * @param {*} params
 */
export function preplaceMatching(params, type, processKey) {
  return JSONFetch({
    method: 'post',
    timeout: 1000000,
    url: `${baseUrl}/preplace/${type}/matching/${processKey}`,
    data: params,
  });
}
/**
 * 获取布局进度
 * @param {processKey} 时间戳（唯一标识）
 */
export function matchingCountProcessGet(processKey, id) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/preplace/count/process/${processKey}/${id}`,
  });
}
/**
 * 布局校验（非独占）
 * @param {*} params
 */
export function validateLayout(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/preplace/layout/validate`,
    data: params,
  });
}
/**
 * 布局保存
 * @param {*} params
 */
export function preplaceSave(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/preplace/save`,
    timeout: 10000000,
    data: params,
  });
}

/**
 * 获取布局结果
 * @param {*} params
 */
export function matchingResultGet(id) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/preplace/matching/result/${id}`,
    timeout: 1000000,
  });
}

/**
 * 布局获取
 * @param {*} params
 */
export function preplaceGet(roomResourceId) {
  return JSONFetch({
    method: 'get',
    timeout: 1000000,
    url: `${baseUrl}/preplace/view/${roomResourceId}`,
  });
}

// =======数据字典查询======= //
/**
 * 获取数据字典列表
 * @param {*} params
 */
export function baseCodeList(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/baseCode/list`,
    data: params,
  });
}
/**
 * 获取网络区域编号
 * @param {*} params
 */
export function getCascaders(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/baseCode/getCascaders`,
    data: params,
  });
}

// =======设备分类======= //
/**
 * 获取设备分类
 * @param {*} params
 *{
  "parentId": 1,
   "level": 2
  }
 */
export function getDeviceTypeOrVendor(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/getDeviceTypeOrVendor`,
    data: params,
  });
}

/**
 * 资源实例查询接口
 */
export function getResource(className, resourceId, params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/resource/${className}/${resourceId}`,
    params,
  });
}

/**
 * 根据机房编号查询机柜位、机柜、设备
 */
export function getResourcebyRoomId(params) {
  return JSONFetch({
    method: 'get',
    url: `${southBaseUrl}/resource/getRoomChildByNumber`,
    params,
  });
}

/**
 * 根据机房编号查询配电柜
 */
export function getElectricCabList(number, params) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/resource/electricCabList?roomNumber=${number}`,
    params,
  });
}

/**
 * 资源子列表查询接口
 */
export function getSubResource(className, resourceId, subClass, data, params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/${className}/${resourceId}/${subClass}`,
    data,
    params,
  });
}
/**
 * 资源子列表查询接口
 */
export function getResourcesByParentId(parentId) {
  return JSONFetch({
    method: 'GET',
    url: `${baseUrl}/resource/getResourcesByParentId/${parentId}?_t=${new Date().getTime()}`,
  });
}
/**
 * 统一视图专用：资源子列表查询接口
 */
export function getResourcesByParentIdT(parentId) {
  return JSONFetch({
    method: 'GET',
    url: `${baseUrl}/resource/getResourcesByParentId/${parentId}?display=true&_t=${new Date().getTime()}`,
  });
}

/**
 * 获取电力统计信息
 */
export function getPower(className, resourceId) {
  return JSONFetch({
    method: 'GET',
    url: `${baseUrl}/overview/statistics/power/${className}/${resourceId}?_t=${new Date().getTime()}`,
  });
}

/**
 * 获取模块ups信息
 */
export function getRoomUps(roomId) {
  return JSONFetch({
    method: 'GET',
    url: `${baseUrl}/ups/list/${roomId}?_t=${new Date().getTime()}`,
  });
}

// =======设备配置模型======= //
/**
 * 获取所有设备模型
 * @param {*} params
 */
export function deviceModelsAll(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deviceModels/list`,
    data: params,
  });
}

/**
 * 添加设备模型
 * @param {*} params
 */
export function deviceModelsAdd(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deviceModels`,
    data: params,
  });
}

/**
 * 更新设备模型
 * @param {*} params
 */
export function deviceModelsEdit(params) {
  return JSONFetch({
    method: 'put',
    url: `${baseUrl}/deviceModels`,
    data: params,
  });
}

/**
 * 获取设备模型
 * @param {*} id 模型id
 */
export function deviceModelsGet(id) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/deviceModels/${id}`,
  });
}

/**
 * 模型模板下载
 * @param {*} id 模型id
 */
export function deviceModelsDownload() {
  return JSONFetch({
    method: 'get',
    url: deviceModelsDownloadAction,
  });
}

/**
 * 导出全部模型
 */
export function deviceModelsExportAll() {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deviceModels/export/all`,
  });
}

/**
 * 导出选中模型
 * @param {*} params {ids: id1,id2}
 */
export function deviceModelsExportSelected(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deviceModels/export`,
    data: params,
  });
}

/**
 * 删除选中模型
 * @param {*} params {ids: id1,id2}
 */
export function deviceModelsDelete(params) {
  return JSONFetch({
    method: 'delete',
    url: `${baseUrl}/deviceModels`,
    data: params,
  });
}

// =======机柜配置模型======= //
/**
 * 添加机柜模型
 * @param {*} params
 */
export function cabinetModelsAdd(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/cabinetModels`,
    data: params,
  });
}

/**
 * 更新机柜模型
 * @param {*} params
 */
export function cabinetModelsEdit(params) {
  return JSONFetch({
    method: 'put',
    url: `${baseUrl}/cabinetModels`,
    data: params,
  });
}

/**
 * 获取所有机柜模型
 * @param {*} params
 */
export function cabinetModelsAll(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/cabinetModels/list`,
    data: params,
  });
}

/**
 * 获取机柜模型
 * @param {*} id 模型id
 */
export function cabinetModelsGet(id) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/cabinetModels/${id}`,
  });
}

/**
 * 智能布局模板下载
 * @param {*} id 模型id
 */
export function layoutModelsDownload() {
  return JSONFetch({
    method: 'get',
    url: layoutModelsDownloadAction,
  });
}
/**
 * 机柜模板下载
 * @param {*} id 模型id
 */
export function cabinetModelsDownload() {
  return JSONFetch({
    method: 'get',
    url: cabinetModelsDownloadAction,
  });
}

/**
 * 导出全部机柜模型
 */
export function cabinetModelsExportAll() {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/cabinetModels/export/all`,
  });
}

/**
 * 导出选中机柜模型
 * @param {*} params {ids: id1,id2}
 */
export function cabinetModelsExportSelected(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/cabinetModels/export`,
    data: params,
  });
}

/**
 * 删除选中机柜模型
 * @param {*} params {ids: id1,id2}
 */
export function cabinetModelsDelete(params) {
  return JSONFetch({
    method: 'delete',
    url: `${baseUrl}/cabinetModels`,
    data: params,
  });
}

// =======IT设备部署模型======= //
/**
 * 添加IT设备部署模型
 * @param {*} params
 */
export function deploymentModelsAdd(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deploymentModels`,
    data: params,
  });
}

/**
 * 更新IT设备部署模型
 * @param {*} params
 */
export function deploymentModelsEdit(params) {
  return JSONFetch({
    method: 'put',
    url: `${baseUrl}/deploymentModels`,
    data: params,
  });
}

/**
 * 获取所有IT设备部署模型
 * @param {*} params
 */
export function deploymentModelsAll(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deploymentModels/list`,
    data: params,
  });
}

/**
 * 获取IT设备部署模型
 * @param {*} id 模型id
 */
export function deploymentModelsGet(id) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/deploymentModels/${id}`,
  });
}

/**
 * IT设备部署模板下载
 * @param {*} id 模型id
 */
export function deploymentModelsDownload() {
  return JSONFetch({
    method: 'get',
    url: deploymentModelsDownloadAction,
  });
}

/**
 * 导出全部IT设备部署模型
 */
export function deploymentModelsExportAll() {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deploymentModels/export/all`,
  });
}

/**
 * 导出选中IT设备部署模型
 * @param {*} params {ids: id1,id2}
 */
export function deploymentModelsExportSelected(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/deploymentModels/export`,
    data: params,
  });
}

/**
 * 删除选中IT设备部署模型
 * @param {*} params {ids: id1,id2}
 */
export function deploymentModelsDelete(params) {
  return JSONFetch({
    method: 'delete',
    url: `${baseUrl}/deploymentModels`,
    data: params,
  });
}

// =======智能布局======= //

/**
 * 导出全部数据
 * @param {*} params
 * @param {*} restParams
 */
export function modelsExportAll(params, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(EXPORT_ALL, restParams),
    data: params,
  });
}

/**
 * 导出选中数据
 * @param {*} params
 * @param {*} restParams
 */
export function modelsExport(params, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(EXPORT_SELECT, restParams),
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
 * 获取资源实时数据
 * @param {*} param
 * @param {*} restParams
 */
export function resourceRealTime(param, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(resourceRealTimeAction, restParams),
    data: param,
  });
}
/**
 * 获取资源实时数据
 * @param {*} param
 * @param {*} restParams
 */
export function changeUStatus(param, restParams) {
  return JSONFetch({
    method: 'post',
    url: parseRestParams(changeUStatusAction, restParams),
    data: param,
  });
}

/**
 * 获取数据字典（树状结构）
 * @param {*} params
 */
export function getCascader(key) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/baseCode/getCascader/${key}`,
  });
}

/**
 * 获取树状空间数据
 * @param {*} param
 * @param {*} restParams
 */
export function getResourceTree(param, restParams) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/resource/getResourceTree`,
    data: param,
  });
}

/**
 * 监控点数据展示
 * @param {*} params
 */
export function getRobotInspectDatas(params) {
  let url = `${baseUrl}/robot/inspectDatas`;
  return JSONFetch({
    method: 'post',
    url: parseRestParams(url),
    data: params,
  });
}

/**
 * 获取机器人状态
 * @param {*} params
 */
export function getRobotInfo(params) {
  let url = `${baseUrl}/robot/robotInfo`;
  return JSONFetch({
    method: 'post',
    url: parseRestParams(url),
    data: params,
  });
}

/**
 * 获取机器人 巡检路线
 * @param {*} params
 */
export function getInspectPoints(params) {
  let url = `${baseUrl}/robot/inspectPoints`;
  return JSONFetch({
    method: 'post',
    url: parseRestParams(url),
    data: params,
  });
}
/* ----------------------------------------------------机柜视图---------------------------------------------------------------*/
/**
 * 获取网络区域编号总览列表
 * @param {*}
 */
export function getNetworkAreaList(name) {
  return JSONFetch({
    method: 'get',
    url: `${baseUrl}/intelligentLayout/getNetworkAreaList?key=${name}`,
  });
}

/**
 * 获取网络区域编号总览字典项
 * @param {*}
 */
export function getNetworkAreaDictionary(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/baseCode/getCascaders`,
    data: params,
  });
}

/**
 * 获取机柜表头位置信息
 * @param {*} params
 */
export function getPositionInformation(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/intelligentLayout/getPositionInformation`,
    data: params,
  });
}

/**
 * 获取模块信息
 * @param {*} params
 */
export function getModularInformation(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/intelligentLayout/getModularInformation`,
    data: params,
  });
}

/**
 * 获取模块中间信息
 * @param {*} params
 */
export function getResourcesInfo(params) {
  return JSONFetch({
    method: 'post',
    url: `${baseUrl}/intelligentLayout/getResourcesInfo`,
    data: params,
  });
}

/**
 * 应用系统信息
 * @param {*} params
 * @returns
 */
export function getInfoByApp(params) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/intelligentLayout/getInfoByApp`,
    data: params,
  });
}

/**
 * 【机房可视化】机柜退库校验
 * @param {*} params
 * @returns
 */
export function validWithdraw(params) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/resource/validWithdraw`,
    data: params,
  });
}

/**
 * 【机房可视化】上架库存机柜校验
 * @param {*} params
 * @returns
 */
export function validShelfCabinet(params) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/resource/validShelfCabinet`,
    data: params,
  });
}

/**
 * 【机房可视化】添加机柜校验
 * @param {*} params
 * @returns
 */
export function validCabinet(params) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/resource/validCabinet`,
    data: params,
  });
}

/**
 * 【机房可视化】添加配电柜校验
 * @param {*} params
 * @returns
 */
export function validElectricCabinet(params) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/resource/validElectricCabinet`,
    data: params,
  });
}

/**
 * 【机房可视化】保存
 * @param {*} params
 * @returns
 */
export function saveRoomVisual(params, number) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/resource/saveRoomVisual/${number}`,
    data: params,
  });
}

/**
 * 【机房可视化】获取机房数据
 * @param {*} params
 */
export function roomVisual(params) {
  return JSONFetch({
    method: 'POST',
    url: `${baseUrl}/resource/roomVisual`,
    data: params,
  });
}

/**
 * 获取角色数据权限
 * @param {*} params
 * {
 *	"module": “resource_park”,
 *	"roleId": “2”
 * }
 * @returns
 */
export function getModuleDataPermission(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/data_permission/addModuleDataPermission`,
    data: params,
  });
}
/**
 * 获取角色数据权限
 * @param {*} params
 * {
 *	"module": “resource_park”,
 *	"roleId": “2”
 * }
 * @returns
 */
export function getDataPermission(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/data_permission/getDataPermission`,
    data: params,
  });
}

/**
 * 保存角色数据权限
 * @param {*} params
 * @returns
 */
export function saveDataPermission(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/data_permission/saveDataPermission`,
    data: params,
  });
}

/**
 * 复制角色数据权限
 * @param {*} params
 * {
 *	"oldRoleId": '2',
 *  "newRoleId": '4,5',
 *	"module": 'resource_park'
 * }
 * @returns
 */
export function copyDataPermission(params) {
  return JSONFetch({
    method: 'post',
    url: `${user}/data_permission/copyDataPermission`,
    data: params,
  });
}

/**
 * 获取公告接口
 * @param {*} userId
 * @returns
 */
export function getAnnounceMent(userId) {
  return JSONFetch({
    method: 'get',
    url: `${user}/launch/announcement/list/${userId}`,
  });
}

/**
 * 获取变更状态接口
 * @param {*} userId
 * @returns
 */
export function getChangeStatus(userId) {
  return JSONFetch({
    method: 'get',
    url: `${user}/system/change/current/status`,
  });
}
