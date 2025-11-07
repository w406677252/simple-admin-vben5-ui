import { type BaseListResp } from '../../model/baseModel';

/**
 *  @description: SoftwareCategory info response
 */
export interface SoftwareCategoryInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  classId?: string;
  className?: string;
  sort?: number;
}

/**
 *  @description: SoftwareCategory list response
 */

export type SoftwareCategoryListResp = BaseListResp<SoftwareCategoryInfo>;
