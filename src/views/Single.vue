<template>
  <div class="m-8 w-2/3 mx-auto">
    <DynamicForm
      v-model="values"
      :schema="formSchema"
      @onSubmit="onSubmit"
    />
    Values: {{ values }}

    Toggle: {{ toggleVal }}
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import DynamicForm from "@/components/DynamicForm.vue"
import * as yup from "yup";
import { FieldSchema } from "@/types/types";

export default defineComponent({
  name: "Single",
  components: {
    DynamicForm
  },
  setup() {

    const values = ref({});
    const toggleVal = ref();

    watch(values, (newVal) => {
      toggleVal.value = newVal["toggle"];
    });
    
    const formSchema: Ref<FieldSchema[]> = ref([
      {
        name: "name",
        type: "text",
        label: "Name",
        component: "TextInput",
        value: "Austin Waddecar",
        readonly: true
      },
      {
        name: "age",
        type: "number",
        label: "Age",
        component: "TextInput",
        required: true,
        validation: yup.string().required(),
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
        required: true,
        validation: yup.string().email().required(),
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        component: "TextInput",
        required: true,
        validation: yup.string().min(8).required(),
      },
      {
        name: "toggle",
        type: "text",
        label: "Toggle",
        component: "TextInput",
        value: ""
      },
      {
        name: "hidden",
        type: "text",
        label: "Hidden",
        component: "TextInput",
        required: true,
        hidden: values.value["toggle"],
        value: toggleVal.value,
        validation: yup.string().required()
      }
    ]);

    const onSubmit = (formSubmission: Event) => {
        console.log("Form Submitted!", formSubmission);
    };

    return { values, formSchema, onSubmit, toggleVal };
  },
});
</script>
