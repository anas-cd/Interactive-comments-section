<template>
  <div class="commentor" id="commentor">
    <img :src="avatar" :alt="avatarOf" class="avatar" />
    <textarea
      name="comment"
      id="text"
      cols="30"
      rows="3"
      placeholder="Add a comment..."
      :class="setRep ? 'rep' : ''"
      v-model="commentText"
    ></textarea>
    <button v-show="!setRep">send</button>
    <button v-show="setRep">reply</button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  props: ['replyTo'],
  name: 'commentEditor',
  data: function () {
    return {
      commentText: this.replyTo,
    };
  },
  // eslint-disable-next-line no-dupe-keys
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    replyTo: {
      type: String,
      required: false,
    },
  },
  computed: {
    /* this works too instead of def each property by its own*/
    // ...mapGetters({ avatar: 'getImagePath' }),
    avatar() {
      return this.$store.getters.getImagePath(
        this.$store.state.currentUser.username
      );
    },
    avatarOf() {
      return this.$store.state.currentUser.username;
    },
    isRep() {
      return this.$store.state.repMode;
    },
    setRep() {
      return this.replyTo ? true : false;
    },
  },
  methods: {},
  watch: {
    replyTo() {
      this.commentText = this.replyTo;
    },
  },
};
</script>

<style scoped lang="scss">
.commentor {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  min-height: 144px;
  background-color: $white;
  padding: 1.5rem;
  border-radius: 0.7rem;
  transition-duration: 100ms;
  margin-bottom: 1rem;
  @media #{$mq-620-down} {
    flex-flow: row wrap;
    padding: 1rem;
  }

  img.avatar {
    width: 40px;
    height: 40px;
    margin-top: 4px;

    @media #{$mq-620-down} {
      order: 2;
    }
  }
}
</style>
