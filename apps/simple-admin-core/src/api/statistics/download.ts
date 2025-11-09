import type { BaseDataResp } from '#/api/model/baseModel';

import { requestClient } from '#/api/request';

// GrowthData {
//         Downloads int64 `json:"downloads"` // 下载数
//         Visits int64 `json:"visits"` // 详情页面访问数
//         Links int64 `json:"links"` // 产生链接数
//         ConversionRate float32 `json:"conversionRate"`
//         ActiveCustomers int64 `json:"activeCustomers"` // 活跃客服数
//         Pvs int64 `json:"pvs"` // pv数 页面的总访问量
//         Uvs int64 `json:"uvs"` // uv数 独立用户数量
//     }
// 下载统计概览数据接口
export interface DownloadOverviewData {
  currentData: {
    activeCustomers: number; // 活跃客户数
    conversionRate: number; // 转化率
    downloads: number; // 总下载量
    links: number; // 产生链接数
    pvs: number; // pv数 页面的总访问量
    uvs: number; // uv数 独立用户数量
    visits: number; // 总访问量
  };
  prevData: {
    activeCustomers: number; // 活跃客户数
    conversionRate: number; // 转化率
    downloads: number; // 总下载量
    links: number; // 产生链接数
    pvs: number; // pv数 页面的总访问量
    uvs: number; // uv数 独立用户数量
    visits: number; // 总访问量
  };
}

// 下载趋势数据接口
export interface DownloadTrendData {
  dates: string[]; // 日期数组
  downloadData: number[]; // 下载量数据
  visitData: number[]; // 访问量数据
}

// 统计查询参数接口
export interface DownloadStatisticsParams {
  days: number; // 时间范围
  userId: string; // 客服人员
}

// PromotionInfo {
//         PromotionCode string `json:"userId"` //
//         PromotionName string `json:"userName"`
//         Downloads int64 `json:"downloads"` // 下载数
//         Visits int64 `json:"visits"` // 详情页面访问数
//         Links int64 `json:"links"` // 产生链接数
//         ConversionRate float32 `json:"conversionRate"` // 转化率
//     }
export interface PromotionInfoData {
  data: PromotionInfo[]; // 推广员数据数组
}
export interface PromotionInfo {
  userId: string; // 推广码
  userName: string; // 推广员名称
  downloads: number; // 下载数
  visits: number; // 详情页面访问数
  links: number; // 产生链接数
  conversionRate: number; // 转化率
}

// API接口路径枚举
const Api = {
  GetDownloadOverview: '/sys-api/statistics/overview', // 获取统计概览数据
  GetDownloadTrend: '/sys-api/statistics/download/trend', // 获取下载趋势图表数据
  GetPromoterData: '/sys-api/statistics/promotion/list', // 获取推广员推广数据
};

// 获取下载统计概览数据
export const getDownloadOverview = (params: DownloadStatisticsParams) => {
  return requestClient.post<BaseDataResp<DownloadOverviewData>>(
    Api.GetDownloadOverview,
    params,
  );
};

// 获取下载趋势图表数据
export const getDownloadTrend = (params: DownloadStatisticsParams) => {
  return requestClient.post<BaseDataResp<DownloadTrendData>>(
    Api.GetDownloadTrend,
    params,
  );
};

export const getPromoterData = (params: DownloadStatisticsParams) => {
  return requestClient.post<BaseDataResp<PromotionInfo[]>>(
    Api.GetPromoterData,
    params,
  );
};
