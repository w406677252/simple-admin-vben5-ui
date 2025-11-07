import type {
  SoftwareCategoryInfo,
  SoftwareCategoryListResp,
} from './model/softwareCategoryModel';

import type {
  BaseDataResp,
  BaseIDReq,
  BaseIDsReq,
  BaseListReq,
  BaseResp,
} from '#/api/model/baseModel';

import { requestClient } from '#/api/request';

enum Api {
  CreateSoftwareCategory = '/sys-api/software_category/create',
  DeleteSoftwareCategory = '/sys-api/software_category/delete',
  GetSoftwareCategoryById = '/sys-api/software_category',
  GetSoftwareCategoryList = '/sys-api/software_category/list',
  UpdateSoftwareCategory = '/sys-api/software_category/update',
}

/**
 * @description: Get software category list
 */

export const getSoftwareCategoryList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<SoftwareCategoryListResp>>(
    Api.GetSoftwareCategoryList,
    params,
  );
};

/**
 *  @description: Create a new software category
 */
export const createSoftwareCategory = (params: SoftwareCategoryInfo) => {
  return requestClient.post<BaseResp>(Api.CreateSoftwareCategory, params);
};

/**
 *  @description: Update the software category
 */
export const updateSoftwareCategory = (params: SoftwareCategoryInfo) => {
  return requestClient.post<BaseResp>(Api.UpdateSoftwareCategory, params);
};

/**
 *  @description: Delete software categorys
 */
export const deleteSoftwareCategory = (params: BaseIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeleteSoftwareCategory, params);
};

/**
 *  @description: Get software category By ID
 */
export const getSoftwareCategoryById = (params: BaseIDReq) => {
  return requestClient.post<BaseDataResp<SoftwareCategoryInfo>>(
    Api.GetSoftwareCategoryById,
    params,
  );
};
