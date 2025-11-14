import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { $t } from '@vben/locales';

import { Switch } from 'ant-design-vue';

import { z } from '#/adapter/form';
import { updateSoftware } from '#/api/cms/software';
import { getSoftwareCategoryList } from '#/api/cms/softwareCategory';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },
    {
      title: $t('cms.software.softId'),
      field: 'softId',
    },
    {
      title: $t('cms.software.softName'),
      field: 'softName',
    },
    {
      title: $t('cms.software.logoFile'),
      field: 'logoFile',
      slots: {
        default: (e) =>
          h('img', {
            src: e.row.logoFile,
            style: {
              width: '40px',
              height: '40px',
            },
          }),
      },
    },
    {
      title: $t('cms.software.downloadCount'),
      field: 'downloadCount',
    },
    {
      title: $t('cms.software.version'),
      field: 'version',
    },
    {
      title: $t('cms.software.installFileSize'),
      field: 'installFileSize',
      formatter: (e) =>
        `${Number(e.row.installFileSize).toFixed(2)}${e.row.fileSizeUnit}`,
    },
    {
      title: $t('cms.software.downloadUrl'),
      field: 'downloadUrl',
      // 隐藏列
      visible: false,
    },
    {
      title: $t('cms.software.score'),
      field: 'score',
    },
    {
      title: $t('cms.software.webOrApp'),
      field: 'webOrApp',
      formatter: (e) => (e.row.webOrApp === 'web' ? '客户端程序' : '应用软件'),
    },
    {
      title: $t('cms.software.platform'),
      field: 'platform',
    },
    {
      title: $t('cms.software.type'),
      field: 'type',
      slots: {
        default: (e) => (e.row.type === 'game' ? '游戏' : '-'),
      },
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
              updateSoftware({ id: e.row.id, status: newStatus }).then(() => {
                e.row.status = newStatus;
              });
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
      fieldName: 'softId',
      label: $t('cms.software.softId'),
      component: 'Input',
    },
    {
      fieldName: 'softName',
      label: $t('cms.software.softName'),
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
      fieldName: 'softId',
      label: $t('cms.software.softId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('cms.software.softId'),
      },
      rules: z.string().max(10),
    },
    {
      fieldName: 'softName',
      label: $t('cms.software.softName'),
      component: 'Input',
      componentProps: {
        placeholder: $t('cms.software.softName'),
      },
      rules: z.string().max(50),
    },
    {
      fieldName: 'logoFile',
      label: $t('cms.software.logoFile'),
      component: 'ImageUpload',
      componentProps: {
        accept: ['png', 'jpeg', 'jpg'],
        maxSize: 2,
        maxNumber: 1,
        multiple: false,
        provider: 'local',
      },
    },
    {
      fieldName: 'captureFileList',
      label: $t('cms.software.captureFileList'),
      component: 'ImageUpload',
      componentProps: {
        accept: ['png', 'jpeg', 'jpg'],
        maxSize: 2,
        maxNumber: 5,
        multiple: true,
        provider: 'local',
      },
    },
    {
      fieldName: 'webOrApp',
      label: $t('cms.software.webOrApp'),
      component: 'Select',
      componentProps: {
        placeholder: $t('cms.software.webOrApp'),
        options: [
          { label: '客户端程序', value: 'web' },
          { label: '应用软件', value: 'app' },
        ],
      },
      rules: 'required',
    },
    {
      fieldName: 'platform',
      label: $t('cms.software.platform'),
      component: 'Select',
      componentProps: {
        placeholder: $t('cms.software.platform'),
        options: [],
      },
      dependencies: {
        componentProps(values) {
          return values.webOrApp === 'web'
            ? {
                options: [
                  { label: 'Windows', value: 'windows' },
                  { label: 'macOS', value: 'macos' },
                  { label: 'Linux', value: 'linux' },
                ],
              }
            : {
                options: [
                  { label: 'iOS', value: 'ios' },
                  { label: 'Android', value: 'android' },
                ],
              };
        },
        triggerFields: ['webOrApp'],
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: $t('cms.software.type'),
      component: 'Select',
      componentProps: {
        placeholder: $t('cms.software.type'),
        options: [{ label: '游戏', value: 'game' }],
      },
      defaultValue: 'game',
      rules: 'required',
    },
    {
      fieldName: 'categoryId',
      label: $t('cms.softwareCategory.className'),
      component: 'ApiTreeSelect',
      componentProps: {
        api: getSoftwareCategoryList,
        params: {
          page: 1,
          pageSize: 1000,
          webOrApp: '',
        },
        resultField: 'data.data',
        labelField: 'className',
        valueField: 'id',
        immediate: true,
      },
      dependencies: {
        componentProps(values) {
          return {
            params: {
              page: 1,
              pageSize: 1000,
              webOrApp: values.webOrApp,
            },
          };
        },
        triggerFields: ['webOrApp'],
      },
      rules: 'required',
    },
    // {
    //   fieldName: 'detailTag',
    //   label: $t('cms.software.detailTag'),
    //   component: 'Select',
    //   componentProps: {
    //     placeholder: $t('cms.software.detailTag'),
    //     mode: 'multiple',
    //     // 这里可以根据实际情况添加标签选项，暂时使用示例数据
    //     options: [
    //       { label: '高效', value: '高效' },
    //       { label: '轻量', value: '轻量' },
    //       { label: '强大', value: '强大' },
    //       { label: '易用', value: '易用' },
    //       { label: '安全', value: '安全' },
    //     ],
    //   },
    // },
    {
      fieldName: 'version',
      label: $t('cms.software.version'),
      component: 'Input',
      componentProps: {
        placeholder: $t('cms.software.version'),
      },
    },
    {
      fieldName: 'downloadUrl',
      label: $t('cms.software.downloadUrl'),
      // component: 'ApiSelect',
      // componentProps: {
      //   api: getFileList,
      //   params: {
      //     page: 1,
      //     pageSize: 1000,
      //   },
      //   resultField: 'data.data',
      //   labelField: 'name',
      //   valueField: 'id',
      //   searchField: 'name',
      //   emitOption: true, // 确保onChange返回完整的选项对象
      // },
      component: 'Input',
      componentProps: {
        placeholder: $t('cms.software.downloadUrl'),
      },
      rules: z.string().url('请输入正确的下载地址'),
    },
    {
      fieldName: 'installFileSize',
      label: `${$t('cms.software.installFileSize')}`,
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('cms.software.installFileSize'),
      },
      rules: z.number().max(1000, '安装文件大小不能超过1000'),
    },
    {
      fieldName: 'fileSizeUnit',
      label: $t('cms.software.fileSizeUnit'),
      component: 'Select',
      componentProps: {
        placeholder: $t('cms.software.fileSizeUnit'),
        options: [
          { label: 'GB', value: 'GB' },
          { label: 'MB', value: 'MB' },
        ],
      },
      defaultValue: 'GB',
    },
    {
      fieldName: 'detailInfo',
      label: $t('cms.software.detailInfo'),
      component: 'Editor',
      componentProps: {
        placeholder: $t('cms.software.detailInfo'),
        rows: 4,
        uploadProvider: 'local',
        disabledUpload: true,
      },
    },
    {
      fieldName: 'whatNew',
      label: $t('cms.software.whatNew'),
      component: 'Editor',
      componentProps: {
        placeholder: $t('cms.software.whatNew'),
        rows: 3,
        uploadProvider: 'local',
        disabledUpload: true,
      },
    },
    {
      fieldName: 'warmTips',
      label: $t('cms.software.warmTips'),
      component: 'Input',
      componentProps: {
        placeholder: $t('cms.software.warmTips'),
        maxLength: 100,
      },
    },
    {
      fieldName: 'downloadCount',
      label: $t('cms.software.downloadCount'),
      component: 'InputNumber',
      componentProps: {
        defaultValue: 0,
        placeholder: $t('cms.software.downloadCount'),
      },
    },
    {
      fieldName: 'score',
      label: $t('cms.software.score'),
      component: 'Rate',
      componentProps: {
        allowHalf: false, // 允许半星评分
        max: 5, // 最大评分5星
        tooltips: ['1', '2', '3', '4', '5'],
        placeholder: $t('cms.software.score'),
      },
    },
    {
      fieldName: 'status',
      label: $t('cms.software.status'),
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
