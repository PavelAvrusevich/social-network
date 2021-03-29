type EventNamesType = 'messages-received' | 'status-changed';

const subscribers = {
    'messages-received': [] as MessageChangedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const onClose = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(connectWS, 3000);
};

const onMessage = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach((s) => s(newMessages));
};

const onOpen = () => {
    notifySubscribersAboutStatus('ready');
};

const onError = () => {
    notifySubscribersAboutStatus('error');
    console.log('REFRESH PAGE');
};

const cleanUp = () => {
    ws?.removeEventListener('close', onClose);
    ws?.removeEventListener('message', onMessage);
    ws?.removeEventListener('open', onOpen);
    ws?.removeEventListener('error', onError);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach((s) => s(status));
};

function connectWS() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', onClose);
    ws.addEventListener('message', onMessage);
    ws.addEventListener('open', onOpen);
    ws.addEventListener('error', onError);
}

export const chatAPI = {
    start() {
        connectWS();
    },
    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(
        eventName: EventNamesType,
        callback: StatusChangedSubscriberType | MessageChangedSubscriberType
    ) {
        //@ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
        };
    },
    unsubscribe(
        eventName: EventNamesType,
        callback: StatusChangedSubscriberType | MessageChangedSubscriberType
    ) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};

type MessageChangedSubscriberType = (messages: ChatMessageTypeApi[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
export type StatusType = 'pending' | 'ready' | 'error';

export type ChatMessageTypeApi = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};
