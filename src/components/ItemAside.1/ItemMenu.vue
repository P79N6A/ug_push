<template>
    <a v-if="item && !item.list && item.visible" :href="item.path || 'javascript:void(0)'"><el-menu-item :index="index"><i v-if="item.fid === 0" :class="getIcon(icon)"></i><span>{{item.name}}</span></el-menu-item></a>
    <el-submenu v-else-if="item && item.list && item.visible" :index="index">
        <template slot="title"><a :href="item.path || 'javascript:void(0)'"><i v-if="item.fid === 0" :class="getIcon(icon)"></i><span>{{item.name}}</span></a></template>
        <item-menu :key="obj.id" :preindex="`${index}`" :item="obj" v-for="obj in item.list"></item-menu>
    </el-submenu>
</template>
<script>
import ItemMenu from "@/components/ItemAside/ItemMenu";

const icons = ['el-icon-monitor', 'el-icon-data-analysis', 'el-icon-sold-out', 'el-icon-user', 'el-icon-c-scale-to-original', 'el-icon-set-up', 'el-icon-medal', 'el-icon-s-grid', 'el-icon-news', 'el-icon-time', 'el-icon-document', 'el-icon-edit-outline', 'el-icon-edit', 'el-icon-film', 'el-icon-setting', 'el-icon-s-management'];

export default {
  name: "ItemMenu",
  props: ["item", "preindex", "icon"],
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
    },
    getIcon(k) {
      const n = icons.length;
      return icons[k % n];
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
