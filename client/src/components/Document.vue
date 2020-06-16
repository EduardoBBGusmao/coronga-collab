<template>
  <div class="document">
    <codemirror
      v-model="text"
      :options="cmOptions"
      class="code"
      @input="codeChanges"/>
    </div>
</template>

<script>
import 'codemirror/theme/base16-dark.css';

export default {
  name: 'Document',
  data() {
    return {
      text: '',
      cmOptions: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        readOnly: false,
      },
    };
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    permission: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    permission: {
      immediate: true,
      handler(val) {
        this.cmOptions.readOnly = !val;
      },
    },
    content: {
      immediate: true,
      handler(val) {
        this.text = val;
      },
    },
  },
  mounted() {
  },
  methods: {
    codeChanges(changes) {
      const message = { event: 'codeChange', data: changes };
      this.$socket.send(JSON.stringify(message));
    },
  },
};
</script>

<style>
.document {
  margin: 20px auto;
  width: 90%;
}

.cm-s-base16-dark.CodeMirror {
  height: 80vh;
  font-size: 16px;
}
</style>
