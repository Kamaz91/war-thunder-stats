<template>
    <div class="notifier_box">
        <TransitionGroup name="notification-list">
            <Notification v-for="notification of NotifierStore.getNotifications.reverse()" :key="notification.id"
                :id="notification.id" :notification="notification">
            </Notification>
        </TransitionGroup>
    </div>
</template>

<script lang="ts">

import { useNotifier } from '@stores/notifier';
import { useSettings } from '@stores/settings';
import Notification from "@components/notifier/notification.vue";

export default {
    setup() {
        let NotifierStore = useNotifier();
        let SettingsStore = useSettings();

        return { NotifierStore, SettingsStore };
    },
    data() {
        return {
            interval: null as NodeJS.Timer | null
        }
    },
    components: { Notification },
    beforeMount() { this.interval = this.setInterval(100) },
    beforeUnmount() { this.removeInterval(); },
    methods: {
        processInterval() {
            let time = new Date().getTime();
            for (const [id, notification] of this.NotifierStore.notifications) {
                let diff = notification.timeout - time;
                if (diff <= 0) {
                    this.NotifierStore.notifications.delete(id);
                }
            }
        },
        setInterval(time: number) {
            return setInterval(this.processInterval, time);
        },
        removeInterval() {
            if (this.interval)
                clearInterval(this.interval);
        }
    }
}
</script>

<style>
.notifier_box {
    position: fixed;
    top: 0;
    right: 0;
}

.notification-list-move,
.notification-list-enter-active,
.notification-list-leave-active {
    transition: all 0.5s ease;
}

.notification-list-enter-from,
.notification-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.notification-list-leave-active {
    position: absolute;
}
</style>./notifier.vue