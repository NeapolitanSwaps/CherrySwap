<template>
  <div class="item">
    <span class="highlight">{{ item.title }}:</span> {{ item.content }} 
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
.item span.highlight {
    color: #E4717A;
    font-style: normal;
    font-weight: bold;
}
.item span {
    width: 50%;
    display: inline-block;
    padding: 5px 0;
}
</style>
