<template>
  <div class="m-8 border p-8 w-2/3 mx-auto">
    <div
      v-for="field in formFields"
      :key="field.name"
    >
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
    <button
      class="bg-gray-200 rounded p-2 w-full mt-4"
      @click="onReset"
    >
      Reset Form
    </button>
  </div>

  <div class="m-8 border p-8 w-2/3 mx-auto">
    {{ values }}
  </div>
  <div class="m-8 border p-8 w-2/3 mx-auto">
    valid: {{ valid }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm, useFormValues, useIsFormValid } from "vee-validate";
import * as yup from "yup";
import { FieldSchema } from "../types/types";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const today = new Date().toDateString();

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
        required: true,
        validation: yup.number().required(),
      },
      {
        name: "dob",
        type: "date",
        label: "Date of Birth",
        component: "TextInput",
        validation: yup.date().max(today),
      },
      {
        name: "email",
        type: "text",
        label: "Email",
        component: "TextInput",
        validation: yup.string().email().required(),
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        component: "TextInput",
        validation: yup.string().min(8).required(),
      },
    ]);

    const getValidationSchema = (): any => {
      let validationSchema: any = {};
      formFields.value.forEach((field: FieldSchema) => {
        if (field.validation) validationSchema[field.name] = field.validation;
      });
      return validationSchema;
    };

    const theForm = useForm({
      validationSchema: getValidationSchema(),
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
