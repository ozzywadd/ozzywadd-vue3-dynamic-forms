<template>
  <div class="m-8 border p-8">
    <DynamicForm :schema="formSchema" v-model="formData" @submit="onSubmit" />
  </div>

  <div class="m-8 border p-8">
    {{ formData }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormSchema } from "@/types/types";
import DynamicForm from "@/components/Forms/DymanicForm.vue";
import * as yup from "yup";

export default defineComponent({
  name: "Home",
  components: {
    DynamicForm,
  },
  setup() {
    const formData = ref({});
    const formSchema: FormSchema = {
      fields: [
        {
          label: "Your Name",
          name: "name",
          component: "TextInput",
        },
        {
          label: "Age",
          name: "age",
          component: "TextInput",
        },
        {
          label: "Your Email",
          name: "email",
          component: "TextInput",
          required: true,
        },
        {
          label: "Your Password",
          name: "password",
          component: "TextInput",
          required: true,
        },
      ],
      values: {
        name: "Austin",
      },
      validation: yup.object({
        name: yup.string(),
        age: yup.number(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
      }),
    };

    function onSubmit() {
      console.log(formData.value);
    }

    return { formSchema, formData, onSubmit };
  },
});
</script>
