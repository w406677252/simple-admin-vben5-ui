import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { $t } from '@vben/locales';

import { Switch } from 'ant-design-vue';

import { updateSoftwareCategory } from '#/api/cms/softwareCategory';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },

    {
      title: $t('cms.softwareCategory.classId'),
      field: 'classId',
    },
    {
      title: $t('cms.softwareCategory.className'),
      field: 'className',
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
      fieldName: 'classId',
      label: $t('cms.softwareCategory.classId'),
      component: 'Input',
    },
    {
      fieldName: 'className',
      label: $t('cms.softwareCategory.className'),
      component: 'Input',
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
