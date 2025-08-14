import { UserRole } from "./user-role";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  gender: "male" | "female";
  roles: UserRole[];
  metadata: any;
}
