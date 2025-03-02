import { NotificationData, notifications } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';

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
    icon: <IconCheck />,
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
    icon: <IconExclamationMark />,
    ...props,
  });
}

export const toast = {
  success,
  error,
};
