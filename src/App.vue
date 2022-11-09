<template>
  <ion-app>
    <ion-tabs ref="carrotTab">
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tab1" :selected="tabAbleed === 1">
          <ion-icon :icon="list" />
          <ion-label>목록</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tab2" :selected="tabAbleed === 2">
          <ion-icon :icon="ellipse" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" :selected="tabAbleed === 3" @click="tabAbleed = 3">
          <ion-icon :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonLabel, IonIcon, IonTabBar, IonTabButton, IonTabs } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { PushNotifications } from "@capacitor/push-notifications";
import { ellipse, square, list } from "ionicons/icons";

const tabObject = () => {
  const tabAbleed = ref(-1);
  const carrotTab = ref(null);

  return {
    tabAbleed,
    carrotTab,
  };
};

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
    const { carrotTab, tabAbleed } = tabObject();
    onMounted(() => {
      console.log("onMounted");

      console.log("carrotTab : ", carrotTab.value);
      tabAbleed.value = 1;

      // registerNotifications();
      // addListeners();
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
      list,
      carrotTab,
      tabAbleed,
    };
  },
});
</script>
