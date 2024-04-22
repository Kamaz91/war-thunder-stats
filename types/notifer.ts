export interface NotifierNotification {
    id: string;
    text: string;
    isPermament: boolean;
    additionalText: string;
    timeout: number;
    type: NotifierNotificationType;
}

export type NotifierNotificationType = "success" | "error" | "warning";