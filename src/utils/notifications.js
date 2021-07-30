import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_STORAGE_KEY = 'UdaciCards:notification';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
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

export async function setLocalNotification() {
  const item = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
  const data = JSON.parse(item);

  if (data === null) {
    const { status } = await Notifications.getPermissionsAsync();

    if (status === 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20);
      tomorrow.setMinutes(0);

      // New Notification API does not allow repeat 'daily' at specific dates
      // For now, repeat every 24 hours
      // TODO: Set notification to repeat at 8:00am everyday
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: createNotification(),
        trigger: {
          hour: 23,
          minute: 59,
          repeats: true,
        },
      });

      AsyncStorage.setItem(
        NOTIFICATION_STORAGE_KEY,
        JSON.stringify(notificationId)
      );
    }
  }
}
