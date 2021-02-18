<template>
  <div class="row">
    <draggable
      class="list-group"
      tag="ul"
      v-model="list"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
        <li
          class="list-group-item"
          :style="{ width: `calc(100vw / ${list.length})` }"
          v-for="element in list"
          :key="element.order"
        >
          <img :src="element.name" alt="" />
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

const message = [
  require('@/assets/imgs/img1.png'),
  require('@/assets/imgs/img2.png'),
  require('@/assets/imgs/img3.png'),
  require('@/assets/imgs/img4.png'),
  require('@/assets/imgs/img5.png')
];

export default {
  name: 'index',
  components: {
    draggable
  },
  data() {
    return {
      isDragging: false,
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      })
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  display: flex;
  min-height: 20px;
}
.list-group-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: move;

  img {
    width: 100%;
    height: 100%;
  }
}
.list-group-item i {
  cursor: pointer;
}
</style>
