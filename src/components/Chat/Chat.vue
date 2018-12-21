<template>
  <section class="section" ref="section">
    <transition-group v-if="room !== null" class="columns is-multiline" name="show">
      <message
        v-for="message in room.messages"
        :key="message.date.seconds"
        :message="message"
        :user="message.uid === user.id ? user : bros"
        class="column is-full"
      />
    </transition-group>
    <b-field class="input-field has-background-light" grouped>
      <div class="control is-expanded" :class="{'is-loading': isSending}">
        <textarea
          class="textarea has-fixed-size"
          :rows="rows"
          v-model="msg"
          @keydown.meta.enter="send"
        />
      </div>
      <button
        class="button is-success is-medium"
        :class="{'is-loading': isSending}"
        @click="send"
      >send</button>
    </b-field>
  </section>
</template>

<script>
import firebase from "../../firebase";
import Message from "./Message";

export default {
  name: "Chat",
  components: { Message },
  props: {
    id: String,
    user: Object
  },
  data() {
    return {
      room: null,
      bros: null,
      msg: "",
      isSending: false,
      section: null
    };
  },
  async created() {
    if (!this.user.chatRoom || !this.user.chatRoom[this.id]) {
      await fetch(`${firebase.endpoint}/chat/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: this.user.id, brosID: this.id })
      })
        .then(x => x.json())
        .then(x => x.roomID);
    }

    this.bros = await fetch(`${firebase.endpoint}/user/${this.id}`).then(x =>
      x.json()
    );

    this.unsubs = firebase
      .Instence()
      .collection("chat")
      .doc(this.user.chatRoom[this.id])
      .onSnapshot(ss => {
        this.room = ss.data();
        this.scrollBottom();
      });
  },
  beforeDestroy() {
    if (this.unsubs) this.unsubs();
  },
  methods: {
    time(date) {
      const dateObj = new Date(date.seconds * 1000);
      return dateObj.getHours() + " : " + dateObj.getMinutes();
    },
    async send() {
      if (/\S+/.test(this.msg)) {
        try {
          this.isSending = true;
          this.scrollBottom();
          await fetch(
            `${firebase.endpoint}/chat/${this.user.chatRoom[this.id]}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userID: this.user.id, message: this.msg })
            }
          );

          this.msg = "";
          this.isSending = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, this.section.scrollHeight);
      });
    }
  },
  computed: {
    rows() {
      return this.msg.split("\n").length;
    }
  },
  mounted() {
    this.section = this.$refs.section;
  }
};
</script>

<style lang="scss" scoped>
.input-field {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
}

.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease-in-out;
}

.show-enter,
.show-leave-to {
  transform: translateX(100%);
}
</style>
