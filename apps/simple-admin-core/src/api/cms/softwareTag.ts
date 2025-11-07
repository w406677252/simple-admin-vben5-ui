import type {
  SoftwareTagInfo,
  SoftwareTagListResp,
} from './model/softwareTagModel';

import type {
  BaseDataResp,
  BaseIDReq,
  BaseIDsReq,
  BaseListReq,
  BaseResp,
} from '#/api/model/baseModel';

import { requestClient } from '#/api/request';

enum Api {
  CreateSoftwareTag = '/sys-api/software_tag/create',
  DeleteSoftwareTag = '/sys-api/software_tag/delete',
  GetSoftwareTagById = '/sys-api/software_tag',
  GetSoftwareTagList = '/sys-api/software_tag/list',
  UpdateSoftwareTag = '/sys-api/software_tag/update',
}

/**
 * @description: Get software tag list
 */

export const getSoftwareTagList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<SoftwareTagListResp>>(
    Api.GetSoftwareTagList,
    params,
  );
};

/**
 *  @description: Create a new software tag
 */
export const createSoftwareTag = (params: SoftwareTagInfo) => {
  return requestClient.post<BaseResp>(Api.CreateSoftwareTag, params);
};

/**
 *  @description: Update the software tag
 */
export const updateSoftwareTag = (params: SoftwareTagInfo) => {
  return requestClient.post<BaseResp>(Api.UpdateSoftwareTag, params);
};

/**
 *  @description: Delete software tags
 */
export const deleteSoftwareTag = (params: BaseIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeleteSoftwareTag, params);
};

/**
 *  @description: Get software tag By ID
 */
export const getSoftwareTagById = (params: BaseIDReq) => {
  return requestClient.post<BaseDataResp<SoftwareTagInfo>>(
    Api.GetSoftwareTagById,
    params,
  );
};
