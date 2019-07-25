<template>
  <div v-if="data">
    <el-button type="primary" icon="el-icon-view" plain size="mini" title="查看mid" @click="getExposure()">
      <span class="hidden-xs-only">查看曝光mid</span>
    </el-button>
    <el-dialog :title="`【${data.user_name}】-曝光mid（${cur_exposure_date}）`" :visible.sync="dialogVisible" width="60%">
      <el-table :data="midList" style="width: 100%" max-height="600" border stripe>
        <el-table-column type="index" align="left" label="序号"></el-table-column>
        <el-table-column align="left" prop="mid" label="mid">
          <template slot-scope="scope">
            <a class="link-btn" :href="`//m.weibo.cn/status/${scope.row.mid}`" target="_blank" title="跳转至微博详情页">{{scope.row.mid}}</a>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="exposure_sum" label="曝光量" sortable>
          <template slot-scope="scope">{{_formatNum(scope.row.exposure_sum)}}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateWhite",
  data() {
    return {
      apiConf: {
        //API
        getExposureByUid: "/field/getExposureByUid" //查看用户某天曝光的mid
      },
      midList: [],
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "cur_exposure_date"],
  methods: {
    getExposure() {
      const exposure_date = parseTime(
        Date.now() - 3600 * 1000 * 24 * 1,
        "{y}-{m}-{d}"
      );
      const data = {
        url: this.apiConf.getExposureByUid,
        params: {
          uid: this.data.uid,
          exposure_date: this.cur_exposure_date,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.midList = res.result || [];
          this.dialogVisible = true;
        } else {
          this.dialogVisible = true;
        }
      });
    },
    _formatNum(num) {
      return formatNum(num);
    }
  },
  watch: {
    data() {}
  }
};
</script>

<style lang="scss" scoped>
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
</style>