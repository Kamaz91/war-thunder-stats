
<template>
    <div class="menu">
        <div class="options-holder">
            <div :class="{ active: isActive(option.name) }" @click="toggleView(option.name)" v-for="option of menuList">
                <div class="menu-icon material-symbols-outlined" v-text="option.icon"></div>
                <div class="menu-text" v-text="option.name"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useSettings } from '@stores/settings'

export default {
    methods: {
        isActive(viewName: string) {
            if (viewName == this.view) { return true; }
            else { return false }
        },
        toggleView(viewName: string) {
            this.setView(viewName);
        },
        ...mapActions(useSettings, ['setView'])
    },
    computed: {
        ...mapState(useSettings, ['view']),
        ...mapState(useSettings, ['menuList']),
    }
}
</script>
<style>
.menu {
    background-color: var(--backgroundLight);
    min-height: 100%;
    color: var(--menuInActive);
    text-shadow: 1px 0px 0px #111;
    border-right: 1px solid rgba(0, 0, 0, 0.449);
    user-select: none;
}

.options-holder {
    top: 0;
    position: sticky;
}

.options-holder>div {
    display: grid;
    align-items: center;
    padding: 0.6em 0;
    font-size: 1em;
    font-weight: bold;
    font-family: Helvetica;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    flex-flow: column;
}

.options-holder>div:hover,
.active {
    color: var(--menuActive);
    background-color: #0000003a;
}

.options-holder>div:hover .menu-icon,
.active .menu-icon {
    color: rgba(25, 197, 216, 0.925);
}


.menu-icon {
    font-size: 3em;
    transition: color 0.4s ease-in-out;
}

.menu-text {
    font-size: 0.85em;
}
</style>