import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { $t } from '@vben/locales';

import { Switch } from 'ant-design-vue';

import { updateSoftwareTag } from '#/api/cms/softwareTag';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },
    {
      title: $t('cms.softwareTag.tagId'),
      field: 'id',
    },
    {
      title: $t('cms.softwareTag.tagName'),
      field: 'tagName',
    },
    {
      title: $t('cms.softwareTag.categoryId'),
      field: 'categoryId',
    },
    {
      title: $t('cms.softwareTag.sort'),
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
              updateSoftwareTag({ id: e.row.id, status: newStatus }).then(
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
      label: $t('cms.softwareTag.status'),
      component: 'InputNumber',
    },
    {
      fieldName: 'tagName',
      label: $t('cms.softwareTag.tagName'),
      component: 'Input',
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
      fieldName: 'tagName',
      label: $t('cms.softwareTag.tagName'),
      component: 'Input',
    },
    {
      fieldName: 'categoryId',
      label: $t('cms.softwareCategory.className'),
      component: 'Input',
    },
    {
      fieldName: 'sort',
      label: $t('cms.softwareTag.sort'),
      component: 'InputNumber',
    },
    {
      fieldName: 'status',
      label: $t('cms.softwareTag.status'),
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
