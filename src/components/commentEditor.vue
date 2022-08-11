<template>
  <div class="commentor">
    <img :src="avatar" :alt="avatarOf" class="avatar" />
    <textarea
      name="comment"
      cols="30"
      rows="3"
      placeholder="Add a comment..."
      spellcheck="true"
      :class="(setRep ? 'rep' : '', commentText == '' ? 'textAreaWarning' : '')"
      v-model="commentText"
    ></textarea>
    <button
      v-show="!setRep"
      @click="addComment()"
      :class="commentText == '' || commentText == null ? 'disabled' : ''"
      :disabled="commentText == '' || commentText == null"
    >
      send
    </button>
    <button
      v-show="setRep"
      @click="
        addComment();
        reply();
      "
      :class="
        commentText == '' || commentText === this.initialText ? 'disabled' : ''
      "
      :disabled="commentText == '' || commentText === this.initialText"
    >
      reply
    </button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  props: ['replyTo', 'commentData'],
  emits: ['replySwitch'],
  name: 'commentEditor',
  data: function () {
    return {
      commentText: this.replyTo,
      initialText: '',
    };
  },
  // eslint-disable-next-line no-dupe-keys
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    replyTo: {
      type: String,
      required: false,
    },
    // eslint-disable-next-line vue/no-dupe-keys
    commentData: {
      type: Object,
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
  methods: {
    addComment() {
      let commentPayload = {};
      if (this.replyTo) {
        commentPayload = {
          repToId: this.commentData.id,
          commentData: {
            id: this.getNewId(),
            content: this.commentContent(),
            createdAt: '10 hours ago',
            score: 0,
            replyingTo: this.replyTo,
            user: this.$store.state.currentUser,
          },
        };
        this.$store.dispatch('addComment', commentPayload);
      } else {
        commentPayload = {
          repToId: null,
          commentData: {
            id: this.getNewId(),
            content: this.commentText,
            createdAt: '10 hours ago',
            score: 0,
            user: this.$store.state.currentUser,
            replies: [],
          },
        };
        this.$store.dispatch('addComment', commentPayload);
        this.commentText = '';
      }
    },
    getNewId() {
      let id = ++this.$store.state.idCount;
      this.$store.dispatch('updateId', id);
      return id;
    },
    reply() {
      this.$emit('replySwitch');
    },
    commentContent() {
      let defStr = '@' + this.replyTo + ', ';
      let tempStr = this.commentText;
      let afterSlice = tempStr.slice(0, defStr.length);
      if (defStr === afterSlice) {
        let slicingLength = defStr.length;
        let updatedString = this.commentText.slice(slicingLength);
        return updatedString;
      } else return this.commentText;
    },
  },
  watch: {
    replyTo() {
      this.commentText = '@' + this.replyTo + ', ';
      this.initialText = '@' + this.replyTo + ', ';
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
  background-color: $white;
  padding: 1.5rem;
  border-radius: 0.7rem;
  transition-duration: 300ms;
  margin-bottom: 1rem;
  overflow: hidden;
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
  // helpers :
  & .disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  & .textAreaWarning {
    border-color: $soft-red;
  }
}
</style>
