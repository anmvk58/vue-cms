import {http} from '@/plugins/axios/axios'

const getListFoods = () => {
  return http.get('/item-food');
};

export default {
  getListFoods
}
