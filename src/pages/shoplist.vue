<template>
  <div>
    <Header></Header>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="店铺种类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name"> </el-table-column>
      <el-table-column label="店铺ID" prop="id"> </el-table-column>
      <el-table-column label="店铺地址" prop="address"> </el-table-column>
      <el-table-column label="联系电话" prop="phone"> </el-table-column>
      <el-table-column label="店铺种类" prop="category"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
    <el-dialog title="编辑商铺信息" center :visible.sync="dialogFormVisible">
      <el-form :model="editform">
        <el-form-item label="商铺名称" label-width="100px">
          <el-input v-model="editform.name"></el-input>
        </el-form-item>
        <el-form-item label="商铺地址" label-width="100px">
          <el-input v-model="editform.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="editform.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺种类" label-width="100px">
          <el-input v-model="editform.category"></el-input>
        </el-form-item>
        <el-form-item label="商铺照片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="editform.image_path"
              :src="baseImgPath + editform.image_path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import { getShoplist, updateShop } from "@/api/index";
export default {
  name: "ShopList",
  data() {
    return {
      baseUrl: "https://elm.cangdu.org",
      baseImgPath: "https://elm.cangdu.org/img/",
      tableData: [],
      count: 0,
      dialogFormVisible: false,
      editform: {},
      currentPage: 1,
      offset: 0,
      limit: 10,
    };
  },
  components: { Header },

  mounted() {
    console.log("这是商铺组件");
    this.getCount();
    this.getData();
  },
  methods: {
    getCount() {
      axios({
        url: "https://elm.cangdu.org/shopping/restaurants/count",
        method: "get",
      }).then((response) => {
        console.log(response);
        this.count = response.data.count;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log("每页多少数据--当前页码", this.currentPage);
      this.limit = val;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log("当前页码：", this.currentPage);
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getData();
    },

    async getData() {
      const param = {
        latitude: "31.22967",
        longitude: "121.4762",
        offset: this.offset,
        limit: this.limit,
      };
      const result = await getShoplist(param);
      if (result.status == 200) {
        console.log("商铺列表返回数据：", result.data);
        //每次获取数据之后要把表格的数据清空
        this.tableData = [];
        const shopList = result.data;
        shopList.forEach((shop) => {
          const tableDate = {};
          tableDate.name = shop.name;
          tableDate.address = shop.address;
          tableDate.id = shop.id;
          tableDate.phone = shop.phone;
          tableDate.category = shop.category;
          tableDate.rating = shop.rating;
          tableDate.image_path = shop.image_path;
          this.tableData.push(tableDate);
        });
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.editform = row;
    },
    handleDelete(index, row) {
      axios({
        url: `https://elm.cangdu.org/shopping/restaurant/${row.id}`,
        method: "delete",
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("请求失败", error);
        });
    },
    async updateShop() {
      this.dialogFormVisible = false;
      try {
        const res = await updateShop(this.editform);
        console.log(res);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "更新店铺成功",
          });
          this.getData();
        } else {
          this.$message({
            type: "erroe",
            message: res.message,
          });
        }
      } catch (error) {
        console.log("更新餐馆失败", error);
      }
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === "image/jpeg" || file.type === "image/png";
      if (!isImg) {
        this.$message.error("上传图片必须是jpg格式！");
      }
      return isImg;
    },
    handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        this.editform.image_path = res.image_path;
      } else {
        this.$message.error("上传照片失败！");
      }
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
