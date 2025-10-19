export interface UserI {
  id: string;
  email: string;
  password?: string;
  is_active: boolean;
  is_superuser: boolean;
  profile?: ProfileI;
}

export interface ProfileI {
  id: string;
  full_name: string;
  phone_number: string;
  photo: string;
  birth_date: Date;
  user?: UserI;
}


