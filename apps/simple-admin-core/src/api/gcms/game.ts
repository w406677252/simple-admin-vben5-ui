import type { GameInfo, GameListResp } from './model/gameModel';

import type {
  BaseDataResp,
  BaseIDReq,
  BaseIDsReq,
  BaseListReq,
  BaseResp,
} from '#/api/model/baseModel';

import { requestClient } from '#/api/request';

enum Api {
  CreateGame = '/game-api/game/create',
  DeleteGame = '/game-api/game/delete',
  GetGameById = '/game-api/game',
  GetGameList = '/game-api/game/list',
  UpdateGame = '/game-api/game/update',
}

/**
 * @description: Get game list
 */

export const getGameList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<GameListResp>>(
    Api.GetGameList,
    params,
  );
};

/**
 *  @description: Create a new game
 */
export const createGame = (params: GameInfo) => {
  return requestClient.post<BaseResp>(Api.CreateGame, params);
};

/**
 *  @description: Update the game
 */
export const updateGame = (params: GameInfo) => {
  return requestClient.post<BaseResp>(Api.UpdateGame, params);
};

/**
 *  @description: Delete games
 */
export const deleteGame = (params: BaseIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeleteGame, params);
};

/**
 *  @description: Get game By ID
 */
export const getGameById = (params: BaseIDReq) => {
  return requestClient.post<BaseDataResp<GameInfo>>(Api.GetGameById, params);
};
