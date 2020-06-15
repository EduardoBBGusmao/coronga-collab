<template>
  <div class="document">
    <!-- <button @click="requestEditingAccess">Quero editar</button> -->
    <codemirror v-model="content.text" :options="cmOptions" class="code" @changes="codeChanges"/>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/base16-dark.css';

export default {
  name: 'Document',
  components: {
    codemirror,
  },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        readOnly: (this.editor !== this.userId),
      },
    };
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    editor: {
      type: String,
      required: true,
    },
  },
  methods: {
    codeChanges(changes) {
      console.log(changes);
      // const code = JSON.stringify(change);
      // const message = { event: 'codeChange', data: code };
      // this.$socket.send(JSON.stringify(message));
      // console.log('Sent: ', message);
    },
    requestEditingAccess() {
      console.log('UserId: ', this.userId);
      console.log('Editor: ', this.editor);
      console.log('Read only? ', this.readOnly);

      const message = { event: 'newEditor', data: this.userId };
      console.log(message);
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

.CodeMirror {
  height: 80vh;
  font-size: 16px;
}
</style>
