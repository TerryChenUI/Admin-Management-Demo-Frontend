import React from 'react';
import styles from './Footer.less';
import { config } from '../../utils';

const Footer = () => <div className={styles.footer}>
  {config.site.footerText}
</div>

export default Footer;
