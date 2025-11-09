import { eventHandler, getQuery } from 'h3';
// 简化实现，暂时注释掉权限验证
// import { verifyAccessToken } from '~/utils/jwt-utils';
// import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  // 简化的用户验证
  // const userinfo = verifyAccessToken(event);
  // if (!userinfo) {
  //   return unAuthorizedResponse(event);
  // }

  // 获取查询参数
  const { timeRange = '7days', _customerService = 'all' } = getQuery(event);

  // 模拟数据生成
  const baseDownloads = 1200;
  const baseVisits = 3600;
  const baseConversion = 33;
  const baseCustomers = 45;
  const baseConnections = 180;

  // 根据时间范围调整数据
  let multiplier = 1;
  if (timeRange === '30days') {
    multiplier = 4;
  } else if (timeRange === '90days') {
    multiplier = 12;
  }

  // 模拟增长数据
  const growthDownloads = (Math.random() * 10 - 2).toFixed(1);
  const growthVisits = (Math.random() * 8 - 1).toFixed(1);
  const growthConversion = (Math.random() * 3 - 0.5).toFixed(1);

  // 模拟客服人员筛选的影响
  let serviceMultiplier = 1;
  if (_customerService !== 'all') {
    serviceMultiplier = 0.3 + Math.random() * 0.4;
  }

  // 计算转换率
  const conversionRateValue = baseConversion * (1 + parseFloat(growthConversion) / 100);

  // 返回模拟的成功响应
  return {
    code: 0,
    msg: 'success',
    data: {
      totalDownloads: Math.floor(baseDownloads * multiplier * serviceMultiplier),
      totalVisits: Math.floor(baseVisits * multiplier * serviceMultiplier),
      conversionRate: `${conversionRateValue.toFixed(1)}%`,
      activeCustomers: Math.floor(baseCustomers * serviceMultiplier),
      totalCustomerConnections: Math.floor(baseConnections * multiplier * serviceMultiplier),
      growth: {
        downloads: `${parseFloat(growthDownloads) > 0 ? '+' : ''}${growthDownloads}%`,
        visits: `${parseFloat(growthVisits) > 0 ? '+' : ''}${growthVisits}%`,
        conversion: `${parseFloat(growthConversion) > 0 ? '+' : ''}${growthConversion}%`,
      },
    },
  };
});