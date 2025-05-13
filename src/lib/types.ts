export interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  updated_at?: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
  full_name: string;
  avatar?: File;
}

export interface PasswordStrength {
  score: number;
  hasMinLength: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}