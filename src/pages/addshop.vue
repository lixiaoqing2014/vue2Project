<template>
  <div>
    <Header></Header>

    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          label-position="right"
          label-width="110px"
          :model="shopform"
          ref="shopform"
          class="demo-formData"
          :rules="rules"
        >
          <el-form-item label="商铺名称" prop="name">
            <el-input v-model="shopform.name"></el-input>
          </el-form-item>
          <el-form-item label="商铺地址" prop="address">
            <el-input v-model="shopform.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="shopform.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              v-model="selectcategory"
              :options="categoryOption"
              @change="handleChange"
              ref="getInput"
              :props="defaultParams"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="店铺图片" prop="image_path">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopform.image_path"
                :src="baseImgPath + shopform.image_path"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="运费" prop="float_delivery_fee">
            <el-input-number
              v-model="shopform.float_delivery_fee"
              :min="0"
              :max="20"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="float_minimum_order_amount">
            <el-input-number
              v-model="shopform.float_minimum_order_amount"
              :min="0"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('shopform')"
              >修改</el-button
            >
            <el-button @click="resetForm('shopform')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

import { reqGetCategory, addshop } from "@/api/index";
import axios from "axios";
export default {
  name: "AddShop",
  data() {
    return {
      categoryOption: [],
      // v-model代表选中的数据，是以value为基准的
      // lable 是选项标签
      defaultParams: {
        label: "name",
        value: "name",
        children: "sub_categories",
      },
      //   这里是一个字符串
      //     0: "快餐便当"
      //     1: "简餐"
      selectcategory: [],

      shopform: {
        name: "",
        address: "",
        phone: "",
        latitude: "31.22967",
        longitude: "121.4762",
        image_path: "",
        category: "",
        float_delivery_fee: 5,
        float_minimum_order_amount: 6,
      },
      baseUrl: "https://elm.cangdu.org",
      baseImgPath: "https://elm.cangdu.org/img/",
      rules: {
        name: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
      },
    };
  },
  components: { Header },

  mounted() {
    this.getCategory();
  },
  methods: {
    handleChange(value) {
      console.log(value);
      //这里用 join() 方法把数组中的所有元素放入一个字符串
      //赋值给category
      this.shopform.category = value.join("/");
    },
    async getCategory() {
      const res = await reqGetCategory();
      console.log("获取category", res);
      //这个动态加入功能很好
      this.categoryOption = res.data;
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
        this.shopform.image_path = res.image_path;
      } else {
        this.$message.error("上传照片失败！");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.shopform);
        if (valid) {
          axios({
            url: "https://elm.cangdu.org/shopping/addshop",
            method: "post",
            data: this.shopform,
          })
            .then((res) => {
              console.log("发送请求成功", res.data);
            })
            .catch((err) => {
              console.log("错误", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.shopform.category = "";
      this.selectcategory = [];
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
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
