<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click="back()" color="primary"></ion-back-button>
        </ion-buttons>
        <ion-title>목록</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">tab2 Tab</ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from "@ionic/vue";

import { useRouter } from "vue-router";
export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
  setup() {
    const router = useRouter();
    const back = () => {
      console.log(router.getRoutes());

      //router.back();
    };
    return {
      back,
    };
  },
};
</script>

<style></style>
