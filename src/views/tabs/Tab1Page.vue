<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click="back()" color="primary"></ion-back-button>
        </ion-buttons>
        <ion-title>Tab1</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <Banner></Banner>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, useBackButton } from "@ionic/vue";

import { presentAlert } from "@/utils/alert";
import Banner from "@/components/Banner.vue";
export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    Banner,
  },
  setup() {
    const back = async () => {
      const retunrData = await presentAlert("제목", "앱을 종료하시겠습니까?");
      if (retunrData === "ok") {
        (navigator as any).app.exitApp();
      }
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
