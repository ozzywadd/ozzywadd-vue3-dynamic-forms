<template>
  <Form
    :validation-schema="schema.validation"
    :initial-values="schema.values"
    @submit="onSubmit"
  >
    <div v-for="field in schema.fields" :key="field.name">
      <label class="w-full block mb-1" :for="field.name">
        {{ field.label }}
        <span v-if="field.required">*</span>
      </label>
      <Field
        :id="field.name"
        :name="field.name"
        :as="field.component"
        :value="schema.values[field.name]"
        @input="updateForm(field.name, $event.target.value)"
      />
      <ErrorMessage :name="field.name" class="block text-red-500 -mt-2 mb-4" />
    </div>

    <button
      type="submit"
      class="bg-blue-500 p-2 rounded w-full mt-4 text-white"
    >
      Submit
    </button>
  </Form>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "DynamicForm",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  props: {
    modelValue: Object,
    schema: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formData: Ref = ref(props.modelValue);

    function updateForm(fieldKey: string, value: any): void {
      formData.value[fieldKey] = value;
    }

    Object.keys(props.schema.values).forEach((key) => {
      updateForm(key, props.schema.values[key]);
    });

    function onSubmit() {
      alert("Submitted!");
    }

    return { formData, updateForm, onSubmit };
  },
});
</script>
