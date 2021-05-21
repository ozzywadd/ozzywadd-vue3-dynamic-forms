<template>
  <input
    class="border rounded px-2 py-2 mb-4 w-full"
    :class="errorMessage ? 'border-2 border-red-500 bg-red-50' : ''"
    :name="name"
    :id="name"
    :type="type"
    :value="inputValue"
    @input="handleChange"
    @blur="handleBlur"
  />
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
      required: true,
    },
    type: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
});
</script>
