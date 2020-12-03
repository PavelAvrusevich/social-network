let rerender;

let state = {
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
};

let addPost = () => {
    let newPost = {
        id: 3,
        message: state.profilePage.newText,
        likesCount: 0,
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newText = '';
    rerender(state);
};

let fixNewText = (changeText) => {
    state.profilePage.newText = changeText;
    rerender(state);
};

const subscriber = (observer) => {
    rerender = observer;
};

export { addPost, fixNewText, subscriber };
export default state;
