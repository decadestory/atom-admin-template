<template>
  <div class="datalist">
    <el-card class="box-card">
      <el-form ref="query" :model="query" label-width="80px" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="query.UserName" placeholder="姓名或BA编号">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="query.MobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="query.IDNum"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="query.AuthStatus">
            <el-option :key="100" label="待审核" :value="100"></el-option>
            <el-option :key="110" label="入职已审核" :value="110"></el-option>
            <el-option :key="120" label="转岗已审核" :value="120"></el-option>
            <el-option :key="130" label="离职已审核" :value="130"></el-option>
            <el-option :key="140" label="取消离职已过期" :value="140"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="在职状态">
          <el-select v-model="query.StatusID" clearable>
            <el-option :key="3" label="在职" :value="3"></el-option>
            <el-option :key="4" label="离职" :value="4"></el-option>
            <el-option :key="6" label="未入职" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>


  </div>
</template>

<script>
  export default {
    name: 'DataList',
    props: {
      msg: String
    },
    data() {
      return {
        query: {},
      }
    },
  }
</script>

<style scoped>
  .el-form-item {
    min-width: 250px;
    display: inline-block;
    text-align: left;
    margin-bottom: 10px;
    margin-left: 20px;
  }

  .el-form {
    text-align: left;
    padding-top: 10px;
  }

  .el-form >>> .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #606266;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    border: 1px solid #DCDFE6;
    border-right: none;
    background: #f5f7fa;
    line-height: 26px;
    margin-top: 1px;
  }

  .el-form >>>.el-form-item :last-child{
    margin-left: 0 !important;
  }



  .el-input,
  .el-input__inner,
  .el-date-editor,
  .el-select,
  .el-textarea,
  .el-cascader {
    width: 150px !important;
    border-radius: 0 !important;
  }

  .el-input>>>.el-input__inner,
  .el-select>>>.el-input__inner {
    border-radius: 0 !important;
  }



  .el-card {
    min-width: 500px;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .el-card>>>.el-card__body {
    padding: 0px !important;
    padding-bottom: 10px !important;
    position: relative;
  }

  .el-table>>>th {
    background-color: #eef1f6 !important;
  }

  .el-table>>>.el-table--mini td,
  .el-table>>>.el-table--mini th {
    padding: 4px 0;
  }

  .el-table>>>.cell {
    word-break: normal !important;
    white-space: nowrap !important;
  }
</style>