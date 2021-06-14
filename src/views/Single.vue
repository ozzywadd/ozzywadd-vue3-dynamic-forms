<template>
  <div class="m-8 w-2/3 mx-auto bg-gray-100 p-4">
    <DynamicForm :schema="formSchema" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DynamicForm from "@/components/DynamicForm.vue";
import * as yup from "yup";

export default defineComponent({
  name: "Single",
  components: {
    DynamicForm
  },
  setup() {

    const isToggleTrue = (form: any) => {
      let toggleVal: boolean = form.values["use_password"];

      formSchema.value.forEach(field => {
        if (field.name === "password") {
          toggleVal ? field.hidden = false : field.hidden = true && delete form.values["password"] && delete form.errors["password"];
        }
      })
    }

    const formSchema = ref([
        {
          name: "email",
          label: "Email",
          type: "email",
          value: "a.wadde",
          required: true,
          validation: yup.string().email().required()
        },
        {
          name: "use_password",
          label: "Use Password?",
          type: "checkbox",
          validation: yup.boolean()
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          hidden: true,
          validation: yup.string().required(),
          logic: isToggleTrue
        },
    ]);

    return { formSchema };
  },
});
</script>
