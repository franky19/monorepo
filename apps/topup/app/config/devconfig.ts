// Modify this value for dev purpose. Notice that env values are string even it looks like boolean

export const IS_USING_PRODUCTION = process.env['IS_PRODUCTION'];
export const IS_USING_STAGING = process.env['IS_STAGING'] === 'true';
export const IS_SEND_ANALYTICS = process.env['IS_SEND_ANALYTICS'] === 'true';
export const IS_USING_MOCK = process.env['IS_USING_MOCK'] === 'true';
export const IS_SWITCHABLE_ENV = process.env['IS_SWITCHABLE_ENV'] === 'true';
export const TOKEN_LOGIN_DUTA = process?.env?.['TOKEN_LOGIN_DUTA'] ?? '';
export const BASE_PATH = process?.env?.['BASE_PATH'] ?? '';
export const USERNAME_AUTH_UCMS_STG =
  process?.env?.['USERNAME_AUTH_UCMS_STG'] ?? '';
export const PASSWORD_AUTH_UCMS_STG =
  process?.env?.['PASSWORD_AUTH_UCMS_STG'] ?? '';
export const USERNAME_AUTH_UCMS_PRD =
  process?.env?.['USERNAME_AUTH_UCMS_PRD'] ?? '';
export const PASSWORD_AUTH_UCMS_PRD =
  process?.env?.['PASSWORD_AUTH_UCMS_PRD'] ?? '';
