<template>
  <div class="page">
    <el-form inline :model="queryForm">
      <el-form-item size="mini">
        <el-input placeholder="请输入手机号" clearable v-model="queryForm.phone"></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        border
        ref="table"
        size="mini"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @row-click="handleRowClick"
        :data="list">
      <!-- 复选框组件 -->
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="手机" prop="phone"></el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pno"
        :page-size="page.psize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalElements">
    </el-pagination>
  </div>
</template>

<script>
// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
import {mapState, mapActions} from 'vuex'

export default {
  // 定义了组件的名称，用来结合keep-alive缓存页面
  props: {
    'user-id': {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  },
  // 双向绑定user-id属性用于对外通信
  model: {
    event: 'change-id',
    prop: 'user-id'
  },
  name: 'user-table',
  data() {
    return {
      // 调用查询接口需要的参数
      queryForm: {
        hasCard: 0,
        phone: '',
        freeze: 0,
        pno: 1,
        psize: 5
      },
      queryLoading: false
    }
  },
  computed: {
    ...mapState('shopUserModel', ['list', 'page']),
    // 格式化日期的计算属性
    formatTime() {
      return function (time) {
        let d = new Date(Number(time));
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      }
    }
  },
  // 当第一次打开页面时会执行created生命周期
  async created() {
    await this.getListForPage(this.queryForm)
  },
  methods: {
    ...mapActions('shopUserModel', ['getListForPage', 'deleteById', 'setFreeze']),
    async handleClick() {
      this.queryLoading = true;
      this.queryForm.pno = 1;
      await this.getListForPage(this.queryForm)
      this.queryLoading = false;
    },
    // 点击分页组件的每页多少条切换时会触发这个回调，参数就是切换的条数
    async handleSizeChange(psize) {
      this.queryForm.psize = psize
      this.queryForm.pno = 1;
      // 数据发生变化之后我们重新的调用查询方法
      await this.getListForPage(this.queryForm)
    },
    // 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
    async handleCurrentChange(pno) {
      this.queryForm.pno = pno
      // 改变请求的参数重新查询当页的数据
      await this.getListForPage(this.queryForm)
    },
    // 点击复选框时触发
    handleSelect(selection, row) {
      //清除所有选择
      this.$refs.table.clearSelection()
      //设置当前行选中，用于实现单选
      this.$refs.table.toggleRowSelection(row)
      //返回当前选中的用户id
      this.$emit('change-id', row.id + '')
    },
    // 点击全选按钮时执行清空，不允许多选
    handleSelectAll(selection) {
      this.$refs.table.clearSelection()
      this.$emit('change-id', '')
    },
    // 点击每行非复选框位置时触发与handleSelect逻辑一样
    handleRowClick(row) {
      this.$refs.table.clearSelection()
      this.$refs.table.toggleRowSelection(row)
      this.$emit('change-id', row.id + '')
    }
  }
}
</script>

<style>
</style>