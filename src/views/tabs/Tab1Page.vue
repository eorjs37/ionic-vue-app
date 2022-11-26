<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click="back()" color="primary"></ion-back-button>
        </ion-buttons>
        <ion-title>지도</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding"> </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, useBackButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import { presentAlert } from "@/utils/alert";
export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
  },
  setup() {
    const router = useRouter();
    const back = async () => {
      console.log(router.getRoutes());
      console.log();
      const retunrData = await presentAlert("제목", "ㅇㅇㅇ");
      console.log("retunrData ; ", retunrData);
      if (retunrData === "ok") {
        // ExitAppIosPlugin.killApp().then();
        //await App.exitApp();
        (navigator as any).app.exitApp();
      }
      //router.back();
    };

    useBackButton(10, () => {
      console.log("Handler was called");
    });

    return {
      back,
    };
  },
};
</script>

<style></style>
