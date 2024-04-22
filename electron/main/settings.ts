import fs from "fs";
import * as Database from './database';

class cfg {
    private AppDataPath: string = undefined;

    setAppDataPath(appDataPath: string) {
        if (!appDataPath) {
            return false;
        }
        // Create the directory if it doesn't exist
        if (!fs.existsSync(appDataPath)) {
            fs.mkdirSync(appDataPath, { recursive: true });
            console.log('Created directory:', appDataPath);
        } else {
            console.log('Directory already exists:', appDataPath);
        }
        this.AppDataPath = appDataPath;
        return true;
    }

    getAppDataPath() {
        return this.AppDataPath;
    }

    async ConfigureDatabase(): Promise<boolean> {
        Database.connect(this.AppDataPath);
        console.log("isDBExists:", await Database.isExists());
        if (!await Database.isExists()) {
            return Database.createDB();
        }
        return false;
    }
}

export let Settings = new cfg();