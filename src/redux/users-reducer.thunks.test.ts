import { ResultCodeEnum, ResponseType } from './../api/api';
import { userAPI } from '../api/user-api';
import { actions, follow, unfollow } from './users-reducer';
jest.mock('../api/user-api');
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;
const response: ResponseType = {
    resultCode: ResultCodeEnum.Succes,
    messages: [],
    data: {},
};
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
userAPIMock.follow.mockReturnValue(Promise.resolve(response));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(response));

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
});

test('succesed follow thunk', async () => {
    const thunk = follow(500);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 500));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(500));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 500));
});

test('succesed unfollow thunk', async () => {
    const thunk = unfollow(500);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 500));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(500));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 500));
});
