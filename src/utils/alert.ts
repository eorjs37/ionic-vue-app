import { alertController } from "@ionic/vue";

const presentAlert = async (title: string, message: string, subHeader?: string | "") => {
  const alert = await alertController.create({
    header: title,
    subHeader: subHeader,
    message: message,
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "OK",
        role: "ok",
      },
    ],
  });

  await alert.present();

  const result = await alert.onDidDismiss();
  const roleData = result.role;
  return roleData;
};

export { presentAlert };
