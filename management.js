import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, Tabs, Switch, Input, Table, Divider, Pagination, message, Checkbox, Modal } from 'antd';
import GuideStyle from './GuideBox.style';
import { ModalEquipment } from './page_modal';


//设备管理页面
//左侧子菜单 侧边栏（设备管理、园区管理）
const { SubMenu } = Menu;

class Sider extends Component {
  state = {
    mode: 'inline',
    theme: 'light',
  }
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  render() {
    return (
      <div>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
          theme={this.state.theme}
          style={GuideStyle.guide_left_antMenu}
        >
          <Menu.Item key="1">设备管理</Menu.Item>
          <Menu.Item key="2">园区管理</Menu.Item>
          <Menu.Item key="3">客户管理</Menu.Item>
          <Menu.Item key="4">位置管理</Menu.Item>
          <Menu.Item key="5">图例管理</Menu.Item>
          <Menu.Item key="6">应急预案</Menu.Item>
          <Menu.Item key="7">导览</Menu.Item>
          <Menu.Item key="8">监控</Menu.Item>
          <Menu.Item key="9">大数据</Menu.Item>
        </Menu>
      </div>
    );
  }
}


// 右侧 标签页 (设备管理、园区管理)
const TabPane = Tabs.TabPane;

class Tablist extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '设备管理', content: <ContTabs />, key: '1', closable: false },
      { title: '园区管理', content: <ContTabs />, key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render() {
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}

        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} style={{ marginTop: '-16px', border: '1px solid #e5e5e5', borderTop: 'none', padding: '16px' }}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}

// 标签页对应的内容 （表格部分）
class ContTabs extends Component {
  render() {
    return (
      <div>
        <div>
          <h6 style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', marginBottom: '10px', fontSize: '16px' }}>设备类型</h6>
        </div>

        <div style={{ display: "-webkit-flex", display: "flex", paddingBottom: '5px', marginBottom: '10px', fontSize: '16px', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ width: '50%' }}>
            <CheckboxName />
            <div style={{ marginBottom: '5px' }}>
              <Button style={{ marginRight: '5px' }} type="primary" >新增</Button>
              <Button style={{ marginRight: '5px' }} type="danger">删除</Button>
            </div>
          </div>
          <div style={{ overflow: 'hidden', width: '50%' }}>
            <Search
              placeholder="请输入搜索内容"
              onSearch={value => console.log(value)}
              style={{ width: '60%', float: 'right' }}
            />
          </div>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        <div style={{ marginTop: '-48px', marginBottom: '5px' }}>
          <ModalEquipment />
          <Button style={{ marginRight: '5px' }}>导入</Button>
          <Button style={{ marginRight: '5px' }}>导出</Button>
        </div>
      </div>
    );
  }
}

//多选
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['摄像头', '烟感', '空调', '照明'];
const defaultCheckedList = ['摄像头', '空调'];

class CheckboxName extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };
  render() {
    return (
      <div style={{ paddingBottom: '10px' }}>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          全部
            </Checkbox>
        <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
      </div>
    );
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
}



// 搜索框
const Search = Input.Search;

// 右侧 table (数据)
const columns = [{
  title: '设备名称',
  dataIndex: 'name',
}, {
  title: '设备类型',
  dataIndex: 'genre',
}, {
  title: '生产日期',
  dataIndex: 'manufacture',
}, {
  title: '登记日期',
  dataIndex: 'register',
}, {
  title: '操作',
  render: (text, record) => (
    <span>
      <a href="#">详情</a>
      <Divider type="vertical" />
      <a href="#">删除</a>
      <Divider type="vertical" />
      <a href="#">编辑</a>
    </span>
  ),
}];
const data = [{
  key: '1',
  name: 'John Brown',
  genre: '空调',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '2',
  name: 'John',
  genre: '摄像头',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '3',
  name: 'Brown',
  genre: '空调',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '4',
  name: 'John Brown',
  genre: '照明',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '5',
  name: 'John',
  genre: '摄像头',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '6',
  name: 'Brown',
  genre: '门禁',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '7',
  name: 'John',
  genre: '摄像头',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '8',
  name: 'Brown',
  genre: '空调',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '9',
  name: 'John Brown',
  genre: '照明',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '10',
  name: 'John',
  genre: '摄像头',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '11',
  name: 'Brown',
  genre: '门禁',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}, {
  key: '12',
  name: 'John Brown',
  genre: '照明',
  manufacture: '2018年1月1日',
  register: '2018年1月3日',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};



export { Sider, Tablist, ContTabs, CheckboxName };