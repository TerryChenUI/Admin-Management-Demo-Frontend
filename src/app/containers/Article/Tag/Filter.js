import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { Form, Button, Row, Col, Input, Select } from 'antd';

const Option = Select.Option;

class TagFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.onSearch(e, data);
    }

    handleReset() {
        this.props.form.resetFields();
        this.props.onReset();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { filter } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} style={{ marginBottom: 16 }}>
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="标签，别名，关键字" />
                        )
                    }
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} style={{ marginBottom: 16 }} >
                    {
                        getFieldDecorator('visible', { initialValue: '-1' })(
                            <Select style={{ width: '100%' }}>
                                <Option value="-1">--状态--</Option>
                                <Option value="1">可见</Option>
                                <Option value="0">隐藏</Option>
                            </Select>
                        )
                    }
                </Col>
                <Col className="form-action" xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} xl={{ span: 4 }} style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={(e) => this.handleSubmit(e)}>搜索</Button>
                    <Button onClick={() => this.handleReset()}>重置</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.create()(TagFilter);