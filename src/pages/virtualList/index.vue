<template>
  <div>
    <virtual-list
      style="height: 360px; overflow-y: auto;"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
import Item from './components/item';
import VirtualList from 'vue-virtual-scroll-list';

export default {
  name: 'list',
  data() {
    return {
      itemComponent: Item,
      items: new Array(100).fill({ uid: +new Date(), text: +new Date() })
    };
  },
  components: {
    VirtualList
  }
};
</script>

<style lang="scss" scoped></style>
