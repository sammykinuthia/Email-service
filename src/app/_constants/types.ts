export interface BaseEmailProp {
  subject: string;
  intro: string;
  to: string;
  key: string;
  email?: string;
  body?: string;
  [key: string]: any;
}
