import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Dropdown, Button, Icon, } from 'antd';
import GuideStyle from './GuideBox.style';
import { Sider, Tablist, ContTabs, CheckboxName } from './management';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

//左侧下拉选择(智慧湾创意园)
function handleMenuClick(e) {
  console.log('click', e);
}
const menu = (
  <Menu onClick={handleMenuClick} style={GuideStyle.guide_left_button_text}>
    <Menu.Item key="1">智慧湾创意园1</Menu.Item>
    <Menu.Item key="2">智慧湾创意园2</Menu.Item>
    <Menu.Item key="3">智慧湾创意园3</Menu.Item>
  </Menu>
);

class App extends Component {
  render() {
    return (
      <div>
        <div className="guide_box" style={GuideStyle.guide_box}>
          <div className="guide_left" style={GuideStyle.guide_left}>
            <Dropdown overlay={menu}>
              <Button style={GuideStyle.guide_left_button}>
                智慧湾创意园 <Icon type="down" />
              </Button>
            </Dropdown>
            <Sider />
          </div>
          <div className="guide_right" style={GuideStyle.guide_right}>
            <Tablist />
          </div>
        </div>
      </div>

    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));