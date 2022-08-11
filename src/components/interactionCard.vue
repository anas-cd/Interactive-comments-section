<template>
  <commentCard :commentData="interactionData" @reply="reply"></commentCard>
  <commentEditor
    v-show="repSwitch"
    :replyTo="repTo"
    :commentData="interactionData"
    @replySwitch="repS"
  ></commentEditor>
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

<style scoped lang="scss"></style>
