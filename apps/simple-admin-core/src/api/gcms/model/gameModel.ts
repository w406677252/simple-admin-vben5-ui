import { type BaseListResp } from '../../model/baseModel';

/**
 *  @description: Game info response
 */
export interface GameInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  description?: string;
  icon?: string;
  coverImage?: string;
  platform?: string;
  packageUrl?: string;
  downloadUrl?: string;
  version?: string;
  fileSize?: number;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  tags?: string;
  rating?: number;
  categoryId?: number;
  subCategoryId?: number;
  status?: number;
}

/**
 *  @description: Game list response
 */

export type GameListResp = BaseListResp<GameInfo>;
