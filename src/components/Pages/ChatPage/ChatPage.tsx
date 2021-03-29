import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageTypeApi } from '../../../api/chat-api';
import { startMessagesListening, stopMessagesListening, sendMessage } from '../../../redux/chat-reducer';
import { AppStateType } from '../../../redux/redux-store';

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    return (
        <div>
            {status === 'error' && <div>Some errore occured. Please refresh page.</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    let [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 500) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageTypeApi }> = React.memo(({ message }) => {
    return (
        <div>
            <img height={'50px'} src={message.photo} />
            {message.userName}
            <br />
            {message.message}
            <hr />
        </div>
    );
});

const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch();
    let [message, setMessage] = useState('');
    const status = useSelector((state: AppStateType) => state.chat.status);

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    };

    return (
        <div>
            <div>
                <textarea
                    onChange={(e) => {
                        setMessage(e.currentTarget.value);
                    }}
                    value={message}
                    cols={80}
                    rows={3}
                ></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
                    send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
