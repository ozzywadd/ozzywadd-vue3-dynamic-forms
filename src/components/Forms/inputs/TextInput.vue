<template>
  <input
    class="border rounded px-2 py-2 mb-4 w-full"
    :class="errorMessage ? 'border-2 border-red-500 bg-red-50' : ''"
  />
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
  },
  setup(props) {
    const { errorMessage } = useField(props.name);

    return { errorMessage };
  },
});
</script>
