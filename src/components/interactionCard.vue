<template>
  <commentCard></commentCard>
  <!-- <commentEditor></commentEditor> -->
</template>

<script>
// import commentEditor from '@/components/commentEditor.vue';
import commentCard from '@/components/commentCard.vue';
export default {
  name: 'interactionCard',
  components: {
    // commentEditor,
    commentCard,
  },
  data: function () {
    return {
      test: 'hello',
    };
  },
};
</script>

<style scoped lang="scss"></style>
