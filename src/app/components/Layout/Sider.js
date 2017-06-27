import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Switch } from 'antd';
import styles from './Layout.less';
import { config } from '../../utils';
import Menus from './Menu';

const Sider = ({ siderFold, lightTheme, location, switchTheme, navOpenKeys, changeOpenKeys, menu }) => {
  const menusProps = {
    menu,
    siderFold,
    lightTheme,
    location,
    navOpenKeys,
    changeOpenKeys
  };
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.site.logo} />
        {siderFold ? '' : <span>{config.site.name}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={switchTheme} defaultChecked={!lightTheme} checkedChildren="Dark" unCheckedChildren="Light" />
      </div> : ''}
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  lightTheme: PropTypes.bool,
  location: PropTypes.object,
  switchTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider;
