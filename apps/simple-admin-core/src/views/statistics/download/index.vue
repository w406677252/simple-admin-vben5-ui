<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { EchartsUIType } from '@vben/plugins/echarts';

import type {
  DownloadOverviewData,
  DownloadStatisticsParams,
  PromotionInfo,
} from '#/api/statistics/download';

import { onMounted, ref } from 'vue';

import { AnalysisOverview } from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Button, Card, Select, SelectOption } from 'ant-design-vue';

import {
  getDownloadOverview,
  getDownloadTrend,
  getPromoterData,
} from '#/api/statistics/download';

// 筛选器数据
const customerService = ref('');
const timeRange = ref(7);

// 客服列表数据
const customerServiceList = ref<PromotionInfo[]>([]);

// 加载客服列表
const loadCustomerServiceList = async () => {
  try {
    const params: DownloadStatisticsParams = {
      days: 7, // 使用默认时间范围（已经是数字类型）
      userId: '', // 不指定具体客服，获取所有
    };
    const res = await getPromoterData(params);
    if (res.code === 0 && res.data) {
      customerServiceList.value = res.data;
      promoterData.value = res.data || [];
    }
  } catch (error) {
    console.error('加载客服列表失败:', error);
  }
};

// 加载状态
const loading = ref(false);

// 统计数据
const statisticsData = ref<DownloadOverviewData>({
  currentData: {
    activeCustomers: 0,
    conversionRate: 0,
    downloads: 0,
    links: 0,
    pvs: 0,
    uvs: 0,
    visits: 0,
  },
  prevData: {
    activeCustomers: 0,
    conversionRate: 0,
    downloads: 0,
    links: 0,
    pvs: 0,
    uvs: 0,
    visits: 0,
  },
});

// 构建概览项目数据
const overviewItems = ref<AnalysisOverviewItem[]>([
  {
    icon: SvgDownloadIcon,
    title: '总下载量',
    totalTitle: '总下载量',
    totalValue: 0,
    value: 0,
    changeRate: '+0%',
  },
  {
    icon: SvgBellIcon,
    title: '总访问量',
    totalTitle: '总访问量',
    totalValue: 0,
    value: 0,
    changeRate: '+0%',
  },
  {
    icon: SvgCakeIcon,
    title: '转化率',
    totalTitle: '转化率',
    totalValue: 0,
    value: 0,
    changeRate: '+0%',
  },
  {
    icon: SvgCardIcon,
    title: '活跃客服',
    totalTitle: '活跃客服',
    totalValue: 0,
    value: 0,
    changeRate: '+0%',
  },
]);

// 保存图表数据的状态
interface ChartData {
  xAxisData: string[];
  defaultDownloadData: number[];
  defaultVisitData: number[];
  days: number;
  hasData: boolean;
}

const chartData = ref<ChartData>({
  xAxisData: [],
  defaultDownloadData: [],
  defaultVisitData: [],
  days: 7,
  hasData: false,
});

// 客服业绩数据
const promoterData = ref<PromotionInfo[]>([]);

// 客服业绩数据使用vxe-grid的声明式配置，不再需要配置数组

// 图表引用
const downloadChartRef = ref<EchartsUIType>();
const visitChartRef = ref<EchartsUIType>();
const { renderEcharts: renderDownloadChart } = useEcharts(downloadChartRef);
const { renderEcharts: renderVisitChart } = useEcharts(visitChartRef);

// 更新概览数据
const updateOverviewData = (data: DownloadOverviewData) => {
  statisticsData.value = data;

  const rateValue = Number(
    data.currentData.conversionRate - data.prevData.conversionRate,
  );
  // 更新概览项目
  overviewItems.value = [
    {
      icon: SvgDownloadIcon,
      title: '周期下载量',
      totalTitle: '上个周期下载量',
      totalValue: data.prevData.downloads,
      value: data.currentData.downloads,
      changeRate: `
        ${
          data.currentData.downloads === data.prevData.downloads
            ? '0'
            : (data.currentData.downloads - data.prevData.downloads > 0
                ? '+'
                : '-') +
              Math.abs(data.currentData.downloads - data.prevData.downloads)
        }`,
    },
    {
      icon: SvgCakeIcon,
      title: '周期转化率',
      totalTitle: '上个周期转化率',
      totalValue: Number(data.prevData.conversionRate).toFixed(2),
      value: Number(data.currentData.conversionRate).toFixed(2),
      changeRate: `
        ${
          rateValue === 0
            ? 0
            : (rateValue > 0 ? '+' : '-') + Number(rateValue).toFixed(2)
        }%`,
      isPercent: true,
    },
    {
      icon: SvgBellIcon,
      title: '周期PV',
      totalTitle: '上个周期PV',
      totalValue: data.prevData.pvs,
      value: data.currentData.pvs,
      changeRate: `
        ${
          data.currentData.pvs === data.prevData.pvs
            ? '0'
            : (data.currentData.pvs - data.prevData.pvs > 0 ? '+' : '-') +
              Math.abs(data.currentData.pvs - data.prevData.pvs)
        }`,
    },
    {
      icon: SvgCardIcon,
      title: '周期UV',
      totalTitle: '上个周期UV',
      totalValue: data.prevData.uvs,
      value: data.currentData.uvs,
      changeRate: `
        ${
          data.currentData.uvs === data.prevData.uvs
            ? '0'
            : (data.currentData.uvs - data.prevData.uvs > 0 ? '+' : '-') +
              Math.abs(data.currentData.uvs - data.prevData.uvs)
        }`,
    },
  ];
};

// 重置筛选
const handleReset = () => {
  customerService.value = '';
  timeRange.value = 7;
  loadData();
};

// 查询数据
const handleQuery = () => {
  loadData();
};

// 加载数据
const loadData = async () => {
  loading.value = true;
  const params: DownloadStatisticsParams = {
    days: Number(timeRange.value),
    userId: customerService.value,
  };

  try {
    // 获取概览数据
    const overviewRes = await getDownloadOverview(params);
    if (overviewRes.code === 0 && overviewRes.data) {
      updateOverviewData(overviewRes.data);
    }

    // 获取趋势数据
    const trendRes = await getDownloadTrend(params);
    // 即使没有数据也提供默认值，确保图表能正常渲染
    const dates =
      trendRes.code === 0 && trendRes.data ? trendRes.data.dates : [];
    const downloadData =
      trendRes.code === 0 && trendRes.data ? trendRes.data.downloadData : [];
    const visitData =
      trendRes.code === 0 && trendRes.data ? trendRes.data.visitData : [];
    const days = Number(timeRange.value);

    // 处理空数据情况
    const hasData = dates.length > 0;
    // 如果没有数据，提供默认的x轴标签
    const xAxisData = hasData ? dates : ['暂无数据'];
    // 如果没有数据，提供默认的空数据点
    const defaultDownloadData = hasData ? downloadData : [0];
    const defaultVisitData = hasData ? visitData : [0];

    // 获取客服业绩数据
    const promoterRes = await getPromoterData(params);
    if (promoterRes.code === 0 && promoterRes.data) {
      promoterData.value = promoterRes.data || [];
    }

    // 保存图表数据到状态中，供标签切换时使用
    chartData.value = {
      xAxisData,
      defaultDownloadData,
      defaultVisitData,
      days,
      hasData,
    };

    // 渲染下载趋势图
    renderDownloadChart({
      grid: {
        bottom: 40,
        containLabel: true,
        left: '3%',
        right: '4%',
        top: '10%',
      },
      series: [
        {
          data: defaultDownloadData,
          itemStyle: {
            color: '#3b82f6',
          },
          smooth: true,
          type: 'line',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0)' },
              ],
            },
          },
          lineStyle: {
            width: 2,
            opacity: hasData ? 1 : 0, // 无数据时隐藏线条
          },
          symbol: hasData ? 'circle' : 'none',
          symbolSize: 6,
          label: hasData
            ? undefined
            : {
                show: true,
                position: 'top',
                formatter: '暂无数据',
                color: '#6b7280',
              },
        },
      ],
      tooltip: {
        axisPointer: {
          lineStyle: {
            color: '#3b82f6',
            width: 1,
          },
          type: 'line',
        },
        trigger: 'axis',
        formatter: (params: any) => {
          return hasData ? `下载量: ${params[0].value}` : '暂无数据';
        },
      },
      xAxis: {
        axisTick: {
          show: false,
        },
        boundaryGap: false,
        data: xAxisData,
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#e5e7eb',
          },
        },
        axisLabel: {
          color: '#6b7280',
          rotate: hasData && Number(days) > 7 ? 45 : 0,
        },
      },
      yAxis: [
        {
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#f3f4f6',
            },
          },
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#6b7280',
          },
          min: 0,
        },
      ],
    });

    // 渲染访问趋势图
    renderVisitChart({
      grid: {
        bottom: 40,
        containLabel: true,
        left: '3%',
        right: '4%',
        top: '10%',
      },
      series: [
        {
          data: defaultVisitData?.length ? defaultVisitData : [0],
          type: 'bar',
          itemStyle: {
            color: '#10b981',
            borderRadius: [4, 4, 0, 0],
            opacity: hasData ? 1 : 0, // 无数据时隐藏柱状图
          },
          barWidth: '60%',
          label: hasData
            ? undefined
            : {
                show: true,
                position: 'top',
                formatter: '暂无数据',
                color: '#6b7280',
              },
        },
      ],
      tooltip: {
        axisPointer: {
          lineStyle: {
            color: '#10b981',
            width: 1,
          },
          type: 'shadow',
        },
        trigger: 'axis',
        formatter: (params: any) => {
          return hasData ? `访问量: ${params[0].value}` : '暂无数据';
        },
      },
      xAxis: {
        axisTick: {
          show: false,
        },
        data: xAxisData,
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#e5e7eb',
          },
        },
        axisLabel: {
          color: '#6b7280',
          rotate: hasData && days > 7 ? 45 : 0,
        },
      },
      yAxis: [
        {
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#f3f4f6',
            },
          },
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#6b7280',
          },
          min: 0,
        },
      ],
    });
  } catch (error) {
    console.error('加载数据失败:', error);
  } finally {
    loading.value = false;
  }
};
// 组件挂载时加载数据
onMounted(() => {
  loadCustomerServiceList();
  loadData();
});
</script>

<template>
  <div class="p-5">
    <!-- 筛选器区域 -->
    <Card class="mb-5">
      <div class="flex flex-wrap items-center justify-between gap-4 p-4">
        <div class="flex items-center gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-500">客服人员</label>
            <Select
              v-model:value="customerService"
              style="width: 180px"
              placeholder="选择客服"
            >
              <SelectOption value="">全部客服</SelectOption>
              <SelectOption
                v-for="cs in customerServiceList"
                :key="cs.userId"
                :value="cs.userId"
              >
                {{ cs.userName }}
              </SelectOption>
            </Select>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-500">时间范围</label>
            <Select
              v-model:value="timeRange"
              style="width: 180px"
              placeholder="选择时间范围"
              :default-value="7"
            >
              <SelectOption :value="7"> 最近7天 </SelectOption>
              <SelectOption :value="15"> 最近15天 </SelectOption>
              <SelectOption :value="30"> 最近30天 </SelectOption>
            </Select>
          </div>
        </div>

        <div class="flex gap-2">
          <Button variant="secondary" @click="handleReset">重置</Button>
          <Button @click="handleQuery">查询</Button>
        </div>
      </div>
    </Card>

    <!-- 统计概览区域 -->
    <AnalysisOverview :items="overviewItems" class="mb-5" />

    <!-- 图表区域 -->
    <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
      <!-- 下载趋势图表 -->
      <Card title="下载趋势" class="h-full">
        <div class="h-[400px]">
          <EchartsUI ref="downloadChartRef" />
        </div>
      </Card>

      <!-- 访问趋势图表 -->
      <Card title="访问趋势" class="h-full">
        <div class="h-[400px]">
          <EchartsUI ref="visitChartRef" />
        </div>
      </Card>
    </div>

    <!-- 客服业绩统计表格 -->
    <Card title="客服业绩统计" class="mt-5">
      <table
        style="
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #e8e8e8;
        "
      >
        <thead>
          <tr style="border-bottom: 1px solid #e8e8e8">
            <th
              style="
                width: 120px;
                padding: 12px 0;
                padding-left: 16px;
                font-weight: normal;
                text-align: left;
              "
            >
              客服姓名
            </th>
            <th
              style="
                width: 100px;
                padding: 12px 0;
                font-weight: normal;
                text-align: center;
              "
            >
              下载量
            </th>
            <th
              style="
                width: 100px;
                padding: 12px 0;
                font-weight: normal;
                text-align: center;
              "
            >
              访问量
            </th>
            <th
              style="
                width: 100px;
                padding: 12px 0;
                font-weight: normal;
                text-align: center;
              "
            >
              转化率
            </th>
            <th
              style="
                width: 120px;
                padding: 12px 0;
                font-weight: normal;
                text-align: center;
              "
            >
              生成链接数
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in promoterData"
            :key="item.userId"
            style="border-bottom: 1px solid #f0f0f0"
          >
            <td style="padding: 12px 0; padding-left: 16px">
              {{ item.userName }}
            </td>
            <td style="padding: 12px 0; text-align: center">
              {{ item.downloads }}
            </td>
            <td style="padding: 12px 0; text-align: center">
              {{ item.visits }}
            </td>
            <td style="padding: 12px 0; text-align: center">
              <span style="color: #10b981">{{ item.conversionRate }}%</span>
            </td>
            <td style="padding: 12px 0; text-align: center">
              {{ item.links }}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>
