module.exports = [
  {
    id: 1,
    icon: 'home',
    name: '首页',
    router: '/'
  },
  {
    id: 4,
    bpid: 1,
    name: '文章管理',
    icon: 'bars'
  },
  {
    id: 41,
    bpid: 4,
    mpid: 4,
    name: '所有文章',
    icon: 'book',
    router: '/articles'
  },
  {
    id: 42,
    bpid: 4,
    mpid: 4,
    name: '发布文章',
    icon: 'edit',
    router: '/article/edit'
  },
  {
    id: 43,
    bpid: 4,
    mpid: 4,
    name: '分类目录',
    icon: 'bars',
    router: '/categories'
  },
  {
    id: 44,
    bpid: 4,
    mpid: 4,
    name: '文章标签',
    icon: 'tags',
    router: '/tags'
  },
  {
    id: 441,
    mpid: -1,
    bpid: 44,
    name: '添加标签',
    router: '/tags/add'
  },
  {
    id: 442,
    mpid: -1,
    bpid: 44,
    name: '编辑标签',
    router: '/tags/:id(\\w+)'
  }
]
