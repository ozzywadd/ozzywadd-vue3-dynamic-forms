<template>
  <div class="m-8 w-2/3 mx-auto bg-gray-100 p-4">
    <label class="block mb-2">Email</label>
    <input
      v-model="form.values.email"
      name="email"
      type="email"
      class="block rounded p-2 mb-4 w-full"
      :class="form.errors.email ? 'bg-red-100' : ''"
      @blur="validateField('email')"
      @input="validateField('email')"
    >
    <span
      v-if="form.errors.email"
      class="block -mt-2 text-red-500 mb-2"
    >{{ form.errors.email }}</span>

    <label class="block mb-2">Password</label>
    <input
      v-model="form.values.password"
      name="password"
      type="password"
      class="block rounded p-2 mb-4 w-full"
      :class="form.errors.password ? 'bg-red-100' : ''"
      @blur="validateField('password')"
      @input="validateField('password')"
    >
    <span
      v-if="form.errors.password"
      class="block -mt-2 text-red-500 mb-2"
    >{{ form.errors.password }}</span>

    <label class="block mb-2">Confirm Password</label>
    <input
      v-model="form.values.confirm_password"
      name="confirm_password"
      type="password"
      class="block rounded p-2 mb-4 w-full"
      :class="form.errors.confirm_password ? 'bg-red-100' : ''"
      @blur="validateField('confirm_password')"
      @keypress="validateField('confirm_password')"
    >
    <span
      v-if="form.errors.confirm_password"
      class="block -mt-2 text-red-500 mb-2"
    >{{ form.errors.confirm_password }}</span>

    <!--NEW-->
    <!-- <button
      class="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
      @click="submitForm"
    >
      Submit
    </button> -->
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
      :class="!form.valid ? 'opacity-25' : ''"
      :disabled="!form.valid"
      @click="submitForm"
    >
      Submit
    </button>
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
import { defineComponent, reactive, Ref } from "vue";
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

    // NEW
    // const formSchema = [
    //     {
    //       name: "email",
    //       hidden: true,
    //       validation: yup.string()
    //     }
    // ]


    // NEW
    // const getValidationSchema = () => {

    //   let validationSchema = {};

    //   formSchema.forEach((field: any) => {
    //     if (!field.hidden) {
    //       // add to validationSchema
    //       validationSchema[field.name] = field.validation;
    //     }
    //   });

    //   return validationSchema;
    // }

    // NEW
    //const schema: Ref<Record<string, unknown>> = yup.object().shape(getValidationSchema());

    const schema: any = yup.object().shape({
      email: yup.string().ensure().required().email(),
      password: yup.string().ensure().required(),
      confirm_password: yup.string().ensure().when("password", {
        is: (password: any) => password,
        then: yup.string().required().oneOf([yup.ref("password")], `confirm password must match the password`),
      })
    });

    const validateField = (field: any) => {
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
          //form.errors = {};
          //form.valid = true;
          console.log("Form Success")
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

    return { form, validateField, validateForm, getFormValidStatus, submitForm };
  },
});
</script>
