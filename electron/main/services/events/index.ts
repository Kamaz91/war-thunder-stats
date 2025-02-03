import report from "./report";
import reports from "./reports";
import clipboard from "./clipboard";
import utils from "./utils";

export function RegisterEvents() {
    report();
    reports();
    clipboard();
    utils();
}