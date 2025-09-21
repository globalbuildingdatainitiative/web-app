import { notifications } from '@mantine/notifications'

export function showSuccessNotification(title: string, message: string) {
  notifications.show({
    title,
    message,
    color: 'green',
  })
}

export function showErrorNotification(title: string, message: string) {
  notifications.show({
    title,
    message,
    color: 'red',
  })
}

export function showInfoNotification(title: string, message: string) {
  notifications.show({
    title,
    message,
    color: 'blue',
  })
}

export function showWarningNotification(title: string, message: string) {
  notifications.show({
    title,
    message,
    color: 'yellow',
  })
}
