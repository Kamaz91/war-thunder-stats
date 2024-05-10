import IPC from "@services/ipc/IpcEvents";
import reportAddError from "./events/report-add-error";
import reportAddSuccess from "./events/report-add-success";
import getPathError from "./events/get-path-error";
import getPathResponse from "./events/get-path-response";
import reportsGetAllCallback from "./events/reports-get-all-callback";
import reportsGetSucess from "./events/reports-get-success";

IPC.registerEvent("report-add-error", reportAddError);
IPC.registerEvent("report-add-success", reportAddSuccess);

IPC.registerEvent("get-path-response", getPathResponse);
IPC.registerEvent("get-path-error", getPathError);

IPC.registerEvent("reports-get-all-callback", reportsGetAllCallback);
IPC.registerEvent("reports-get-success", reportsGetSucess);
export default IPC;