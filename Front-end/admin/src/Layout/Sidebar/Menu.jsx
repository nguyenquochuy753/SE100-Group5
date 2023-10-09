export const MENUITEMS = [
  {
    menutitle: "Tổng Quan",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Bảng Điều Khiển",
        icon: "home",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard/e-commerce`
      },
    ],
  },
  {
    menutitle: "Quản Lý Nhà Hàng",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Đặt Món",
        icon: "ecommerce",
        type: "link",
        active: false,
      },
      {
        title: "Đặt Bàn",
        icon: "project",
        type: "link",
        active: false,
      },
      {
        title: "Đơn Hàng",
        icon: "calendar",
        type: "link",
        active: false,
      }
    ],
  },
  {
    menutitle: "Quản Lý Món Ăn",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Món Ăn",
        icon: "icons",
        type: "link",
        active: false,
      },
      {
        title: "Danh Mục",
        icon: "learning",
        type: "link",
        active: false,
      },
      {
        title: "Nguyên Liệu",
        icon: "job-search",
        type: "link",
        active: false,
      },
    ],
  },
  {
    menutitle: "Quản Lý Bàn",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Bàn Ăn",
        icon: "widget",
        type: "link",
        active: false,
      },
    ],
  },
  {
    menutitle: "Quản Lý Nhân Sự",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Nhân Viên",
        icon: "user",
        type: "link",
        active: false,
      },
    ],
  },
];
