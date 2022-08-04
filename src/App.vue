<template>
  <h1>starting here</h1>
  <div class="comments">
    <h2>threadList</h2>
    <thread-list></thread-list>
    <thread-list></thread-list>
  </div>
  <div class="commentor">
    <h2>commentor here</h2>
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
}
</style>
