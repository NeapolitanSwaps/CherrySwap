<template>
  <div class="info-box-container">
    <div class="md-layout-item">
      <img v-if="icon === 0" :src="cone1" class="svg-image" alt="Demo logo" />
      <img v-if="icon === 1" :src="cone2" class="svg-image" alt="Demo logo" />
      <img v-if="icon === 2" :src="cone3" class="svg-image" alt="Demo logo" />
    </div>
    <div class="md-layout-item">
      <md-card>
        <md-card-header>
          <div class="md-title" style="text-align:center">
            <b>{{title}}</b>
          </div>
        </md-card-header>
        <md-card-content>{{description}}</md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import cone1 from "@/assets/cone-1.svg";
import cone2 from "@/assets/cone-2.svg";
import cone3 from "@/assets/cone-3.svg";
export default {
  name: "MarketBox",
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    }
  },
  components: {},
  data() {
    return {
      cone1,
      cone2,
      cone3
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.md-card {
  background: #fff1c4;
  width: 90%;
  max-width: 450px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
}
.md-card-content {
  padding: 5%;
}
.md-card-header {
  border-bottom: 1px solid $greylight;
  height: 75px;
}
.md-title {
  color: $cherry;
}
.row {
  padding: 25px 0;
}
#row-1 {
  border-bottom: 1px solid $greylight;
}
.md-app-content .md-card {
  margin-left: 1vw;
  margin-right: 1vw;
}
.svg-image {
  height: 150px;
  margin-bottom: 20px;
}
.md-layout-item {
//   display: flex;
text-align: center;
  justify-content: center;
}
.md-card-header + .md-card-content {
  padding: 20px !important;
}
.info-box-container {
  background: $lightcherry;
  padding-bottom: 30px;
}
</style>
