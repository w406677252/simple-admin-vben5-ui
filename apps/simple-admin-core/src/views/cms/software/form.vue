<script lang="ts" setup>
import type { SoftwareInfo } from '#/api/cms/model/softwareModel';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createSoftware, updateSoftware } from '#/api/cms/software';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'SoftwareForm',
});

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();

async function onSubmit(values: Record<string, any>) {
  const result = isUpdate.value
    ? await updateSoftware(values as SoftwareInfo)
    : await createSoftware(values as SoftwareInfo);
  if (result.code === 0) {
    message.success(result.msg);
    gridApi.value.reload();
  }
}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: (dataFormSchemas.schema as any[]).map((schema) => {
    // 特别处理 downloadUrl 字段
    // if (schema.fieldName === 'downloadUrl') {
    //   return {
    //     ...schema,
    //     componentProps: {
    //       ...schema.componentProps,
    //       onChange: (value: string, option: { size?: number }) => {
    //         if (option && option.size !== undefined) {
    //           // 使用 formApi 设置字段值
    //           formApi.setFieldValue('installFileSize', `${option.size}`);
    //         }
    //         // 调用原有的 onChange（如果有的话）
    //         schema.componentProps?.onChange?.(value, option);
    //       },
    //     },
    //   };
    // }
    return schema;
  }),
  showDefaultActions: false,
  layout: 'vertical',
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  wrapperClass: 'grid-cols-2',
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    const validationResult = await formApi.validate();
    if (validationResult.valid) {
      await formApi.submitForm();
      modalApi.close();
    }
  },
  onOpenChange(isOpen: boolean) {
    isUpdate.value = modalApi.getData()?.isUpdate;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen) {
      // 重置表单值
      formApi.setValues(record.value);
    }
    modalApi.setState({
      title: isUpdate.value
        ? $t('cms.software.editSoftware')
        : $t('cms.software.addSoftware'),
    });
  },
});

defineExpose(modalApi);
</script>
<template>
  <Modal class="w-1/2">
    <Form />
  </Modal>
</template>
