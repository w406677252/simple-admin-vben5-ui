import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { $t } from '@vben/locales';

import { Switch } from 'ant-design-vue';

import { z } from '#/adapter/form';
import {
  getSoftwareCategoryList,
  updateSoftwareCategory,
} from '#/api/cms/softwareCategory';
import { ParentCategoryIdEnum } from '#/enums/common';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },
    {
      title: $t('cms.softwareCategory.className'),
      field: 'className',
      treeNode: true,
    },
    {
      title: $t('cms.software.type'),
      field: 'type',
      formatter: (e) => {
        return e.row.type === 'game' ? '游戏' : '其他';
      },
    },
    {
      title: $t('cms.softwareCategory.sort'),
      field: 'sort',
    },
    {
      title: $t('common.status'),
      field: 'status',
      slots: {
        default: (e) =>
          h(Switch, {
            checked: e.row.status === 1,
            onClick: () => {
              const newStatus = e.row.status === 1 ? 2 : 1;
              updateSoftwareCategory({ id: e.row.id, status: newStatus }).then(
                () => {
                  e.row.status = newStatus;
                },
              );
            },
          }),
      },
    },

    {
      title: $t('common.createTime'),
      field: 'createdAt',
      formatter: 'formatDateTime',
    },
  ],
};

export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'status',
      label: $t('cms.softwareCategory.status'),
      component: 'InputNumber',
    },
    {
      fieldName: 'className',
      label: $t('cms.softwareCategory.className'),
      component: 'Input',
      rules: z.string().max(50).optional(),
    },
  ],
};

export const dataFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'id',
      label: 'ID',
      component: 'Input',
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'className',
      label: $t('cms.softwareCategory.className'),
      component: 'Input',
      rules: z.string().min(1).max(50),
    },
    {
      fieldName: 'type',
      label: $t('cms.software.type'),
      component: 'Select',
      componentProps: {
        options: [{ label: '游戏', value: 'game' }],
      },
      defaultValue: 'game',
    },
    {
      fieldName: 'parentId',
      label: $t('sys.department.parentId'),
      component: 'ApiTreeSelect',
      rules: 'required',
      componentProps: {
        api: getSoftwareCategoryList,
        params: {
          page: 1,
          pageSize: 1000,
        },
        resultField: 'data.data',
        labelField: 'className',
        valueField: 'id',
        defaultValue: {
          id: ParentCategoryIdEnum.DEFAULT,
          parentId: -1,
          label: '一级分类',
          value: ParentCategoryIdEnum.DEFAULT,
        },
      },
      defaultValue: ParentCategoryIdEnum.DEFAULT,
    },
    {
      fieldName: 'sort',
      label: $t('cms.softwareCategory.sort'),
      component: 'InputNumber',
    },
    {
      fieldName: 'status',
      label: $t('cms.softwareCategory.status'),
      component: 'RadioButtonGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          { label: $t('common.on'), value: 1 },
          { label: $t('common.off'), value: 2 },
        ],
      },
    },
  ],
};
