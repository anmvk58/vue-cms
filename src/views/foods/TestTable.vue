<template>
  <div id="app">
    <a-table
      :columns="columns"
      :rowKey="data => data.id"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
    </a-table>
  </div>
</template>

<script>
import moment from "moment";
import {notify} from "@/helpers/notify";
import FoodService from "@/services/app/foods.service"

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    scopedSlots: {
      customRender: "name"
    }
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      {
        text: "Male",
        value: "male"
      },
      {
        text: "Female",
        value: "female"
      }
    ],
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];

export default {
  name: "TestTable",

  mounted: function() {
    this.fetch();
  },

  data: function() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    };
  },

  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.pagination = {
        ...this.pagination,
        current: pagination.current
      };

      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },

    fetch(params = {}) {
      this.loading = true;
      FoodService.getListFoods().then(res => {
        if (res.code === 1) {
          this.data = res.data ? [...res.data.map(item => {
            return {
              ...item,
            }
          })] : []
          console.log(this.dataSource)
          this.pagination = {
            ...this.pagination,
            total: 20
          };
        } else {
          notify('warning', 'Có lỗi xảy ra', res.message || 'Vui lòng thử lại')
        }
        // this.loading = false;
      }).catch(err => {
        notify('error', 'Có lỗi xảy ra', err.message || 'Vui lòng thử lại')
        // this.loading = false;
      })


      // this.$http
      //   .get("https://randomuser.me/api", { params: { results: "10" } })
      //   .then(response => {
      //     const json = JSON.parse(response.bodyText);
      //
      //     this.loading = false;
      //     this.data = json.results;
      //     this.pagination = {
      //       ...this.pagination,
      //       total: 20
      //     };
      //   });
    }
  }
};
</script>

<!--<script>-->
<!--import moment from "moment";-->
<!--import {notify} from "@/helpers/notify";-->
<!--import FoodService from "@/services/app/foods.service"-->


<!--export default {-->
<!--  name: "App",-->
<!--  data() {-->
<!--    return {-->
<!--      moment,-->
<!--      dataSource: {},-->
<!--      selectedRows: [],-->
<!--      selectedRowKeys: [], // Check here to configure the default column-->
<!--      columns: [-->
<!--        // {-->
<!--        //   dataIndex: "id",-->
<!--        //   title: "ID",-->
<!--        //   align: "center",-->
<!--        //   width: 80,-->
<!--        //   fixed: 'left'-->
<!--        // },-->
<!--        {-->
<!--          title: 'Mana',-->
<!--          dataIndex: 'mana',-->
<!--          width: 80,-->
<!--        },-->
<!--        {-->
<!--          title: 'image',-->
<!--          width: 150,-->
<!--          dataIndex: 'image',-->
<!--        },-->
<!--        {-->
<!--          title: 'itemName',-->
<!--          dataIndex: 'itemName',-->
<!--          align: "center",-->
<!--          width: 150,-->
<!--        },-->
<!--        {-->
<!--          title: 'description',-->
<!--          dataIndex: 'description',-->
<!--          align: "center",-->
<!--          width: 180,-->
<!--        },-->
<!--        {-->
<!--          title: 'effect',-->
<!--          dataIndex: 'effect',-->
<!--        },-->
<!--        {-->
<!--          title: 'status',-->
<!--          dataIndex: 'status',-->
<!--        },-->
<!--        {-->
<!--          align: "createdAt",-->
<!--          width: 150,-->
<!--          fixed: "center",-->
<!--          title: "createdAt",-->
<!--        },-->
<!--      ],-->
<!--    };-->
<!--  },-->

<!--  created(){-->
<!--    this.getListItemFoods()-->
<!--  },-->

<!--  methods: {-->
<!--    handleTableChange() {-->
<!--      console.log("handleTableChange");-->
<!--    },-->
<!--    customRow(record, index) {-->
<!--      return {-->
<!--        on: {-->
<!--          click: () => {-->
<!--            // console.log("record:", record, `点了第${index}行`);-->
<!--            const currentIndex = this.selectedRows.findIndex(-->
<!--              (item) => item.key === record.key-->
<!--            );-->
<!--            if (currentIndex > -1) {-->
<!--              this.selectedRows.splice(currentIndex, 1);-->
<!--              this.selectedRowKeys.splice(currentIndex, 1);-->
<!--              this.selectedRows = [...this.selectedRows];-->
<!--              this.selectedRowKeys = [...this.selectedRowKeys];-->
<!--            } else {-->
<!--              this.selectedRows = [...this.selectedRows, record];-->
<!--              this.selectedRowKeys = [...this.selectedRowKeys, record.key];-->
<!--            }-->
<!--          },-->
<!--        },-->
<!--      };-->
<!--    },-->

<!--    onSelectChange(selectedRowKeys, selectedRows) {-->
<!--      console.log("selectedRowKeys changed: ", selectedRowKeys);-->
<!--      this.selectedRowKeys = selectedRowKeys;-->
<!--      this.selectedRows = selectedRows;-->
<!--    },-->

<!--    getListItemFoods(){-->
<!--      FoodService.getListFoods().then(res => {-->
<!--        if (res.code === 1) {-->
<!--          this.dataSource = res.data ? [...res.data.map(item => {-->
<!--            return {-->
<!--              ...item,-->
<!--            }-->
<!--          })] : []-->
<!--          console.log(this.dataSource)-->
<!--          // this.pagination.total = res.totalElement;-->
<!--          // this.pagination = {...this.pagination};-->
<!--          // this.selectedIdStamp = []-->
<!--        } else {-->
<!--          notify('warning', 'Có lỗi xảy ra', res.message || 'Vui lòng thử lại')-->
<!--        }-->
<!--        // this.loading = false;-->
<!--      }).catch(err => {-->
<!--        notify('error', 'Có lỗi xảy ra', err.message || 'Vui lòng thử lại')-->
<!--        // this.loading = false;-->
<!--      })-->
<!--    }-->

<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--table {-->
<!--  background-color: white;-->
<!--}-->
<!--</style>-->
