export interface IpcRequest<T> {
    status: boolean;
    request: T;
}