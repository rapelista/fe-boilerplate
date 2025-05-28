import { NotificationData, notifications } from '@mantine/notifications';
import { TbCheck, TbExclamationMark } from 'react-icons/tb';

export interface ToastProps
  extends Omit<NotificationData, 'title' | 'message' | 'color' | 'icon'> {
  title?: string;
  message?: string;
}

function success({
  title = 'Success!',
  message = 'Operation completed successfully',
  ...props
}: ToastProps) {
  notifications.show({
    title,
    message,
    color: 'green',
    icon: <TbCheck />,
    ...props,
  });
}

function error({
  title = 'Error!',
  message = 'Operation failed',
  ...props
}: ToastProps) {
  notifications.show({
    title,
    message,
    color: 'red',
    icon: <TbExclamationMark />,
    ...props,
  });
}

export const toast = {
  success,
  error,
};
