<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="dataForm.name" placeholder="名字"></el-input>
      </el-form-item>
      <el-form-item label="入学年份" prop="year">
        <el-input v-model="dataForm.year" placeholder="入学年份"></el-input>
      </el-form-item>
      <el-form-item label="学院id" prop="schoolId">
        <el-input v-model="dataForm.schoolId" placeholder="学院id"></el-input>
      </el-form-item>
      <el-form-item label="专业id" prop="majorId">
        <el-input v-model="dataForm.majorId" placeholder="专业id"></el-input>
      </el-form-item>
      <el-form-item label="辅导员id" prop="stuInstructorId">
        <el-input v-model="dataForm.stuInstructorId" placeholder="辅导员id"></el-input>
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input v-model="dataForm.credit" placeholder="学分"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        year: "",
        schoolId: "",
        majorId: "",
        stuInstructorId: "",
        credit: "",
      },
      dataRule: {
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        year: [
          {
            required: true,
            message: "入学年份不能为空，只能输入2015-2023",
            trigger: "blur",
          },
        ],
        schoolId: [
          {
            required: true,
            message: "学院id不能为空,只能在1-101",
            trigger: "blur",
          },
        ],
        majorId: [
          {
            required: true,
            message: "专业id不能为空，只能输入1-101",
            trigger: "blur",
          },
        ],
        stuInstructorId: [
          {
            required: true,
            message: "辅导员id不能为空，只能输入1-101",
            trigger: "blur",
          },
        ],
        credit: [{ required: true, message: "学分不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http
            .get(`/api/college/student/info/${this.dataForm.id}`)
            .then(({ data }) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.student.name;
                this.dataForm.year = data.student.year;
                this.dataForm.schoolId = data.student.schoolId;
                this.dataForm.majorId = data.student.majorId;
                this.dataForm.stuInstructorId = data.student.stuInstructorId;
                this.dataForm.credit = data.student.credit;
              }
            });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          let reqParam = {
            id: this.dataForm.id || undefined,
            name: this.dataForm.name,
            year: this.dataForm.year,
            schoolId: this.dataForm.schoolId,
            majorId: this.dataForm.majorId,
            stuInstructorId: this.dataForm.stuInstructorId,
            credit: this.dataForm.credit,
          };
          this.$http
            .post(
              `/api/college/student/${!this.dataForm.id ? "save" : "update"}`,
              reqParam
            )
            .then((r) => {
              let res = r.data;
              if (res && res.code === 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit("refreshDataList");
                  },
                });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((error) => {
              console.log(error,'==>error');
              this.$message({
                message: "操作失败",
                type: "warning",
                duration: 1500,
              });
            });
        }
      });
    },
  },
};
</script>
