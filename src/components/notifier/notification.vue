<template>
    <div class="notification-item">
        <div class="notification-item-mark" :class="{ warning: isWarning(), error: isError(), success: isSuccess() }">
            <div class="emblem-big emblem-center material-symbols-outlined" v-text="symbol"></div>
        </div>
        <div class="notification-item-content">
            <div>
                <span v-text="notification.text"></span>
            </div>
            <div>
                <span v-text="notification.additionalText"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

//import { clearInterval, setInterval } from "node:timers"
import type { PropType } from 'vue'
import { useNotifier } from '@stores/notifier'
import { NotifierNotification } from '@/types/notifer';

export default {
    setup() {
        let NotifierStore = useNotifier();
        return { NotifierStore };
    },
    props: {
        id: {
            required: true,
            type: String
        },
        notification: { required: true, type: Object as PropType<NotifierNotification> }
    },
    data() {
        return {
            interval: null as NodeJS.Timer | null
        }
    },
    beforeMount() {
        this.interval = this.setInterval(100);
    },
    beforeUnmount() { this.removeInterval(); },
    computed: {
        symbol() {
            switch (this.notification.type) {
                case "warning": return "warning";
                case "error": return "release_alert";
                case "success": return "check_box";
            }
        }
    },
    methods: {
        isWarning() {
            return this.notification.type == "warning";
        },
        isError() {
            return this.notification.type == "error";
        },
        isSuccess() {
            return this.notification.type == "success";
        },
        setInterval(time: number) {
            return setInterval(this.processInterval, time);
        },
        processInterval() {
            this.changeProgressBar();
        },
        changeProgressBar() {

        },
        removeInterval() {
            if (this.interval)
                clearInterval(this.interval);
        }
    }
}
</script>

<style>
.notification-item {
    background: var(--background);
    margin-top: 0.1em;
    margin-bottom: 0.7em;
    border-radius: 4px 0 0 4px;
    box-shadow: 0px 0px 15px 1px #111111, 0px 0px 1px #555 inset;
    display: flex;
    border: 1px solid #000;
    border-right: none;
    overflow: hidden;
}

.notification-item-mark {
    display: flex;
    padding: 5px;
    border-right: 1px solid #000;
    box-shadow: 0px 0px 1px 1px #ffffff66 inset;
}

.notification-item-mark>div {
    height: auto;
}

.notification-item-content {
    color: var(--darkText);
    padding: 5px 0.4em;
    white-space: nowrap;
    border-left: 1px solid #444;
}

.warning {
    background: #ffc108;
}

.error {
    background: #f76961;
}

.success {
    background: #0fc47d;
}
</style>