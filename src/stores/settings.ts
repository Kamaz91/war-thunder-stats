import { defineStore } from 'pinia'
import ph from "path"

type DataState = "initial" | "loading" | "loaded";

interface State {
    date: Date;
    view: string;
    states: {
        view: DataState,
        configDir: DataState;
        datasetsPath: DataState;
    },
    datasetsPath: string;
    configDir: string;
    menuList: Array<{
        name: string;
        icon: string;
    }>;
}

export const useSettings = defineStore('settings', {
    state: (): State => ({
        states: {
            configDir: "initial",
            datasetsPath: "initial",
            view: "initial"
        },
        date: new Date(),
        view: "reports",
        datasetsPath: "",
        configDir: "",
        menuList: [
            {
                name: "reports",
                icon: "lists"
            },
            {
                name: "charts",
                icon: "monitoring"
            }]
    }),
    actions: {
        setDatasetsPath(path: string) {
            this.states.datasetsPath = "loading";
            this.datasetsPath = path;
            this.states.datasetsPath = "loaded";
        },
        setConfigPath(path: string) {
            this.states.configDir = "loading";
            this.configDir = path;
            this.states.configDir = "loaded";
            this.setDatasetsPath(ph.resolve(path, "datasets", "vehicles"));
        },
        setView(viewName: string) {
            this.states.view = "loading";
            this.view = viewName;
            this.states.view = "loaded";
        }
    }
});