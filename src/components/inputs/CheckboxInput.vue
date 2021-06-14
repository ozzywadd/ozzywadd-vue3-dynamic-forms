<template>
  <input
    :id="name"
    class="border rounded px-2 py-2 mb-4 w-full"
    :class="[
      errorMessage ? 'border-2 border-red-500 bg-red-50' : '',
      readonly ? 'bg-gray-100' : ''
    ]"
    :name="name"
    :type="type"
    :value="inputValue"
    :readonly="readonly"
    @input="handleChange"
    @blur="handleBlurAndValidate"
  >
  <span class="block text-red-500 -mt-2 mb-2">{{ errorMessage }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
  name: "TextInput",
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
    },
  },
  setup(props) {

    const {
      value: inputValue,
      errorMessage,
      meta,
      validate,
      handleBlur,
      handleChange,
    } = useField(props.name, undefined, {
      initialValue: props.value
    });

    const handleBlurAndValidate = () => {
      validate();
    }

    return {
      inputValue,
      errorMessage,
      meta,
      handleChange,
      handleBlur,
      handleBlurAndValidate
    };
  },
});
</script>
