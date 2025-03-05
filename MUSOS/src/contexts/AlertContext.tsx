import React, { createContext, useContext, useState } from 'react';

type AlertContextType = {
  showAlert: (message: string, header: string) => void;
  hideAlert: () => void;
  showConfirm: (message: string, header: string, onConfirm: () => void, onCancel?: () => void) => void;
  hideConfirm: () => void;
  isAlertOpen: boolean;
  alertMessage: string;
  alertHeader: string;
  isConfirmOpen: boolean;
  confirmMessage: string;
  confirmHeader: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmHeader, setConfirmHeader] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const showAlert = (message: string, header: string) => {
    setAlertMessage(message);
    setAlertHeader(header);
    setIsAlertOpen(true);
  };

  const hideAlert = () => {
    setIsAlertOpen(false);
  };

  const showConfirm = (message: string, header: string, onConfirm: () => void, onCancel?: () => void) => {
    setConfirmMessage(message);
    setConfirmHeader(header);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel || (() => {}));
    setIsConfirmOpen(true);
  };

  const hideConfirm = () => {
    setIsConfirmOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, showConfirm, hideConfirm, isAlertOpen, alertMessage, alertHeader, isConfirmOpen, confirmMessage, confirmHeader, onConfirm, onCancel }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
