/*
 * @Author: liangchaoshun
 * @Email: liangchaoshun@xbrother.com
 * @Date: 2021-03-11 15:35:19
 * @LastEditors: liangchaoshun
 * @LastEditTime: 2021-04-14 11:18:19
 * @Description: 概览页面相关请求
 */

/* eslint-disable @typescript-eslint/camelcase */

// 接口文档地址：http://yapi.yanfa.xbrother.com/project/366/interface/api

const baseUrl = '/api/v1/xaidc/resource';
const southBaseUrl = '/das/api';

import { JSONFetch } from './CommonFetch';
import { ResType, TrendType, ResourceClassType } from '@/types/overview';

// 获取节点信息
export const getNodeInfo = (rid?: string) => {
  return JSONFetch.get<ResType>(
    `${baseUrl}/resource/dc/${rid === undefined ? 'project_root' : rid}`
  );
};

// 获取子节点信息
export const getSubNodesInfo = (rid: string) => {
  return JSONFetch.get<ResType>(
    `${baseUrl}/resource/getResourcesByParentId/${rid}`
  );
};

// 获取模块使用率趋势图
export const getTrend1 = (
  rid: string,
  type: ResourceClassType,
  timeType?: TrendType
) =>
  JSONFetch.get<ResType>(
    `${baseUrl}/overview/trend/${type}/${rid}/${timeType || 'halfYear'}`
  );

/**
 * 资源实例查询接口
 * @param {*} resourceId
 * @param {*} start
 * @param {*} end
 */
export const getTrend = (
  resourceId: string,
  dataType = '6',
  timeType?: TrendType
) => {
  return JSONFetch({
    method: 'post',
    url: `${southBaseUrl}/tsdb/orig/getLineChar`,
    data: {
      resourceId,
      dataType,
      timeType,
    },
  });
};

// 获取资源匹配度
export const getMatching = (rid: string, type: ResourceClassType) =>
  JSONFetch.get<ResType>(`${baseUrl}/overview/matching/${type}/${rid}`);

// 获取机柜统计
export const getCabinetStatistics = (rid: string, type: ResourceClassType) =>
  JSONFetch.get<ResType>(
    `${baseUrl}/overview/statistics/cabinet/${type}/${rid}`
  );

// 获取电力统计
export const getPowerStatistics = (rid: string, type: ResourceClassType) =>
  JSONFetch.get<ResType>(`${baseUrl}/overview/statistics/power/${type}/${rid}`);

// 获取预布局 Top5
export const getPreLayoutTop5 = (rid: string, type: ResourceClassType) =>
  JSONFetch.get<ResType>(`${baseUrl}/overview/preplace/layout/${type}/${rid}`);

// 获取资源子列表
export const getResourceList = (
  rid: string,
  type: ResourceClassType,
  location: string,
  subclass?: ResourceClassType
) => {
  const data = {
    where: [
      {
        terms: [
          {
            field: 'location',
            operator: 'eq',
            value: `${location}/${rid}`,
          },
        ],
      },
      {
        terms: [
          {
            field: 'location',
            operator: 'like',
            value: `${location}/${rid}/%`,
          },
        ],
      },
    ],
    sorts: [],
    page: {
      number: 1,
      size: 10,
    },
  };
  return JSONFetch({
    url: `${baseUrl}/resource/${type}/${rid}/${subclass || 'building'}`,
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data,
  });
};

// 概览盘点准确率变化
export const buildingAccuracy = (resourceId: string) =>
  JSONFetch.post<ResType>(`${baseUrl}/buildingAccuracy?resourceId=${resourceId}`);

//