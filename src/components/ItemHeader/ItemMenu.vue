<template>
    <el-menu-item  v-if="item && !item.list && item.visible" :index="index"><a :href="item.path || 'javascript:void(0)'">{{item.name}}</a></el-menu-item>
    <el-submenu v-else-if="item && item.list && item.visible" :index="index">
        <template slot="title"><a :href="item.path || 'javascript:void(0)'">{{item.name}}</a></template>
        <item-menu :key="obj.id" :preindex="`${index}`" :item="obj" v-for="obj in item.list"></item-menu>
    </el-submenu>
</template>
<script>
import ItemMenu from "@/components/ItemHeader/ItemMenu";

export default {
  name: "ItemMenu",
  props: ["item", "preindex"],
  components: {
    ItemMenu
  },
  data() {
    return {
      index: "1"
    };
  },
  methods: {
    init() {
      if (this.item) {
        if (this.preindex) {
          this.index = `${this.preindex}-${this.item.id}`;
        } else {
          this.index = `${this.item.id}`;
        }
      }
    }
  },
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu--horizontal a {
  display: inline-block;
  width: 100%;
}
</style>
