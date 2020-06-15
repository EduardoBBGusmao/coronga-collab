<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2 name="header">Digite seu nome:</h2>
          </div>

          <div class="modal-body">
            <input type="text" placeholder="Seu nome" v-model="userName" class="input" autofocus>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="setUserName">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Anônimo',
    };
  },
  methods: {
    setUserName() {
      this.$socket.send(JSON.stringify({ event: 'newUser', data: this.userName }));
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  width: 100%;
  align-self: center;
  justify-content: center;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h2 {
  color: #216471;
}

.modal-body {
  width: 100%;
  max-width: 275px;
}

.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d8d8d0;
  border-radius: 3px;
}

.modal-default-button {
  width: 100%;
  background-color: #216471;
  color: white;
  border: none;
  margin: 15px auto;
  padding: 8px 15px;
  border-radius: 3px;
}
</style>
