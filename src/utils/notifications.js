import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_STORAGE_KEY = 'UdaciCards:notification';

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY);
  await Notifications.dismissAllNotificationsAsync();
  await Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
  return {
    title: 'Log your stats!',
    body: "Don't forget to log your stats for today!",
    sound: true,
    vibrate: true,
    sticky: false,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  };
}

export async function setLocalNotification(setNow) {
  const item = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
  const data = JSON.parse(item);

  if (data === null) {
    const { status } = await Notifications.getPermissionsAsync();

    if (status === 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync();

      if (setNow) {
        await Notifications.scheduleNotificationAsync({
          content: createNotification(),
          trigger: {
            seconds: 5,
          },
        });
      }

      await Notifications.scheduleNotificationAsync({
        content: createNotification(),
        trigger: {
          hour: 8,
          minute: 0,
          repeats: true,
        },
      });

      AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true));
    }
  }
}
