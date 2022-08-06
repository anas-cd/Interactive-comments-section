<template>
  <div class="comments">
    <thread-list
      v-for="thread in threads"
      :key="thread.id"
      :threadData="thread"
    ></thread-list>
  </div>
  <div class="commentor">
    <commentEditor></commentEditor>
  </div>
</template>

<script>
import threadList from '@/components/threadList.vue';
import commentEditor from '@/components/commentEditor.vue';

export default {
  components: {
    threadList,
    commentEditor,
  },
  created() {
    this.$store.dispatch('fetchAll');
  },
  computed: {
    threads() {
      return this.$store.state.totalThreads;
    },
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0rem;
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  color: #2c3e50;

  .comments {
    width: 100%;
  }

  .commentor {
    border-radius: 1rem;
    width: 100%;
    &.sticky {
      position: sticky;
      bottom: 1.5rem;
      box-shadow: 2px 0px 5px 2px #5457b62e;
    }
  }
}
</style>
