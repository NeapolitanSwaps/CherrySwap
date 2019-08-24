<template>
  <div>
    <span class="item">{{ item.title }}:</span> {{ item.content }} 
  </div>
</template>

<script>

export default {
  name: "MarketCell",
  props: {
    item: {
        type: Object
    }
  },
//   components: { },
  data() {
      
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.item {
    color: #E4717A;
    font-style: normal;
    font-weight: 500;
}
</style>
