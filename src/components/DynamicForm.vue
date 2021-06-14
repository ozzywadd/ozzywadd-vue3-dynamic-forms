<template>
  <div
    v-for="field in schema"
    :key="field.name"
  >
    <label v-if="!field.hidden">
      {{ field.label }} <span v-if="field.required">*</span>
      <component
        :is="field.component"
        :type="field.type"
        :name="field.name"
        :value="field.value"
        :readonly="field.readonly"
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

  <div class="m-8 w-full mx-auto">
    DynamicForm Errors: {{ errors }}
  </div>
  <div class="m-8 w-full mx-auto">
    DynamicForm Valid: {{ valid }}
  </div>
  <div class="m-8 w-full mx-auto">
    DynamicForm validationSchema: {{ validationSchema }}
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useForm, useFormErrors, useFormValues, useIsFormValid } from "vee-validate";
import { FieldSchema } from "@/types/types";

export default defineComponent({
  name: "Single",
  components: {},
  props: {
    schema: {
      type: Object,
      required: true
    }, 
  },
  emits: ["onSubmit", "onValueChange"],
  setup(props, context) {

    let validationSchema = ref();

    const getValidationSchema = (): any => {
      let newValidationSchema = {};
      props.schema.forEach((field: FieldSchema) => {
        if (field.logic) field.logic(dynamicForm);
        if (field.validation && !field.hidden) newValidationSchema[field.name] = field.validation;
      });

      validationSchema.value = newValidationSchema;
    };

    const dynamicForm = useForm({
      validationSchema: validationSchema,      
    });

    const onSubmit = () => {
      dynamicForm.validate().then((res) => {
        if (res.valid) {
          context.emit("onSubmit", values.value);
          dynamicForm.resetForm();
        } else {
          console.log("Form submission failure", res)
        }
      });
    };

    const values = useFormValues();
    const errors = useFormErrors();
    const valid = useIsFormValid();

    watch(values.value, (newValues: Record<string, unknown>) => {
      context.emit("onValueChange", newValues);
      getValidationSchema();  
    });

    return { onSubmit, values, errors, valid, validationSchema };
  },
});
</script>
