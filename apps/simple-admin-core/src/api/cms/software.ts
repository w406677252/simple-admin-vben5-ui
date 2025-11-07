import type { SoftwareInfo, SoftwareListResp } from './model/softwareModel';

import type {
  BaseDataResp,
  BaseIDReq,
  BaseIDsReq,
  BaseListReq,
  BaseResp,
} from '#/api/model/baseModel';

import { requestClient } from '#/api/request';

enum Api {
  CreateSoftware = '/sys-api/software/create',
  DeleteSoftware = '/sys-api/software/delete',
  GetSoftwareById = '/sys-api/software',
  GetSoftwareList = '/sys-api/software/list',
  UpdateSoftware = '/sys-api/software/update',
}

/**
 * @description: Get software list
 */

export const getSoftwareList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<SoftwareListResp>>(
    Api.GetSoftwareList,
    params,
  );
};

/**
 *  @description: Create a new software
 */
export const createSoftware = (params: SoftwareInfo) => {
  return requestClient.post<BaseResp>(Api.CreateSoftware, params);
};

/**
 *  @description: Update the software
 */
export const updateSoftware = (params: SoftwareInfo) => {
  return requestClient.post<BaseResp>(Api.UpdateSoftware, params);
};

/**
 *  @description: Delete softwares
 */
export const deleteSoftware = (params: BaseIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeleteSoftware, params);
};

/**
 *  @description: Get software By ID
 */
export const getSoftwareById = (params: BaseIDReq) => {
  return requestClient.post<BaseDataResp<SoftwareInfo>>(
    Api.GetSoftwareById,
    params,
  );
};
