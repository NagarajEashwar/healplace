import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

export class Config {
  static DOMAIN = '18.223.16.137';
  static BASE_URL = "http://18.223.16.137:8000/";
  static PRACTITIONER_BASE_URL = "http://18.223.16.137:8006/";
  static PAYMENT_BASE_URL = "http://18.223.16.137:8006/";
  static PAYMENT_CONNECT_URL = "http://18.223.16.137:8004/";
  static ADMIN_BASE_URL = "http://18.223.16.137:8008/";
  static CUSTOMER_BASE_URL = "http://18.223.16.137:8002/";
}

export class ThirdPConfig {
  static BASE_URL = "http://18.223.16.137:8002/";
}

export class ScoailLoginConfig {
  static CREDENTIALS = [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '687059919219-br63raufd60a3gmrtelmpgnbdhe97me3.apps.googleusercontent.com'
      )
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('4070606993029772')
    }
  ]
}
export class ZoomMeetingConfig {
  static API_KEY = 'CyJUp2VmRH-Nd9uT8FV9ew';
  static SECRET_KEY = 'ylHJhMHrxhxC0dQx4tyhKDw9cwiu5W97YdUK';
  static ZOOM_SESSION_APP_URL = 'https://zoom.nerdway.in/';
}
