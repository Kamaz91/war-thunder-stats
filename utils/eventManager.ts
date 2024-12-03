import { IpcRenderer, ipcRenderer, IpcRendererEvent } from "electron";

type task<T> = { name: string; task: (event: IpcRendererEvent, arg: T) => void };

export class EventTaskManager<T> {
    private stack: task<T>[] = [];
    private channel: string = "";
    private listener: IpcRenderer;

    constructor(channel: string) {
        this.channel = channel;
        this.listener = ipcRenderer.on(channel, (event, data: T) => {
            console.log("Event received in channel", this.channel, "!");
            this.runTasks(event, data)
        });
        console.log("EventManager for", channel, "created");
    }
    public addTask(name: string, task: (ev: IpcRendererEvent, argument: T) => void): boolean {
        if (this.stack.find((el) => el.name == name)) {
            console.warn("Task", name, "is already active");
            return false;
        }
        console.log(`Task (${name}) of channel (${this.channel}) added`);
        this.stack.push({ name, task })
        return true;
    }
    public removeTask(name: string): boolean {
        const taskIndex = this.stack.findIndex((el) => el.name === name);
        if (taskIndex === -1) {
            console.warn("Task", name, "does not exist");
            return false;
        }
        this.stack.splice(taskIndex, 1);
        return true;
    }
    private runTasks(event: IpcRendererEvent, eventData: T): void {
        this.stack.forEach(({ task }) => task(event, eventData));
    }
    public getTasks(): string[] {
        return this.stack.map((el) => el.name);
    }
}