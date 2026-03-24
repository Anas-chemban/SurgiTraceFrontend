export type AuditLog = {
  id: number;
  user: {
    id: number;
    email: string;
  };
  action: string;
  target_type: string;
  target_id: number | null;
  ip_address: string;
  timestamp: string;
};