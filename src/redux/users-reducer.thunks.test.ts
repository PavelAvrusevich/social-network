import { ResultCodeEnum, ResponseType } from './../api/api';
import { userAPI } from '../api/user-api';
import { actions, follow } from './users-reducer';
jest.mock('../api/user-api');
const userAPIMock = userAPI;
let response: ResponseType = {
    resultCode: ResultCodeEnum.Succes,
    messages: [],
    data: {},
};
// @ts-ignore
userAPIMock.follow.mockReturnValue(response);

test('', async () => {
    const thunk = follow(500);
    const dispatchMock = jest.fn();
    // @ts-ignore
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 500));
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(500));
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 500));
});
