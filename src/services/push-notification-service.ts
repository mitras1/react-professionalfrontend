declare var io: any;

const DEFAULT_PUSH_NOTIFICATION_URL = "https://localhost:44300/";

type NotificationCallback = (payload: any) => void;

class PushNotificationService {
    private socketClient: any;
    private registeredCallbacks: Map<string, Set<NotificationCallback>>;

    constructor() {
        const pushNotificationUrl = process.env.REACT_APP_PUSH_NOTIFICATION_URL || DEFAULT_PUSH_NOTIFICATION_URL;

        this.socketClient = io.connect(pushNotificationUrl);
        this.registeredCallbacks = new Map<string, Set<NotificationCallback>>();
    }

    register(eventName: string, callback: NotificationCallback) {
        const validation = eventName !== "" && eventName !== null &&
            callback !== null;

        if (validation) {
            const isEventExist = this.registeredCallbacks.has(eventName)
            const callbacks = isEventExist ?
                this.registeredCallbacks.get(eventName) : new Set<NotificationCallback>();

            if (callbacks !== undefined) {
                callbacks?.add(callback);

                this.registeredCallbacks.set(eventName, callbacks);
            }

            if (!isEventExist) {
                this.socketClient.on(eventName, (payload: any) => {
                    const callbacks = this.registeredCallbacks.get(eventName);

                    callbacks?.forEach(
                        notificationCallback => notificationCallback(payload));
                });
            }
        }
    }

    unregister(eventName: string, callback: NotificationCallback) {
        const validation = eventName !== "" && eventName !== null &&
            callback !== null;

        if (validation) {
            const isEventExist = this.registeredCallbacks.has(eventName)

            if (isEventExist) {
                const callbacks = this.registeredCallbacks.get(eventName);

                if (callbacks !== undefined) {
                    callbacks?.delete(callback);

                    this.registeredCallbacks.set(eventName, callbacks);
                }
            }
        }
    }
}

const pushNotificationService = new PushNotificationService();

export default pushNotificationService;
