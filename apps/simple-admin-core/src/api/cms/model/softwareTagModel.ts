import { type BaseListResp } from '../../model/baseModel';

/**
 *  @description: SoftwareTag info response
 */
export interface SoftwareTagInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  tagId?: string;
  tagName?: string;
  categoryId?: number;
  sort?: number;
}

/**
 *  @description: SoftwareTag list response
 */

export type SoftwareTagListResp = BaseListResp<SoftwareTagInfo>;
