<template>
  <div class="m-8 w-2/3 mx-auto">
    <DynamicFormNew
      v-model="values"
      :schema="formSchema"
      @onSubmit="onSubmit"
      @onValueChange="onValueChange"
    />
  </div>
  <div class="m-8 w-2/3 mx-auto">
    {{ values }}
  </div>
  <div class="m-8 w-2/3 mx-auto">
    {{ formSchema }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DynamicFormNew from "@/components/DynamicFormNew.vue"
import * as yup from "yup";

export default defineComponent({
  name: "DemoNew",
  components: {
    DynamicFormNew
  },
  setup() {

    const values = ref();
    const formSchema = ref();
    const lastNameHidden = ref(true);

    const lastNameLogic = (dynamicForm: any) => {
      let firstNameVal = dynamicForm.values["first_name"];
        if (firstNameVal.length > 1) {
          lastNameHidden.value = false;
        }
        else {
          lastNameHidden.value = true;
        }

        getFormSchema();
        delete dynamicForm.errors.value["last_name"];
    }

    const getFormSchema = () => {
      formSchema.value = [
          {
            name: "first_name",
            type: "text",
            label: "First Name",
            component: "TextInput",
          },
          {
            name: "last_name",
            type: "text",
            label: "Last Name",
            component: "TextInput",
            required: true,
            hidden: lastNameHidden.value,
            validation: yup.string().required(),
            logic: lastNameLogic
          }
        ];
    }

    getFormSchema();

    const onValueChange = (newValues: any) => {
        getFormSchema();
    }

    const onSubmit = (formSubmission: Event) => {
        console.log("Form Submitted!", formSubmission);
    };

    return { values, formSchema, onSubmit, onValueChange, lastNameHidden };
  },
});
</script>
