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

          <el-form-item>
            <el-button type="primary" @click="submitForm('shopform')"
              >立即创建</el-button
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
export default {
  name: "AddShop",
  components: { Header },
};
</script>

<style></style>
