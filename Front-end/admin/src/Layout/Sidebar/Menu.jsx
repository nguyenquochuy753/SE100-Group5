export const MENUITEMS = [
  {
    menutitle: "Tổng Quan",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Bảng Điều Khiển",
        value: "dashboard",
        icon: "home",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard/e-commerce`,
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
        value: "select",
        type: "link",
        active: false,
        path: `${process.env.PUBLIC_URL}/app/ecommerce/select`,
      },
      {
        title: "Đặt Bàn",
        value: "book",
        path: `${process.env.PUBLIC_URL}/app/project/book`,

        icon: "project",
        type: "link",
        active: false,
      },
      {
        title: "Đơn Hàng",
        value: "orderhistory",
        path: `${process.env.PUBLIC_URL}/app/ecommerce/orderhistory`,
        icon: "calendar",
        type: "link",
        active: false,
      },
    ],
  },
  {
    menutitle: "Quản Lý Món Ăn",
    menucontent: "Dashboards",
    Items: [
      {
        title: "Món Ăn",
        icon: "icons",
        type: "sub",
        active: false,
        value: "meal",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/app/ecommerce/meal/meal-list`,
            type: "link",
            title: "Danh Sách Món Ăn",
            value: "meal-list",
          },
          {
            path: `${process.env.PUBLIC_URL}/app/project/meal/new-meal`,
            type: "link",
            title: "Thêm Món Ăn",
            value: "new-meal",
          },
        ],
      },
      {
        title: "Danh Mục",
        icon: "learning",
        type: "sub",
        value: "category",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/app/ecommerce/category/category-list`,
            type: "link",
            title: "Danh Sách Danh Mục",
            value: "category-list",
          },
          {
            path: `${process.env.PUBLIC_URL}/app/project/category/new-category`,
            type: "link",
            title: "Thêm Danh Mục",
            value: "new-category",
          },
        ],
      },
      {
        title: "Nguyên Liệu",
        icon: "job-search",
        value: "ingredient",
        type: "sub",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/app/ecommerce/ingredient/ingredient-list`,
            type: "link",
            title: "Danh Sách Nguyên Liệu",
            value: "ingredient-list",
          },
          {
            path: `${process.env.PUBLIC_URL}/app/ecommerce/ingredient/ingredient-type-list`,
            type: "link",
            title: "Danh Sách Loại Nguyên Liệu",
            value: "ingredient-type-list",
          },
          {
            path: `${process.env.PUBLIC_URL}/app/project/ingredient/new-ingredient-type`,
            type: "link",
            title: "Thêm Loại Nguyên Liệu",
            value: "new-ingredient-type",
          },
        ],
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
        value: "table",
        type: "sub",
        active: false,
        // path: `${process.env.PUBLIC_URL}/app/ecommerce/table-list`,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/app/ecommerce/table/table-list`,
            type: "link",
            title: "Danh Sách Bàn Ăn",
            value: "table-list",
          },
          {
            path: `${process.env.PUBLIC_URL}/app/project/table/new-table`,
            type: "link",
            title: "Thêm Bàn Ăn",
            value: "new-table",
          },
        ],
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
        value: "none",
        type: "link",
        active: false,
      },
    ],
  },
];
