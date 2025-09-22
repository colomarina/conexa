export interface StateMessageType {
  title: string;
  message: string;
  type?: "default" | "loading" | "error" | "empty";
  titleClassName?: string;
  messageClassName?: string;
}
