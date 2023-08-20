function path(root, sublink) {
  return `${root}/${sublink}`;
}

const APP_ROOT = "";
const AUTH_ROOT = "auth";

export const PATH_DASHBOARD = {
  general: {
    app: path(APP_ROOT, "app"),
    profile: path(APP_ROOT, "profile"),
  },
  
  auth: {
    login: path(AUTH_ROOT, "login"),
    register: path(AUTH_ROOT, "register"),
    verify: path(AUTH_ROOT, "verify"),
    forgotPassword: path(AUTH_ROOT, "forgot-password"),
    resetPassword: path(AUTH_ROOT, "reset-password"),
  },
};
