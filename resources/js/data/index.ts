import {
  IConfirmInput,
  ILoginInput,
  IRegisterInput,
  IResetInput,
  ITelegramInput,
} from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "first_name",
    placeholder: "Type your FirstName ..",
    type: "text",
    forl: "firstname",
    placel: "FirstName :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
  {
    name: "last_name",
    placeholder: "Type your LastName ..",
    type: "text",
    forl: "lastname",
    placel: "LastName :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
  {
    name: "phone",
    placeholder: "Type your Phone number ..",
    type: "text",
    forl: "name",
    placel: "Phone :",
  },
  {
    name: "email",
    placeholder: "Type your Email ..",
    type: "email",
    forl: "email",
    placel: "Email :",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "username",
    placeholder: "Type your Username ..",
    type: "text",
    forl: "username",
    placel: "Username :",
  },
  {
    name: "password",
    placeholder: "Type your Password ..",
    type: "password",
    forl: "password",
    placel: "Password :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "password_confirmation",
    placeholder: "Type your password Confirmation ..",
    type: "password",
    forl: "password_confirmation",
    placel: "Password Confirmation :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "telegram",
    placeholder: "Type your Telegram username ..",
    type: "text",
    forl: "telegram_username",
    placel: "Telegram username :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "referral_code",
    placeholder: "Type your Referral Code ..",
    type: "text",
    forl: "referral_code",
    placel: "Referral Code :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "username",
    placeholder: "type-your-username",
    type: "text",
    forl: "username",
    placel: "Username :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
  {
    name: "password",
    placeholder: "type-your-password",
    type: "password",
    forl: "password",
    placel: "Password :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const RESET_FORM: IResetInput[] = [
  {
    name: "email",
    placeholder: "Type your Email ..",
    type: "email",
    forl: "email",
    placel: "Email :",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
];
export const TELEGRAM_FORM: ITelegramInput[] = [
  {
    name: "code",
    placeholder: "Enter code sent to your Telegram ..",
    type: "text",
    forl: "code",
    placel: "Code :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
];
export const CONFIRM_FORM: IConfirmInput[] = [
  {
    name: "code",
    placeholder: "Enter code sent to your Email ..",
    type: "text",
    forl: "code",
    placel: "Code :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
];
