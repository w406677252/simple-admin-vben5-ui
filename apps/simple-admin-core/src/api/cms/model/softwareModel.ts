import type { BaseListResp } from '../../model/baseModel';

/**
 *  @description: Software info response
 */
export interface SoftwareInfo {
  id?: number;
  softId?: string;
  softName?: string;
  logoFile?: string;
  downloadCount?: string;
  version?: string;
  installFileSize?: string;
  captureFileList?: string;
  detailInfo?: string;
  detailTag?: string;
  warmTips?: string;
  whatNew?: string;
  downloadUrl?: string;
  score?: string;
  webOrApp?: string;
  platform?: string;
  type?: string;
  categoryId?: number;
  tagId?: number;
  status?: number;
}

/**
 *  @description: Software list response
 */

export type SoftwareListResp = BaseListResp<SoftwareInfo>;
