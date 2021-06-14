import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "tailwindcss/tailwind.css"
import { RegisterInputs } from "@/components/inputs/RegisterInputs"

const app = createApp(App).use(router);

RegisterInputs(app);
app.mount("#app")
