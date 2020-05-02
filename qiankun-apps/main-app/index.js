// import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from '../../es';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import './index.less';

// for angular subapp
import 'zone.js';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from './render/ReactRender';
// import render from './render/VueRender'

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

/**
 * Step2 注册子应用
 */
const childs = [
  {
    name: 'react16',
    entry: '//localhost:7100',
    container: '#subapp-viewport',
    activeRule: '/react16',
  },
  {
    name: 'react15',
    entry: '//localhost:7102',
    render,
    activeRule: '/react15',
  },
  {
    name: 'vue',
    entry: '//localhost:7101',
    container: '#subapp-viewport',
    activeRule: '/vue',
  },
  // {
  //   name: 'angular9',
  //   entry: '//localhost:7103',
  //   container: '#subapp-viewport',
  //   activeRule: '/angular9',
  // },
  {
    name: 'purehtml',
    entry: '//localhost:7104',
    container: '#subapp-viewport',
    activeRule: '/purehtml',
  },
];
registerMicroApps(
  childs,
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/purehtml');

/**
 * Step4 启动应用
 */
start({
  prefetch: ['react16', 'react15', 'vue'],
  sandbox: true,
  singular: true,
});

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});