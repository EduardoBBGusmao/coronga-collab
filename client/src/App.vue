<template>
  <div id="app">
    <Modal v-if="showModal" @close="showModal = false" />
    <Menu />
    <div class="content">
      <div class="w-75"> <Document :content="content" :userId="userId" :editor="editor" /> </div>
      <div class="w-25"> <VoiceChat :users="users" /> </div>
    </div>
  </div>
</template>

<script>
import Modal from './components/Modal.vue';
import Menu from './components/Menu.vue';
import Document from './components/Document.vue';
import VoiceChat from './components/VoiceChat.vue';

export default {
  name: 'App',
  components: {
    Modal,
    Menu,
    Document,
    VoiceChat,
  },
  data() {
    return {
      showModal: true,
      userId: '',
      users: [],
      code: '',
      editor: '',
      content: {
        id: '',
        text: '',
      },
    };
  },
  methods: {
    listenEvents() {
      const vm = this;
      this.$socket.onmessage = function (payload) {
        const message = JSON.parse(payload.data);

        if (message.event === 'connect') {
          vm.userId = message.data;
          if (vm.editor !== '') vm.editor = message.data;
        } else if (message.event === 'newUser') {
          vm.users = message.data;
        } else if (message.event === 'codeChange') {
          vm.content = {
            id: message.data.id,
            text: message.data.text,
          };
        } else if (message.event === 'newEditor') {
          vm.editor = message.data;
        }
      };
    },
  },
  mounted() {
    this.listenEvents();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
  display: flex;
  margin: 0 50px;
  justify-content: space-between;
}

.w-75 {
  width: 75%;
}

.w-25 {
  width: 25%;
}
</style>
