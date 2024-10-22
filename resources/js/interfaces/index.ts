export interface IRegisterInput {
  name:
    | "first_name"
    | "last_name"
    | "phone"
    | "email"
    | "password"
    | "password_confirmation"
    | "telegram"
    | "referral_code"
    | "username";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation?: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface ILoginInput {
  name: "username" | "password";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}
export interface ITelegramInput {
  name: "code";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IConfirmInput {
  name: "code";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IResetInput {
  name: "email";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}
export interface IUsernameInput {
  name: "username";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    required?: boolean;
    minLength?: number;
  };
}

export interface IErrorResponse {
  message?: string[];
  error: {
    message?: string;
    details?: {
      message?: string;
      // errors: {}[];
    };
  };
}

export interface IToken {
  token: string;
  email: string;
}

export interface ITables {
  one: string;
  two: string;
  three: string;
  four?: string;
  five?: string;
}