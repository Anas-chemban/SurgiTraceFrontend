export type Surgery = {
  id: number;
  title: string;
  description: string;
  scheduled_time: string;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  created_by: number;
};