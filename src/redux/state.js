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
            sidebar: {
                friends: [
                    { id: '1', name: 'Сергей' },
                    { id: '2', name: 'Александр' },
                    { id: '3', name: 'Дмитрий' },
                    { id: '4', name: 'Кристина' },
                    { id: '5', name: 'Егор' },
                    { id: '6', name: 'Тимур' },
                ],
            },
        },
    },
    getState() {
        return this._state;
    },
    addPost() {
        let newPost = {
            id: 3,
            message: this._state.profilePage.newText,
            likesCount: 0,
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newText = '';
        this._callSubscriber(this._state);
    },
    fixNewText(changeText) {
        this._state.profilePage.newText = changeText;
        this._callSubscriber(this._state);
    },
    _callSubscriber() {},
    subscribe(observer) {
        this._callSubscriber = observer;
    },
};

export default store;
