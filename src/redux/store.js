import messageReducer from './messages-reducer';
import profileReducer from './profile-reducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: '1', message: 'привет, как дела??', likesCount: 12 },
                { id: '2', message: 'Я ждун))', likesCount: 10 },
            ],
            newText: '',
        },
        dialogsPage: {
            dialogs: [
                { id: '1', name: 'Серега' },
                { id: '2', name: 'Вован' },
                { id: '3', name: 'Силос' },
            ],
            messages: [
                { id: '1', message: 'message 1' },
                { id: '2', message: 'message 2' },
                { id: '3', message: 'message 121' },
            ],
            newText: '',
        },
        navbar: {},
    },
    getState() {
        return this._state;
    },

    _callSubscriber() {},
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(
            this._state.profilePage,
            action
        );
        this._state.dialogsPage = messageReducer(
            this._state.dialogsPage,
            action
        );
        this._callSubscriber(this._state);
    },
};

export default store;
