<template>
  <div class="m-8 border p-8">
    <div v-for="field in formFields" :key="field.name">
      <label>
        {{ field.label }}
        <component
          :is="field.component"
          :type="field.type"
          :name="field.name"
          :value="field.value"
        />
      </label>
    </div>
    <button
      class="text-white rounded p-2 w-full mt-4"
      :class="
        valid ? 'bg-blue-500 cursor-pointer' : 'bg-blue-300 cursor-not-allowed'
      "
      :disabled="!valid"
      @click="onSubmit"
    >
      Submit
    </button>
    <button class="bg-gray-200 rounded p-2 w-full mt-4" @click="onReset">
      Reset Form
    </button>
  </div>

  <div class="m-8 border p-8">
    {{ values }}
  </div>
  <div class="m-8 border p-8">valid: {{ valid }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm, useFormValues, useIsFormValid } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const formFields = ref([
      {
        name: "name",
        type: "text",
        label: "Name",
        component: "TextInput",
      },
      {
        name: "age",
        type: "number",
        label: "Age",
        component: "TextInput",
      },
      {
        name: "dob",
        type: "date",
        label: "Date of Birth",
        component: "TextInput",
      },
      {
        name: "email",
        type: "text",
        label: "Email",
        component: "TextInput",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        component: "TextInput",
      },
    ]);

    const today = new Date().toDateString();

    const formSchema = yup.object({
      dob: yup.date().max(today),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    });

    const theForm = useForm({
      validationSchema: formSchema,
      validateOnMount: true,
    });

    const onSubmit = () => {
      theForm.validate().then((res) => {
        console.log(res.results);
        if (res.valid) {
          alert("Form Valid!");
        } else {
          alert("Form Invalid!");
        }
      });
    };

    const onReset = () => {
      theForm.resetForm();
      theForm.validate();
    };

    const values = useFormValues();
    const valid = useIsFormValid();

    return { formFields, onSubmit, onReset, values, valid };
  },
});
</script>
