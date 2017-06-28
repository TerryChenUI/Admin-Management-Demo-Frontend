export const site = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 Terry Chen',
  logo: '/assets/images/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  baseURL: 'http://localhost:8000/api/v1',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/',
  api: {
    userLogin: '/user/login',
    userLogout: '/user/logout',
    userInfo: '/userInfo',
    users: '/users',
    user: '/user/:id',
    dashboard: '/dashboard',
  }
}

export const storageKey = {
  siderFold: 'siderFold',
  lightTheme: 'lightTheme',
  navOpenKeys: 'navOpenKeys'
};

export const pager = {
  current: 1,
  pageSize: 2,
  showTotal: total => `共 ${total} 条`,
  showQuickJumper: true
};

export const searchForm = {
  itemLayout: {
    xs: { span: 24 }, sm: { span: 12 }, md: { span: 6 }, xl: { span: 4 }, style: { marginBottom: 16 }
  },
  actionLayout: {
    xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, xl: { span: 4 }, style: { marginBottom: 16 }
  }
};

export const editForm = {
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
      md: { span: 4 },
      xl: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
      md: { span: 12 },
      xl: { span: 8 }
    },
  },
  tailFormItemLayout: {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 16 },
      xl: { span: 12 }
    },
  }
};

export const constant = {
  defaultOption: { value: '-1', text: "--请选择--" }
};


