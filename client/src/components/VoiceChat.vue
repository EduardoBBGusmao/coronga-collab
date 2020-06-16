<template>
  <div class="voice-chat">
    <div class="info">
      <h1 class="online"> Online ({{users.length}}) </h1>
      <ul class="list">
        <li v-for="user in users" v-bind:key="user.id">
          <span class="green-icon"> ⬤ </span>
          <span> {{ user.name }} </span>
        </li>
      </ul>
    </div>

    <div class="buttons">
      <button
        :class="`button ${permission ? 'disabled' : 'edit'}`"
        @click="requestEditingAccess"
        :disabled="permission"
        >
        Permissão para editar código
      </button>
      <button v-if="!onVoiceChat" @click="onVoiceChat = !onVoiceChat" class="button green"
      >Entrar na chamada de voz
      </button>
      <button v-if="onVoiceChat" @click="onVoiceChat = !onVoiceChat" class="button red">
        Sair da chamada de voz
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoiceChat',
  data() {
    return {
      onVoiceChat: false,
    };
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    permission: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  methods: {
    requestEditingAccess() {
      const message = { event: 'newEditor', data: this.userId };
      this.$socket.send(JSON.stringify(message));
    },
  },
};
</script>

<style scoped>
.voice-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e8e8e8d1;
  margin: 20px 0;
  width: 90%;
  height: 80vh;
}

.online {
  margin: 0 5px;
  color: darkgrey;
  font-size: 16px;
  text-transform: uppercase;
  padding: 10px 10px 0;
}

.list {
  list-style: none;
  padding: 0 25px 10px;
  overflow: scroll;
}

.list::-webkit-scrollbar {
  display: none;
}

.green-icon {
  position: relative;
  bottom: 3px;
  font-size: 10px;
  color: green;
  margin-right: 5px;
  line-height: 3;
}

.button {
  display: block;
  margin: auto;
  width: 100%;
  border: none;
  background-color: #667275;
  color: white;
  padding: 20px 0;
  text-transform: uppercase;
  font-weight: 600;
}

.green { background-color: #7ab71d; }

.red { background-color: #a50c0c; }

.disabled { background-color: #667275; }

.edit { background-color: #d8a008; }
</style>
