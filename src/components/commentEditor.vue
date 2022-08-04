<template>
  <div class="commentor" id="commentor">
    <img
      src="@/assets/images/avatars/image-amyrobson.png"
      alt="avatarOf"
      class="avatar"
    />
    <textarea
      name="comment"
      id="text"
      cols="30"
      rows="3"
      placeholder="Add a comment..."
      class="rep"
    ></textarea>
    <button>send</button>
    <button>reply</button>
  </div>
</template>

<script>
export default {
  name: 'commentEditor',
  data: function () {
    return {
      avatar: '',
    };
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

  &.sticky {
    position: sticky;
    bottom: 1.5rem;
    box-shadow: 2px 0px 5px 2px #5457b62e;
  }
}
</style>
