import React, { Component } from 'react';
import { Modal, Button, Form, Input, DatePicker, TimePicker, Select, Divider, Tag } from 'antd';
import Moment from 'moment'

const { TextArea } = Input;
const Search = Input.Search;
const InputGroup = Input.Group;
// 新增设备（table）
class ModalEquipment extends Component {
    constructor(props) {
        super();
        this.state = {
            loading: false,
            visible: false,
            tags: ['tag a', 'tag b'],
            equipment: [{
                type: 'oInput',
                name: '设备名称',
                placeholder: '请输入设备名称',
                value: '设备名称111'
            }, {
                type: 'oSelect',
                name: '设备类型',
                placeholder: '请输入设备类型',
                value: ['设备类型1111', '设备类型2222', '设备类型333', '设备类型4444'],
                defultvalue: '数据类型4444'
            }, {
                type: 'oTime',
                name: '生产日期',
                placeholder: '请输入生产日期',
                value: '2018-01-09'
            }, {
                type: 'oSelect',
                name: '数据类型',
                placeholder: '请输入数据类型',
                value: ['数据类型1111', '数据类型2222', '数据类型3333', '数据类型4444'],
                defultvalue: '数据类型2222'
            }, {
                type: 'oSelect',
                name: '数据方向',
                placeholder: '请输入数据方向',
                value: ['数据方向1111', '数据方向2222', '数据方向3333', '数据方向4444'],
                defultvalue: '数据方向3333'
            }, {
                type: 'oInput',
                name: '数据访问',
                placeholder: '请输入数据访问',
                value: '请输入数据访问1111'
            }],
            textVal:'备注信息0123456789'
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleClick = () => {
        if (this.refs.tagsInput.input.value !== '') {
            var arr = this.state.tags;
            arr.unshift(this.refs.tagsInput.input.value);
            this.refs.tagsInput.input.value = '';
            this.setState({
                arr: this.state.tags
            })
        }
    }

    handAddFormItem = (e) => {
        if (this.refs.equipmentInput.input.value !== '') {
            var arrEquipment = this.state.equipment;
            var objJson = {
                type: 'oInput',
                name: this.refs.equipmentInput.input.value,
                placeholder: '请输入' + this.refs.equipmentInput.input.value,
                value: ''
            }
            this.refs.equipmentInput.input.value = '';
            arrEquipment.push(objJson);
            this.setState({
                arrEquipment: this.state.equipment
            })
        }
    }

    render() {
        const { visible, loading } = this.state;

        return (
            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                <Button type="primary" onClick={this.showModal}>新增</Button>
                <Modal
                    visible={visible}
                    title="添加设备"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>保存</Button>,
                    ]}
                >
                    <div style={{ marginBottom: '10px' }}>
                        <h6 style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '5px', marginBottom: '10px', fontSize: '16px' }}>基本信息</h6>
                        <FormLayoutDemo equipment={this.state.equipment} />

                        <InputGroup compact style={{ display: "-webkit-flex", display: "flex", justifyContent: 'center' }}>
                            <Input
                                placeholder="请输入标签名称"
                                ref='equipmentInput'
                                style={{ display: 'inline-block', width: '52%' }}
                            />
                            <Button type="primary" icon="plus" onClick={this.handAddFormItem}>添加类目</Button>
                        </InputGroup>
                        <Divider style={{ borderColor: '#e5e5e5', margin: '10px 0' }} />
                        <InputGroup compact>
                            <Button type="primary" icon="plus" onClick={this.handleClick}>添加标签</Button>
                            <Input
                                placeholder="请输入标签名称"
                                ref='tagsInput'
                                style={{ display: 'inline-block', width: '38%' }}
                            />
                        </InputGroup>
                        <div className="tab_boxs" style={{ marginTop: '10px' }}>
                            {this.state.tags.map((item, i) => (
                                <Tag closable={true} key={i} style={{ color: '#1890ff', margin: '4px 8px 4px 0' }} >{item}</Tag>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h6 style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '5px', marginBottom: '10px', fontSize: '16px' }}>备注信息</h6>
                        <TextArea placeholder="备注信息" autosize={{ minRows: 2, maxRows: 6 }} defaultValue={this.state.textVal} />
                    </div>
                </Modal>
            </div>
        );
    }
}

// 输入框
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
class FormLayoutDemo extends Component {
    constructor(props) {
        super();
        this.state = {
            formLayout: 'horizontal'
        };
    }
    render() {
        const { formLayout } = this.state;
        const { equipment } = this.props;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 },
        } : null;
        return (
            <div>
                <Form layout={formLayout} >
                    {
                        this.props.equipment.map((item, i) => {
                            if (item.type == 'oInput') {
                                return (
                                    <FormItem
                                        key={i}
                                        label={item.name}
                                        {...formItemLayout}
                                    >
                                        <Input placeholder={item.placeholder} defaultValue={item.value} />
                                    </FormItem>
                                )
                            } else if (item.type == 'oSelect') {
                                return (
                                    <FormItem
                                        key={i}
                                        label={item.name}
                                        {...formItemLayout}
                                    >
                                        <Select
                                            placeholder={item.placeholder}
                                            onChange={this.handleSelectChange}
                                            defaultValue={item.defultvalue}
                                        >
                                            {item.value.map((valItem, j) => (
                                                <Option value={valItem} key={j}>{valItem}</Option>
                                            ))}
                                        </Select>
                                    </FormItem>
                                )
                            } else if (item.type == 'oTime') {
                                return (
                                    <FormItem
                                        key={i}
                                        {...formItemLayout}
                                        label={item.name}
                                    >
                                        <DatePicker
                                            style={{ width: '275px' }}
                                            showToday={false}
                                            placeholder={item.placeholder}
                                            defaultValue={Moment(item.value)}
                                        />
                                    </FormItem>
                                )
                            }

                        })
                    }
                </Form>
            </div >
        );
    }
}

export { ModalEquipment };