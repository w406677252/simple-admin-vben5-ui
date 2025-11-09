<script lang="ts" setup>
import type { IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'; // 引入 css

import { onBeforeUnmount, shallowRef } from 'vue';

import { useAccessStore } from '@vben/stores';

import { useVModel } from '@vueuse/core';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue';

import '@wangeditor-next/editor/dist/css/style.css';

defineOptions({ name: 'Editor' });

const props = defineProps({
  uploadProvider: {
    type: String,
    default: 'cloud-default',
  },
  value: {
    type: String,
    default: '',
  },
  disabledUpload: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:value']);
const state = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});

const editorRef = shallowRef();
const provider =
  props.uploadProvider === 'local' || props.uploadProvider === 'cloud-default'
    ? ''
    : props.uploadProvider;
const accessStore = useAccessStore();
const serverUrl =
  props.uploadProvider === 'local'
    ? '/fms-api/upload'
    : '/fms-api/cloud_file/upload';

const toolbarConfig: Partial<IToolbarConfig> = {};
// 确保MENU_CONF对象存在且类型正确
const menuConfig: Record<string, any> = {};
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: menuConfig,
};

// 根据disabledUpload配置上传功能
if (props.disabledUpload) {
  // 禁用上传功能，在toolbarConfig中配置excludeKeys
  if (!toolbarConfig.excludeKeys) {
    toolbarConfig.excludeKeys = [];
  }
  toolbarConfig.excludeKeys.push('uploadImage', 'uploadVideo');
} else {
  // eslint:disabled
  menuConfig.uploadImage = {
    server: serverUrl,
    fieldName: 'file',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 1 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {
      provider,
    },

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers: {
      Accept: 'text/x-json',
      Authorization: `Bearer ${accessStore.accessToken}`,
    } as any,

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒

    // 添加必需的回调函数
    onSuccess(file: any, res: any) {
      // 上传成功的回调
      return res;
    },

    onFailed(file: any, res: any) {
      // 上传失败的回调
      console.error('上传失败:', res);
      return res;
    },

    onError(file: any, err: Error, res: any) {
      // 上传错误的回调
      console.error('上传错误:', err);
      return res;
    },

    customInsert(res: any, insertFn: any) {
      insertFn(res.data.url, res.data.name, res.data.name);
    },
  };
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      :default-config="toolbarConfig"
      :editor="editorRef"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="state"
      :default-config="editorConfig"
      style="height: 500px; overflow-y: hidden"
      @on-created="handleCreated"
    />
  </div>
</template>
