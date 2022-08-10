<template>
  <Transition name="reply" mode="out-in" tag="div" style="position: relative">
    <commentCard :commentData="interactionData" @reply="reply"></commentCard>
  </Transition>
  <Transition name="reply" mode="out-in" tag="div" style="position: relative">
    <commentEditor
      v-show="repSwitch"
      :replyTo="repTo"
      :commentData="interactionData"
      @replySwitch="repS"
    ></commentEditor>
  </Transition>
</template>

<script>
import commentEditor from '@/components/commentEditor.vue';
import commentCard from '@/components/commentCard.vue';
export default {
  props: ['interactionData'],
  name: 'interactionCard',
  components: {
    commentEditor,
    commentCard,
  },
  data: function () {
    return {
      test: 'hello',
      repSwitch: false,
      repTo: '',
    };
  },
  // eslint-disable-next-line no-dupe-keys
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    interactionData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    reply(user) {
      if (!this.repSwitch) {
        this.repSwitch = true;
        // this.repTo = '@' + user + ', ';
        this.repTo = user;
      } else {
        this.repSwitch = false;
        this.repTo = '';
      }
    },
    repS() {
      if (!this.repSwitch) {
        this.repSwitch = true;
      } else {
        this.repSwitch = false;
        this.repTo = '';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.reply-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.reply-enter-to {
  opacity: 1;
  transform: scale(1);
}
.reply-enter-active {
  transition: all 0.3s;
}
.reply-leave-from {
  opacity: 1;
  transform: scale(1);
}
.reply-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.reply-leave-active {
  transition: all 0.2s;
  position: absolute;
}

.reply-move {
  transition: all 0.3s ease;
}

// @keyframes shrink {
//   0% {
//     opacity: 0.3;
//     transform: translateY(0);
//   }
//   100% {
//     opacity: 0;
//     transform: translateY(-20px);
//   }
// }
</style>
