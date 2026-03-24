export type Alert = {
  id: number;
  type: "VIDEO_NOT_RECORDED" | "ACCESS_DENIED";
  message: string;
  surgery: number;
  severity: "low" | "medium" | "high";
  created_at: string;
};