import { IpcMainEvent } from "electron";
import { filters } from "./database";
import { BattleReport } from "./report";

export type MainProcessEventData =
    {
        name: "report-add";
        data: BattleReport;
    }
    |
    {
        name: "reports-get";
        data: {
            filters: filters;
            from: number;
            to: number;
        }
    }
    |
    {
        name: "reports-get-all";
        data: {
            from: number;
            to: number;
        }
    }
    |
    {
        name: "get-path";
        data: string;
    }

export type RendererEventData =
    {
        name: "report-add-error";
        data: string;
    }
    |
    {
        name: "report-add-success";
        data: string;
    }
    |
    {
        name: "get-path-error";
        data: string;
    }
    |
    {
        name: "reports-get-success";
        data: string;
    }
    |
    {
        name: "reports-get-all-callback";
        data: BattleReport[];
    }
    |
    {
        name: "get-path-response";
        data: string;
    };

export type RendererEvents = RendererEventData["name"];
export type MainProcessEvents = MainProcessEventData["name"];