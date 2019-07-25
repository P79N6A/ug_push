<template>
    <el-menu-item v-if="item && !item.list && item.visible" :index="index">
      <i v-if="item.fid === 0" :class="getIcon(icon)"></i>
      <a v-if="isOutside" :href="item.path || 'javascript:void(0)'" target="_blank">{{item.name}}</a>
      <span v-else>{{item.name}}</span>
    </el-menu-item>
    <el-submenu v-else-if="item && item.list && item.visible" :index="index">
      <template slot="title">
        <i v-if="item.fid === 0" :class="getIcon(icon)"></i>
        <a v-if="isOutside" :href="item.path || 'javascript:void(0)'" target="_blank">{{item.name}}</a>
        <span v-else>{{item.name}}</span>
      </template>
      <item-menu :key="obj.id" :item="obj" v-for="obj in item.list"></item-menu>
    </el-submenu>
</template>
<script>
import ItemMenu from "@/components/ItemAside/ItemMenu";

const icons = ['el-icon-monitor', 'el-icon-data-analysis', 'el-icon-sold-out', 'el-icon-user', 'el-icon-c-scale-to-original', 'el-icon-set-up', 'el-icon-medal', 'el-icon-s-grid', 'el-icon-news', 'el-icon-time', 'el-icon-document', 'el-icon-edit-outline', 'el-icon-edit', 'el-icon-film', 'el-icon-setting', 'el-icon-s-management'];

export default {
  name: "ItemMenu",
  props: ["item", "icon"],
  components: {
    ItemMenu
  },
  data() {
    return {
      index: "",
      isOutside: false // 导航是否外链
    };
  },
  methods: {
    init() {
      if (this.item) {
        const path = this.item.path;
        const id = this.item.id.toString();
        this.index = path ? this.getPath(path, id) : id; // path不存在，则用id作为导航的唯一标识
      }
    },
    getIcon(k) {
      const n = icons.length;
      return icons[k % n];
    },
    getPath(path, id) {
      const arr = path.split('#');
      this.isOutside = arr[1] ? false : true;
      return arr[1] ? arr[1] : id;
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
