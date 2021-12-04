type AlertType = 'info' | 'warn' | 'error' | 'success';

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void;
};
let dropdownAlert: DropdownType;
interface AlertActions {
  showError: (message: any) => void;
  showSuccess: (message: any) => void;
  showInfo: (message: any) => void;
  showWarning: (message: any) => void;
}

export function setAlert(alertRef: DropdownType | null): void {
  if (alertRef) {
    dropdownAlert = alertRef;
  }
}

export function useAlerts(): AlertActions {
  return {
    showError: (message: any): void => {
      if (message) {
        dropdownAlert.alertWithType('error', 'Erro', message as string);
      }
    },
    showSuccess: (message: any): void => {
      dropdownAlert.alertWithType('success', 'Sucesso', message as string);
    },
    showInfo: (message: any): void => {
      dropdownAlert.alertWithType('info', 'Info', message as string);
    },
    showWarning: (message: any): void => {
      dropdownAlert.alertWithType('warn', 'Atenção', message as string);
    },
  };
}
