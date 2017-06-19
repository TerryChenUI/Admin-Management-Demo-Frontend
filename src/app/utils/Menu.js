module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '首页',
    router: '/',
  },
  {
    id: 4,
    bpid: 1,
    name: '文章管理',
    icon: 'camera-o',
  },
  {
    id: 41,
    bpid: 4,
    mpid: 4,
    name: '所有文章',
    icon: 'heart-o',
    router: '/article/list',
  },
  {
    id: 42,
    bpid: 4,
    mpid: 4,
    name: '发布文章',
    icon: 'database',
    router: '/article/edit',
  },
  {
    id: 43,
    bpid: 4,
    mpid: 4,
    name: '分类目录',
    icon: 'bars',
    router: '/category/list',
  },
  {
    id: 44,
    bpid: 4,
    mpid: 4,
    name: '文章标签',
    icon: 'search',
    router: '/tag/list',
  },
  {
    id: 441,
    mpid: -1,
    bpid: 44,
    name: '编辑标签',
    router: '/tag/edit',
  }
]
