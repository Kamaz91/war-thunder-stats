import { defineStore } from 'pinia'
import { NotifierNotification, NotifierNotificationType } from '@/types/notifer';

interface State {
    id: number;
    notifications: Map<string, NotifierNotification>;
}

export const useNotifier = defineStore('notifier', {
    state: (): State => ({
        id: 0,
        notifications: new Map(),
    }),
    getters: {
        getNotifications(state): NotifierNotification[] {
            return Array.from(state.notifications.values());
        }
    },
    actions: {
        genId() {
            var a = (new Date).getTime();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (b) {
                var c = (a + 16 * Math.random()) % 16 | 0;
                return a = Math.floor(a / 16), ("x" == b ? c : 7 & c | 8).toString(16)
            });
        },
        addNotification(type: NotifierNotificationType, timeout: number, isPermament: boolean, text: string, additionalText: string) {
            // TODO Id generator
            let id = this.genId();
            // Miliseconds
            let time = new Date().getTime() + timeout;
            this.notifications.set(id, { id, text, isPermament, timeout: time, additionalText, type });

            console.log("Notification Added:", id, type, text);
        },
        removeNotification(id: string) {
            console.log("Notification Removed:", id);
            let notificationIndex = this.notifications.delete(id);
            console.log("Delete:", notificationIndex, id);
        }
    }
});