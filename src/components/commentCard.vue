<template>
  <div class="comment">
    <div class="votes">
      <div class="upvote" @click="updateScore(1)">
        <img src="@/assets/images/icon-plus.svg" alt="up vote" />
      </div>
      <div class="voteNumber">{{ score }}</div>
      <div class="downvote" @click="updateScore(-1)">
        <img src="@/assets/images/icon-minus.svg" alt="down vote" />
      </div>
    </div>
    <div class="commentInfo">
      <img :src="avatar" :alt="avatarOf" class="icon" />
      <span class="username">{{ commentData.user.username }}</span>
      <div class="you" v-show="isUser()"><span>you</span></div>
      <p class="date">{{ commentData.createdAt }}</p>
    </div>
    <div class="action">
      <div class="reply" v-show="!isUser()" @click="reply()">
        <img src="@/assets/images/icon-reply.svg" alt="reply" />
        <span>Reply</span>
      </div>
      <!-- <div class="reply" v-show="!isUser() && activeRep" @click="creply()">
        <img src="@/assets/images/icon-reply.svg" alt="reply" />
        <span>Cancel Reply</span>
      </div> -->
      <div
        class="delete"
        v-show="!editMode && isUser() ? true : false"
        @click="delPrompt()"
      >
        <img src="@/assets/images/icon-delete.svg" alt="delete" />
        <span>Delete</span>
      </div>
      <div
        class="edit"
        v-show="!editMode && isUser() ? true : false"
        @click="
          editModeSwitch();
          stashComment();
        "
      >
        <img src="@/assets/images/icon-edit.svg" alt="Edit" />
        <span>Edit</span>
      </div>
      <div
        class="edit"
        v-show="editMode && isUser() ? true : false"
        @click="
          editModeSwitch();
          discardChanges();
        "
      >
        <img src="@/assets/images/icon-edit.svg" alt="Edit" />
        <span>Discard</span>
      </div>
    </div>
    <div class="content" v-show="!editMode">
      <p>
        <span class="repTo">{{ replyingTo() }}</span
        >{{ commentText }}
      </p>
    </div>
    <textarea
      name="comment"
      id="1"
      cols="30"
      rows="3"
      placeholder="Add a comment..."
      spellcheck="true"
      v-show="editMode && isUser()"
      v-model="commentText"
      :class="commentText == '' ? 'textAreaWarning' : ''"
    ></textarea>
    <button
      v-show="editMode && isUser ? true : false"
      @click="
        updateComment();
        editModeSwitch();
      "
      :class="commentText == '' ? 'disabled' : ''"
      :disabled="commentText == ''"
    >
      UPDATE
    </button>
  </div>
</template>

<script>
export default {
  props: ['commentData'],
  emits: ['reply'],
  data: function () {
    return {
      editMode: false,
      commentText: this.commentData.content,
      commentStash: null,
      score: this.commentData.score,
      isReply: false,
      activeRep: false,
    };
  },
  computed: {
    avatar() {
      return this.$store.getters.getImagePath(this.commentData.user.username);
    },
    avatarOf() {
      return 'Image-' + this.commentData.user.username;
    },
  },
  // eslint-disable-next-line no-dupe-keys
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    commentData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isUser() {
      if (
        this.commentData.user.username ===
        this.$store.state.currentUser.username
      ) {
        return true;
      } else return false;
    },
    replyingTo() {
      // eslint-disable-next-line no-prototype-builtins
      if (this.commentData.hasOwnProperty('replyingTo')) {
        this.isReply = true;
        return '@' + this.commentData.replyingTo + ' ';
      }
    },
    reply() {
      this.activeRep = true;
      this.$emit('reply', this.commentData.user.username);
    },
    creply() {
      this.activeRep = false;
      this.$emit('reply', this.commentData.user.username);
    },
    editModeSwitch() {
      if (this.editMode) {
        this.editMode = false;
      } else this.editMode = true;
    },
    stashComment() {
      this.commentStash = this.commentText;
    },
    discardChanges() {
      this.commentText = this.commentData.content;
    },
    updateScore(val) {
      if (val == -1 && this.score > 0) {
        this.score += val;
        const payload = {
          idenKey: 'id',
          idenVal: this.commentData.id,
          targetKey: 'score',
          newV: this.score,
        };
        this.$store.dispatch('updateData', payload);
      } else if (val == 1) {
        this.score += val;
        const payload = {
          idenKey: 'id',
          idenVal: this.commentData.id,
          targetKey: 'score',
          newV: this.score,
        };
        this.$store.dispatch('updateData', payload);
      }
    },
    updateComment() {
      const payload = {
        idenKey: 'id',
        idenVal: this.commentData.id,
        targetKey: 'content',
        newV: this.commentText,
      };
      this.$store.dispatch('updateData', payload);
    },
    delPrompt() {
      this.$store.dispatch('delPrompt', {
        id: this.commentData.id,
        isRep: this.isReply,
      });
    },
  },
  watch: {
    commentData() {
      this.commentText = this.commentData.content;
      // this.score = this.commentData.score;
    },
  },
};
</script>

<style scoped lang="scss">
.comment {
  width: 100%;
  min-height: 144px;
  background-color: $white;
  padding: 1.5rem 1.5rem;
  border-radius: 0.8rem;
  display: grid;
  column-gap: 1.5rem;
  margin-bottom: 1rem;

  @media #{$mq-620-down} {
    padding: 1rem 1rem;
    column-gap: 0;
    row-gap: 1rem;
  }
  .votes {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    grid-row-start: 1;
    grid-row-end: 3;
    width: 40px;
    height: 100px;
    border-radius: 0.5rem;
    background-color: $very_light_gray;
    text-align: center;
    padding: 0.2rem;
    transition-duration: 100ms;
    margin-top: 0.6rem;

    @media #{$mq-620-down} {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 4;
      grid-row-end: 5;
      width: 100px;
      height: 40px;
      flex-flow: row nowrap;
      margin-top: 0;
      align-items: center;
    }

    .upvote {
      opacity: 0.6;
      transition-duration: 100ms;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
    .voteNumber {
      color: $moderate_blue;
      font-weight: 500;
    }
    .downvote {
      margin-top: -7px;
      margin-bottom: 4px;
      opacity: 0.6;
      transition-duration: 100ms;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
  .commentInfo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    grid-column-start: 2;
    grid-column-end: 3;

    @media #{$mq-620-down} {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    .icon {
      height: 2rem;
      width: 2rem;
    }
    .username {
      margin-left: 1rem;
      font-weight: 500;
      color: $dark_blue;
    }
    .you {
      margin-left: 0.5rem;
      height: 19px;
      width: 39px;
      background-color: $moderate_blue;
      color: $white;
      font-weight: 500;
      text-align: center;
      font-size: 0.8rem;
      border-radius: 0.2rem;
    }
    .date {
      margin-left: 1rem;
      color: $grayish_blue;

      @media #{$mq-620-down} {
        margin: 0;
        margin-left: 1rem;
      }
    }
  }
  .action {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    transition-duration: 100ms;
    grid-column-start: 3;
    grid-column-end: 4;
    justify-self: end;

    @media #{$mq-620-down} {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 4;
      grid-row-end: 5;
    }

    & > .reply {
      transition-duration: 200ms;
      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
      & > span {
        color: $moderate_blue;
        font-weight: 500;
        margin-left: 0.3rem;
      }
    }
    & > .delete {
      margin-left: 1rem;
      transition-duration: 200ms;
      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
      & > span {
        color: $soft_red;
        font-weight: 500;
        margin-left: 0.3rem;
      }
    }
    & > .edit {
      margin-left: 1rem;
      transition-duration: 200ms;
      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
      & > span {
        color: $moderate_blue;
        font-weight: 500;
        margin-left: 0.3rem;
      }
    }
  }
  .content {
    color: $grayish_blue;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 4;

    @media #{$mq-620-down} {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }

    & > p {
      margin: 0;
      margin-top: 0.2rem;

      @media #{$mq-620-down} {
        margin: 0;
      }
      & > .repTo {
        color: $moderate_blue;
        font-weight: 500;
      }
    }
  }
  & > button {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 3;
    grid-column-end: 4;
    justify-self: end;
    margin-top: 1rem;
    @media #{$mq-620-down} {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 5;
      grid-row-end: 6;
      margin-top: 0;
    }
  }
  & > textarea {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4;
    margin: 0;
    @media #{$mq-620-down} {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 4;
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
