<template>
  <div>
    <Header></Header>

    <div style="padding-left: 5px">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="time" label="注册日期"> </el-table-column>
        <el-table-column prop="name" label="用户姓名"> </el-table-column>
        <el-table-column prop="address" label="注册地址"> </el-table-column>
      </el-table>
    </div>
    <div class="Pagination center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="limit"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";

export default {
  name: "UserList",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      offset: 0,
      // offset是偏移量
      count: 0,
      limit: 20,
    };
  },
  components: { Header },

  mounted() {
    this.getCount();
  },
  methods: {
    indexMethod(index) {
      return index + 1 + 20 * (this.currentPage - 1);
    },
    getCount() {
      axios({
        url: "https://elm.cangdu.org/v1/users/count",
        method: "get",
      }).then((response) => {
        console.log("用户数量:", response.data.count);
        this.count = response.data.count;
        this.getUsers();
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      console.log("当前偏移量", this.offset);
      this.getUsers();
    },
    getUsers() {
      console.log("重新获取users");
      axios({
        url: "https://elm.cangdu.org/v1/users/list",
        method: "get",
        params: {
          offset: this.offset,
          limit: this.limit,
        },
      }).then((response) => {
        const Users = response.data;
        this.tableData = [];
        Users.forEach((item) => {
          const tableData = {};
          tableData.time = item.registe_time;
          tableData.name = item.username;
          tableData.address = item.city;
          this.tableData.push(tableData);
        });
      });
    },
  },
};
</script>

<style>
.center {
  margin: 5px auto;
}
</style>
