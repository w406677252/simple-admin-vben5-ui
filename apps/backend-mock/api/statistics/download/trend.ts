import { eventHandler, getQuery } from 'h3';
// 暂时注释掉权限验证，使用简单的实现
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

  // 根据时间范围确定天数
  const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;

  const dates: string[] = [];
  const downloadData: number[] = [];
  const visitData: number[] = [];

  // 生成日期和对应的数据
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // 格式化日期为 MM-DD
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dates.push(`${month}-${day}`);

    // 生成有趋势的模拟数据
    const baseDownload = 200;
    const baseVisit = 600;
    const trendFactor = (days - i) / days;
    const randomFactor = 0.8 + Math.random() * 0.4;

    // 确保数据有增长趋势，但也有日常波动
    const downloadValue = Math.floor(
      baseDownload * randomFactor * (1 + trendFactor * 0.5),
    );
    const visitValue = Math.floor(
      baseVisit * randomFactor * (1 + trendFactor * 0.5),
    );

    downloadData.push(downloadValue);
    visitData.push(visitValue);
  }

  // 返回模拟的成功响应
  return {
    code: 0,
    msg: 'success',
    data: {
      dates,
      downloadData,
      visitData,
    },
  };
});
