<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from "@capacitor/push-notifications";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    onMounted(() => {
      PushNotifications.requestPermissions().then((result) => {
        console.log(result);
        if (result.receive === "granted") {
          PushNotifications.register();
          pushnotificationEvent();
        }
      });
    });

    const pushnotificationEvent = () => {
      PushNotifications.addListener("registration", (token: Token) => {
        console.log("Push registration success, token: " + token.value);
      });

      PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
        console.log("Notification received:", notification);
      });

      PushNotifications.addListener("pushNotificationActionPerformed", (notification: ActionPerformed) => {
        console.log("Push notification action performed", notification.actionId, notification.inputValue);
      });
    };

    return {
      pushnotificationEvent,
    };
  },
});
</script>
