<template>
  <el-aside v-if="menulist && menuArr" :width="isPhone && !showmenu ? '0px' : '250px'" :class="isPhone ? 'app-wrapper-aside' : ''">
    <el-row class="nav-wrapper">
      <div class="nav-search-box">
        <i class="el-icon-search nav-search-icon"></i>
        <el-cascader class="nav-cascader" v-model="curNav" :show-all-levels="false" filterable clearable :options="menuData" :props="{ label: 'name', value: 'time', children: 'list' }" placeholder="搜索导航" @change="hanleSelectChange"></el-cascader>
      </div>
      <el-menu :default-active="$route.meta.activeidx" class="el-header-menu" mode="vertical" background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
        <item-menu :key="key" :icon="key" :item="menulist[val]" v-for="(val, key) in menuArr"></item-menu>
      </el-menu>
    </el-row>
  </el-aside>
</template>
<script>
import { mapGetters } from "vuex";
import ItemMenu from "@/components/ItemAside/ItemMenu";

export default {
  name: "ItemAside",
  props: ["showmenu"],
  components: {
    ItemMenu
  },
  data() {
    return {
      isPhone: false,
      isShowMenu: true,
      menuArr: null,
      menuData: [],
      curNav: [],
      tempMenu: null,
    };
  },
  computed: {
    ...mapGetters(["menulist"])
  },
  methods: {
    init() {
       this.tempMenu = JSON.parse(JSON.stringify(this.menulist));
       this.menuArr = this.menulist && Object.keys(this.menulist) || null;
       if (this.menulist) {
        this.menuData = this.objToArr(this.menulist);
       }
    },
    objToArr(obj){ // 递归把对象转换为数组
      return Object.keys(obj).map(key => {
        let cur = obj[key];
        cur.list && (cur.list = this.objToArr(cur.list));
        return cur;
      });
    },
    hanleSelectChange(arr) {
      if (arr && arr.length > 0) {
        const path = arr.length > 1 ? this.getItemPath(1, arr, this.tempMenu[arr[0]]) : this.tempMenu[arr[0]].path;
        location.href = `${location.origin}${path}`;
      }
    },
    getItemPath(n, arr, obj) { //获取导航搜索的页面地址
      if(arr[n]){
        const key = JSON.stringify(arr[n]);
        return this.getItemPath(n+1, arr, obj.list[key]);
      } else {
        return obj.path;
      }
    }
  },
  created() {
    this.isPhone = window.isPhone;
    this.init();
  },
  watch: {
    menulist() {
      this.init();
    }
  }
};
</script>

<style lang="scss">
.nav-wrapper {
  height: 100%;
  background-color: #304156;
  .el-header-menu {
    border-right: 0;
    .el-menu--inline {
      a {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .nav-search-box {
    padding-left: 10px;
    height: 57px;
    line-height: 57px;
    border-bottom: 1px solid #585757;
    .nav-search-icon {
      color: #fff;
    }
  }
  .nav-cascader {
    .el-input__inner {
      background-color: rgb(48, 65, 86);
      color: #fff;
      border: 0;
    }
    .el-input__suffix {
      .el-icon-arrow-down{opacity: 0;}
    }
    .el-cascader__label {color: #fff;}
  }
}
.app-wrapper-aside {
  z-index: 2001;
  position: fixed;
  top: 0;
  height: 100%;
  transition: width .28s ease 0s;
}
</style>
