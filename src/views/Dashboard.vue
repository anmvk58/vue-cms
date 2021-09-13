<template>
  <div class="animated fadeIn">
    <div id="Dashboard">Dashboard</div>
    <h1> Let's Do Vue !!!</h1>
  </div>
</template>

<script>
import {notify} from "@/helpers/notify";
import FoodService from "@/services/app/foods.service"

export default {
  name: 'dashboard',

  data() {
    return {
      dataSource: {},
    }
  },

  created(){
    this.getListItemFoods()
  },

  methods: {
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

}

</script>
