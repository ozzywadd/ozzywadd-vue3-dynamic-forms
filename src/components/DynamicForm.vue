<template>
  <div
    v-for="field in schema"
    :key="field.name"
  >
    <label
      v-if="!field.hidden"
      class="block mb-2"
      :for="field.name"
    >
      {{ field.label }}
      <span
        v-if="field.required"
        class="text-red-500"
      >*</span>
      
      <input
        v-model="form.values[field.name]"
        class="block rounded p-2 mb-4 w-full"
        :class="form.errors[field.name] ? 'bg-red-100' : ''"
        :name="field.name"
        :type="field.type"
        @change="validateField(field.name)"
        @input="validateField(field.name)"
        @blur="validateField(field.name)"
      >
    </label>
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import * as yup from "yup";

export default defineComponent({
  name: "DynamicForm",
  props: {
    schema: {
      type: Array,
      required: true
    },
  },
  setup(props, context) {

    const form = ref({
      valid: false,
      values: {},
      errors: {}
    })

    const validationSchema = ref({});

    // Construct validation schema
    const getValidationSchema = () => {

      validationSchema.value = {};

      props.schema.forEach((field: any) => {
        if (field.logic) field.logic(form.value);
        if (!field.hidden) {
          validationSchema.value[field.name] = field.validation;
        }
      });

      return yup.object().shape(validationSchema.value);
    }

    // Validate Field - Triggered on input events
    const validateField = (field: string) => {

      getValidationSchema()
        .validateAt(field, form.value.values)
        .then(() => {
          delete form.value.errors[field];
        })
        .catch((err: any) => {
          form.value.errors[field] = err.message;
        });

      isFormValid();
    }

    // Validate Form - Triggered on submit events
    const validateForm = () => {
      getValidationSchema().validate(form.value.values, { abortEarly: false })
        .then(() => {
          form.value.errors = {};
          console.log("Form Valid!");
        })
        .catch((err: any) => {
          err.inner.forEach((error: any) => {
            form.value.errors[error.path] = error.message;
          });
          console.log("Form Errors!");
        });
    }

    // Check Validation - Used for submit button status
    const isFormValid = () => {
      getValidationSchema().validate(form.value.values, { abortEarly: true })
        .then(() => {
          form.value.valid = true;
        })
        .catch((err: any) => {
          form.value.valid = false;
        });
    }

    // Check initial validation status
    isFormValid();

    props.schema.forEach((field: any) => {
      form.value.values[field.name] = field.value;
    })

    // Submit form event
    const submitForm = () => {
      console.log("Form Submitted", form)
      validateForm();
    }

    return { form, validateField, submitForm };
  },
});
</script>
