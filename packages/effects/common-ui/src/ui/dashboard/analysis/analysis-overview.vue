<script setup lang="ts">
import type { AnalysisOverviewItem } from '../typing';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  VbenCountToAnimator,
  VbenIcon,
} from '@vben-core/shadcn-ui';

interface Props {
  items?: AnalysisOverviewItem[];
}

defineOptions({
  name: 'AnalysisOverview',
});

withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <template v-for="item in items" :key="item.title">
      <Card :title="item.title" class="w-full">
        <CardHeader>
          <CardTitle class="text-xl">{{ item.title }}</CardTitle>
        </CardHeader>

        <CardContent class="flex items-center justify-between">
          <VbenCountToAnimator
            v-if="typeof item.value === 'number'"
            :end-val="item.value"
            :start-val="1"
            class="text-xl"
            :suffix="item.isPercent ? '%' : ''"
          />
          <div v-else>{{ item.value }}%</div>
          <VbenIcon :icon="item.icon" class="size-8 flex-shrink-0" />
        </CardContent>
        <CardFooter class="justify-between">
          <span>{{ item.totalTitle }}</span>
          <div class="flex items-center space-x-2">
            <VbenCountToAnimator
              v-if="typeof item.totalValue === 'number'"
              :end-val="item.totalValue"
              :start-val="1"
              prefix=""
              :suffix="item.isPercent ? '%' : ''"
            />
            <div v-else>{{ item.totalValue }}</div>
            <span
              v-if="item.changeRate"
              class="text-sm font-medium"
              :class="[
                {
                  'text-green-500': item.changeRate.includes('+'),
                  'text-red-500': item.changeRate.includes('-'),
                  'text-gray-500':
                    !item.changeRate.includes('+') &&
                    !item.changeRate.includes('-'),
                },
              ]"
            >
              {{ item.changeRate }}
            </span>
          </div>
        </CardFooter>
      </Card>
    </template>
  </div>
</template>
