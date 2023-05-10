export const PROPERTY_TYPE = {
  INPUT: 0, // 文本框
  TIMEER: 1, // 日期
  SELECT: 2, // 下拉
  RADIO: 3, // 单选框
  CHECKBOX: 4, // 复选框
};

// 接口请求状态
export const REQUEST_STATUS_CODE = {
  SUCCESS: 200, // 成功
  SERVER_ERROR: 500, // 服务异常
  CHECK_ERROR: 400, // 校验失败
};
// 模型状态
export const configModelStatus = {
  NOT_USET: 1, // 未使用
  IN_USED: 2, // 使用中
  STOP_USED: 0, // 停用
};
// 资源机柜状态
export const cabinetLayoutStatus = {
  using: '1', // 启用（已启用）
  unEnabled: '2', // 布局未启用
  preLayout: '3', // 预布局（未布局）
  layouting: '5', // 布局中（编辑时，临时状态）
};

// 机柜是否独占
export const CABINET_IS_ALONE = {
  YES: '1', // 独占
  NO: '0', // 非独占
};

// 机柜是否独占
export const CABINET_PRIORITY = {
  EMPTY: '1', // 空机柜
  NOT_EMPTY: '0', // 非空机柜
};

// 机房状态
export const roomsStatus = {
  ROOM_LAYOUT_STATUS_ALL: '-1', // 全部
  ROOM_LAYOUT_STATUS_NOT_INIT: '0', // 未初始化
  ROOM_LAYOUT_STATUS_NOT_LAYOUT: '1', // 未布局
  ROOM_LAYOUT_STATUS_PART_LAYOUT: '2', // 部分布局
  ROOM_LAYOUT_STATUS_LAYOUT: '3', // 已布局
};

// 区域 spaceType
export const spaceType = {
  AREA: 1, // 区域
  PARK: 2, // 园区
  BUILDING: 3, // 楼座
  FLOOR: 4, // 楼层
  ROOM: 5, // 模块
  ROW: 6, // 机柜列
  SITE: 7, // 机柜位
  RACK: 8, // 机柜空间
  U: 9, // U位
};

// 设备分类：大型机、小型机、机架服务器、网络、存储、安全、其他
export const DEVICE_TYPE_KEYS = {
  DT_servers: 'DT_servers',
  DT_mainframe: 'DT_mainframe',
  DT_minicomputer: 'DT_minicomputer',
  DT_network: 'DT_network',
  DT_storage: 'DT_storage',
  DT_security: 'DT_security',
  DT_other: 'DT_other',
};
// 机柜类型: 服务器机柜、网络机柜、存储机柜
export const CABINET_TYPE_KEYS = {
  servers: '服务器机柜',
  network: '网络机柜',
  storage: '存储机柜',
};

// 模型名称、编号特殊字符校验
export const PATTERN_STR = /^[0-9a-zA-Z#-+$*,._-\s]+$/;

// 名称校验(可输入汉字)
export const PATTERN_STR1 = /^[0-9a-zA-Z._+#$*,()\u4e00-\u9fa5\s-]+$/;

// 模型状态转换
export function formatterStatus(cellValue) {
  let result = '';
  switch (cellValue) {
    case configModelStatus.IN_USED:
      result = '使用中';
      break;
    case configModelStatus.NOT_USET:
      result = '未使用';
      break;
    case configModelStatus.STOP_USED:
      result = '停用';
      break;
    default:
      break;
  }
  return result;
}

// 把智能布局里面的园区顺序也按照，稻香湖、洋桥、武汉、花木的顺序修改排序
export function sortFn(data = []) {
  data.forEach(d => {
    switch (d.number) {
      case 'DX':
        d.sort_index = 0;
        break;
      case 'YQ':
        d.sort_index = 1;
        break;
      case 'WH':
        d.sort_index = 2;
        break;
      case 'HM':
        d.sort_index = 3;
        break;
      default:
        break;
    }
  });
  data.sort((a, b) => a.sort_index - b.sort_index);
}

// 资源信息-机柜状态
export const CABINET_STATUS = {
  0: '未初始化',
  1: '启用',
  2: '预布局',
  3: '未布局',
  4: '预留',
  6: '库存中',
};

export const SPACE_INFO = {
  name: '',
  number: '',
  location: '',
  spaceType: '',
  responsibleDepartment: '',
  responsiblePerson: '',
  builtUpArea: '',
  area: '',
  roomDensity: '',
  roomModulesCount: '',
  parkProductionTime: '',
  designStandards: '',
  designPueValue: '',
  description: '',
  display: '',
  status: '',
  designCabinetNum: '',
  pcserverNum: '',
  networkNum: '',
  storageNum: '',
  otherNum: '',
  cabinetCapacity: '',
  cabinetUsed: '',
  cabinetFree: '',
  cabinetPreplace: '',
  plannedCabinet: '',
  notPlannedCabinet: '',
  powerCapacity: '',
  powerUsed: '',
  powerFree: '',
  powerPreplace: '',
  uCapacity: '',
  uUsed: '',
  uFree: '',
  uPreplace: '',
  uReserved: '',
  siteTotalNum: '',
  siteCapacity: '',
  siteUsed: '',
  siteFree: '',
  pduCapacity: '',
  pduUsed: '',
  pduFree: '',
  routingModel: '',
  networkArea: '',
  orderNum: '',
  moduleUsag: '',
  techType: '',
  deviceAvgTime: '',
  safeStartTime: '',
  extField: {},
  installedCapacity: '',
  safetyCapacity: '',
  networkAreaNumber: '',
  clusterName: '',
  clusterType: '',
  compCname: '',
  compEname: '',
  subsystemName: '',
  applicationName: '',
  isProduce: '',
  appManageDept: '',
  appManagerAname: '',
  appManagerBname: '',
  carbonEmissions: '',
};

export const DETAIL_INFO = {
  serialNumber: '',
  name: '',
  hostname: '',
  deviceModel: '',
  deviceType: '',
  deviceTypeNumber: '',
  deviceVendor: '',
  deviceModelNumber: '',
  deviceorigin: '',
  deviceOriginDescription: '',
  machineRoom: '',
  electricCabinet: '',
  domainCode: '',
  configDescription: '',
  cardNumber: '',
  deviceLocation: '',
  cabinetNumber: '',
  managementUnit: '',
  stockLocation: '',
  stockLocationNumber: '',
  logicalStatus: '',
  physicalStatus: '',
  isActive: '',
  createTime: '',
  updateTime: '',
  inRules: '',
  electricCurrent: '',
  config: '',
  iloMgmtIp: '',
  prdIp: '',
  opticalPorts: '',
  electricPorts: '',
  configNumber: '',
  installLog: '',
  installMode: '',
  installType: '',
  power: '',
  voltage: '',
  weight: '',
  powerSource: '',
  powerSupplyMode: '',
  powerConnection: '',
  powerNumbers: '',
  uheight: '',
  uPosition: '',
  uposition: '',
  slotNum: '',
  relFrame: '',
  slotCount: '',
  contractNumber: '',
  contractItemNumber: '',
  businessStatus: '',
  budgetApprovalNumber: '',
  integrator: '',
  integratorNumber: '',
  maintenanceEndTime: '',
  maintenanceProvider: '',
  maintenanceStartTime: '',
  maintenanceStatus: '',
  administrator: '',
  managementDept: '',
  responsibilityCenter: '',
  responsibilityCenterNumber: '',
  responsibilityDept: '',
  responsibilityDeptNumber: '',
  personLiable: '',
  personLiableUass: '',
  user: '',
  userDept: '',
  userUass: '',
  userUnit: '',
  arriveTime: '',
  offShelfTime: '',
  onShelfTime: '',
  powerOffTime: '',
  powerOnAcceptTime: '',
  powerOnTime: '',
  subsystemCode: '',
  subsystemShortName: '',
  technologyStack: '',
  resourcePool: '',
  compCname: '',
  compEname: '',
  applicationName: '',
  park: '',
  slaveCabinet: '',
};

// 机柜位类型
export const SPACE_TYPE = {
  JG: 1, // 机柜位
  ZZ: 2, // 柱子位
  PDG: 3, // 配电柜
};

// 机柜位状态
export const SPACE_STATUS = {
  FREE: 1, // 空闲
  USED: 2, // 占用
  BEYOND: 3, // 容量超出剩余容量
  PRE_PLACE: 4, // 预占
  DISABLED: 5, // 禁用(柱子)
  HIGH_DETECTION: 6, // 高度检测
  INVENTORY_ON_SHELF: 7, // 库存在架
  RESERVED: 8, // 已预留
  DISTRIBUTION: 9, // 已分配
};
export const MODUL_NAME = {
  park: '园区',
  building: '楼栋',
  floor: '楼层',
  room: '模块',
  row: '机柜列',
  cabinet: '机柜',
  posCabinet: '机柜',
  electric_cabinet: '配电柜',
  inventory_cabinet: '库存机柜',
  itDevice: 'it设备',
  vmDevice: '虚拟机',
  posDevice: '物联定位it设备',
  subSystem: '物理子系统',
};

// 资源信息 按钮操作权限
export function resourceOperPermission(permissionData, classKey, operKey) {
  // fix：---------------------------------------------------↓，这有个 s
  return permissionData[`smartLayout:resourceInfo:${classKey}s:${operKey}`];
}

// 资源信息 按钮操作权限
export function modelOperPermission(permissionData, classKey, operKey) {
  return permissionData[`smartLayout:config:${classKey}:${operKey}`];
}

// 资源信息 按钮操作权限
export function idDeviceOperPermission(permissionData, classKey, operKey) {
  return permissionData[`smartLayout:resourceInfo:${classKey}:${operKey}`];
}

// 资源信息 定位操作权限
export function buildOperPermission(permissionData, classKey, operKey) {
  return permissionData[`dcom:assetsManager:assetsOverview:${classKey}:${operKey}`];
}

// 资源信息 IT设备操作权限
export function ITOperPermission(permissionData, operKey) {
  return permissionData[`dcom:assetsManager:assetsOverview:${operKey}`];
}

// 报表管理pue、碳排放操作权限
export function reportOperPermission(permissionData, operKey) {
  return permissionData[`smartLayout:${operKey}`];
}
