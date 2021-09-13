import Vue from 'vue'

export const notify = (
    type,
    message,
    description,
    duration = 3
) => {
  let notification = Vue.prototype.$notification;
  let option = {
    message,
    description,
    duration,
    placement: "bottomRight",
  };
  switch (type){
    case "success":
      notification.success(option);
      break;
    case "warning":
      notification.warning(option);
      break;
    case "error":
      notification.error(option);
      break;
    case "info":
      notification.info(option);
      break;
    case "warn":
      notification.warn(option);
      break;
    default:
      notification.open(option);
      break;
  }
};
