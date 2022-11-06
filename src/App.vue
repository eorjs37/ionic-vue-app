<template>
  <ion-app>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Tab1Page">
          <ion-icon :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" selected>
          <ion-icon :icon="ellipse" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3">
          <ion-icon :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonLabel, IonIcon, IonTabBar, IonTabButton, IonTabs } from "@ionic/vue";
import { defineComponent, onMounted } from "vue";
import { PushNotifications } from "@capacitor/push-notifications";
import { ellipse, square, triangle } from "ionicons/icons";

export default defineComponent({
  name: "App",
  components: {
    IonLabel,
    IonIcon,
    IonTabBar,
    IonApp,
    IonRouterOutlet,
    IonTabs,
    IonTabButton,
  },
  setup() {
    onMounted(() => {
      console.log("onMounted");
      registerNotifications();
      addListeners();
    });

    const addListeners = async () => {
      await PushNotifications.addListener("registration", (token) => {
        console.info("Registration token: ", token.value);
        localStorage.setItem("token", token.value);
      });

      await PushNotifications.addListener("registrationError", (err) => {
        console.error("Registration error: ", err.error);
      });

      await PushNotifications.addListener("pushNotificationReceived", (notification) => {
        console.log("Push notification received: ", notification);
      });

      await PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
        console.log("Push notification action performed", notification.actionId, notification.inputValue);
      });
    };

    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        throw new Error("User denied permissions!");
      }

      await PushNotifications.register();
    };

    return {
      addListeners,
      registerNotifications,
      ellipse,
      square,
      triangle,
    };
  },
});
</script>
