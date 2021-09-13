export default {
  items: [
    {
      title: true,
      name: "List Function",
      class: "",
    },
    {
      name: 'Game configuration',
      // url: '/foods',
      icon: 'icon-speedometer',
      children: [
        {
          name: "Food Manager",
          url:"/foods/manager",
        },
        {
          name: "Login",
          url:"/pages/login",
        }
      ]
    }
  ]
}
