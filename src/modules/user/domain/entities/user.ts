import { UserRole } from './user-role';

export interface User {
  idPerson: number;
  name: string;
  eMail: string;
  // firstname: string;
  // lastname: string;
  // gender: 'male' | 'female';
  roles: UserRole[];
  metadata: any;
}
