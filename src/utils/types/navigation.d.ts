//
const { Routes } = Modules;

declare type PublicStackParams = {
  [Routes.LOGIN]: undefined;
};

declare type AuthenticateStackParams = {
  [Routes.RETRY_AUTH]: undefined;
  [Routes.CONFIRM_LOGIN]: undefined;
};

declare type PrivateStackParams = {
  [Routes.HOME]: undefined;
};

declare type ModalsStackParams = {
  [Routes.INFO]: {
    accessibility: string;
    text: string;
    buttonText: string;
    secondButton?: string;
    onPressSecondButton?(): void;
  };
};

declare type NavigationParams = {
  [key: string]: any;
};

// ROUTE PROP EXAMPLE
declare type InfoRoute = RouteProp<ModalsStackParams, Routes.INFO>;
