<template>
  <!-- 面包屑组件 -->
  <el-breadcrumb separato-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="v in path" :to="{ path: v.name }" :key="v.name">{{v.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "Dreadcrumb",
  created() {
    this.path = this.$route.matched;
  },
  data() {
    return {
      path: []
    };
  }
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  width: 100%;
  height: 36px;
  font-family: ArialMT;
  font-size: 16px;
  color: #444;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #eaeaea;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
