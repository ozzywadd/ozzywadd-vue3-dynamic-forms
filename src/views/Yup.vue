<template>
  <div class="m-8 w-2/3 mx-auto bg-gray-100 p-4">
    <div
      v-for="field in formSchema"
      :key="field.name"
    >
      <label
        class="block mb-2"
        :for="field.name"
      >
        {{ field.name }}
      </label>
      <input
        v-model="form.values[field.name]"
        class="block rounded p-2 mb-4 w-full"
        :class="form.errors[field.name] ? 'bg-red-100' : ''"
        :name="field.name"
        :type="field.type"
        @input="validateField(field.name)"
        @blur="validateField(field.name)"
      >
      <span
        v-if="form.errors[field.name]"
        class="block -mt-2 text-red-500 mb-2"
      >
        {{ form.errors[field.name] }}
      </span>
    </div>


    <button
      class="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
      :class="!form.valid ? 'opacity-25' : ''"
      :disabled="!form.valid"
      @click="submitForm"
    >
      Submit
    </button>
  </div>

  <div class="mb-4 w-2/3 mx-auto bg-gray-100 p-4">
    formSchema: {{ formSchema }}
  </div>
  <div class="mb-4 w-2/3 mx-auto bg-gray-100 p-4">
    validationSchema: {{ validationSchema }}
  </div>
  <div
    class="mb-4 w-2/3 mx-auto bg-gray-100 p-4"
    :class="form.valid ? 'bg-green-100' : 'bg-red-100'"
  >
    valid: {{ form.valid }}
  </div>
  <div class="mb-4 w-2/3 mx-auto bg-gray-100 p-4">
    values: {{ form.values }}
  </div>
  <div class="mb-4 w-2/3 mx-auto bg-gray-100 p-4">
    errors: {{ form.errors }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import * as yup from "yup";

export default defineComponent({
  name: "Yup",
  setup() {

    // re: https://vijitail.dev/blog/form-validation-in-vue-using-yup

    const form = reactive({
      valid: false,
      values: {},
      errors: {}
    })

    const getFormValidStatus =() => {
      console.log("errors:", Object.keys(form.errors).length)
      if (Object.keys(form.errors).length < 1) {
        form.valid = true
      }
      else {
        form.valid = false
      }
    }

    // OLD
    const formSchema = ref([
        {
          name: "email",
          type: "email",
          validation: yup.string().email().required()
        },
        {
          name: "password",
          type: "password",
          validation: yup.string().ensure().required().min(6)
        },
        {
          name: "confirm_password",
          type: "password",
          hidden: true,
          validation: yup.string().ensure().when("password", {
            is: (password: any) => password,
            then: yup.string().required().oneOf([yup.ref("password")], `confirm password must match the password`),
            // then: yup.string().required().oneOf([form.values.password], `confirm password must match the password`),
          })
        }
    ]);

    // NEW
    const formSchemaNew = reactive({
        name: {
          name: "email",
          type: "email",
          validation: yup.string().email().required()
        },
        password: {
          name: "password",
          type: "password",
          validation: yup.string().ensure().required().min(6)
        },
        confirm_password: {
          name: "confirm_password",
          type: "password",
          hidden: true,
          validation: yup.string().ensure().when("password", {
            is: (password: any) => password,
            then: yup.string().required().oneOf([yup.ref("password")], `confirm password must match the password`),
          })
        }
    });

    const validationSchema = reactive({});

    // NEW
    const getValidationSchema = () => {

      formSchema.value.forEach((field: any) => {
        if (!field.hidden) {
          validationSchema[field.name] = field.validation;
        }
      });

      console.log(validationSchema);
      return validationSchema;
    }

    // NEW
    const schema: any = yup.object().shape(getValidationSchema());

    const validateField = (field: string) => {
      
      console.log(form.values["password"]);

      console.log("validateField", schema)
      schema
        .validateAt(field, form.values)
        .then(() => {
          delete form.errors[field];
          getFormValidStatus()
        })
        .catch((err: any) => {
          form.valid = false;
          form.errors[field] = err.message;
          getFormValidStatus()
        });
    }

    const validateForm = () => {
      schema.validate(form.values, { abortEarly: false })
        .then(() => {
          form.errors = {};
          console.log("Form Valid!")
        })
        .catch((err: any) => {
          err.inner.forEach((error: any) => {
            form.errors[error.path] = error.message;
          });
        });
        getFormValidStatus()
    }

    const submitForm = () => {
      console.log("Form Submitted", form)
      validateForm();
    }

    return { form, formSchema, validationSchema, validateField, validateForm, getFormValidStatus, submitForm };
  },
});
</script>
