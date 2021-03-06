import { App } from "vue";

// import components
import TextInput from "@/components/inputs/TextInput.vue";

// register components
export const RegisterInputs = (app: App): void => {
    app.component('TextInput', TextInput);
}