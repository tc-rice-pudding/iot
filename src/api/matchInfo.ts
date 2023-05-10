/* eslint-disable @typescript-eslint/camelcase */
import { JSONFetch } from './CommonFetch';
const user = process.env.NODE_ENV === 'development' ? '/niemp/system' : '/niemp/system';

// 获取机器信息列表
export const getMachine = () => JSONFetch({ method: 'get', url: `${user}/nodes` });
// 获取操作日志列表
export const getOperaLog = () => JSONFetch({ method: 'get', url: `${user}/logs` });
export const offLine = (ip: string) => JSONFetch({ method: 'post', url: `${user}/offLine`, data: { ip } });
export const onLine = (ip: string) => JSONFetch({ method: 'post', url: `${user}/onLine`, data: { ip } });

export const login = (loginInfo: { ip: string; port: string; user: string; password: string }) => JSONFetch({ method: 'post', url: `${user}/login`, data: loginInfo });
