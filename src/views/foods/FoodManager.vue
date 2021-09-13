<template>
  <div style="margin: 24px">

    <a-table
      :row-key="(record) => record.key"
      :columns="columns"
      :dataSource="dataSource"
      @change="handleTableChange"
      :customRow="customRow"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        hideDefaultSelections: false,
        selections: true,
      }"
    >
      <template slot="name" slot-scope="name"
      >{{ name.first }} {{ name.last }}</template
      >
    </a-table>
  </div>
</template>

<script>
import moment from "moment";
import {notify} from "@/helpers/notify";
import FoodService from "@/services/app/foods.service"

const dataSource1 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

export default {
  name: "App",
  data() {
    return {
      moment,
      dataSource: {},
      selectedRows: [],
      selectedRowKeys: [], // Check here to configure the default column
      columns: [
        // {
        //   dataIndex: "id",
        //   title: "ID",
        //   align: "center",
        //   width: 80,
        //   fixed: 'left'
        // },
        {
          title: 'Mana',
          dataIndex: 'mana',
          width: 80,
        },
        {
          title: 'image',
          width: 150,
          dataIndex: 'image',
        },
        {
          title: 'itemName',
          dataIndex: 'itemName',
          align: "center",
          width: 150,
        },
        {
          title: 'description',
          dataIndex: 'description',
          align: "center",
          width: 180,
        },
        {
          title: 'effect',
          dataIndex: 'effect',
        },
        {
          title: 'status',
          dataIndex: 'status',
        },
        {
          align: "createdAt",
          width: 150,
          fixed: "center",
          title: "createdAt",
        },
      ],
    };
  },

  created(){
    this.getListItemFoods()
  },

  methods: {
    handleTableChange() {
      console.log("handleTableChange");
    },
    customRow(record, index) {
      return {
        on: {
          click: () => {
            // console.log("record:", record, `点了第${index}行`);
            const currentIndex = this.selectedRows.findIndex(
              (item) => item.key === record.key
            );
            if (currentIndex > -1) {
              this.selectedRows.splice(currentIndex, 1);
              this.selectedRowKeys.splice(currentIndex, 1);
              this.selectedRows = [...this.selectedRows];
              this.selectedRowKeys = [...this.selectedRowKeys];
            } else {
              this.selectedRows = [...this.selectedRows, record];
              this.selectedRowKeys = [...this.selectedRowKeys, record.key];
            }
          },
        },
      };
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },

    getListItemFoods(){
      FoodService.getListFoods().then(res => {
        if (res.code === 1) {
          this.dataSource = res.data ? [...res.data.map(item => {
            return {
              ...item,
            }
          })] : []
          console.log(this.dataSource)
          // this.pagination.total = res.totalElement;
          // this.pagination = {...this.pagination};
          // this.selectedIdStamp = []
        } else {
          notify('warning', 'Có lỗi xảy ra', res.message || 'Vui lòng thử lại')
        }
        // this.loading = false;
      }).catch(err => {
        notify('error', 'Có lỗi xảy ra', err.message || 'Vui lòng thử lại')
        // this.loading = false;
      })
    }

  },
};
</script>

<style>
table {
  background-color: white;
}
</style>
