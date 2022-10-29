<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
//, Token, PushNotificationSchema, ActionPerformed
import { PushNotifications, Token } from "@capacitor/push-notifications";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    onMounted(async () => {
      let permStatus = await PushNotifications.checkPermissions();
      console.log("permStatus : ", permStatus);

      PushNotifications.requestPermissions().then(async (result) => {
        console.log("result : ", result);

        if (result.receive === "granted") {
          await PushNotifications.register();

          //get token
          PushNotifications.addListener("registration", (token: Token) => {
            console.log("Push registration success, token: " + token.value);
            localStorage.setItem("fcmToken", token.value);
          });

          //get token error
          PushNotifications.addListener("registrationError", (error: any) => {
            console.log("Error on registration: " + JSON.stringify(error));
          });

          // PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
          //   console.log("Push received: " + JSON.stringify(notification));
          // });

          // PushNotifications.addListener("pushNotificationActionPerformed", (notification: ActionPerformed) => {
          //   console.log("Push action performed: " + JSON.stringify(notification));
          // });
        }
      });
    });

    return {};
  },
});
</script>
