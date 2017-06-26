import React from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Row, Col, Input, Select } from 'antd';
import { config } from '../../../utils';

const Option = Select.Option;

class TagSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = () => {
        const data = this.props.form.getFieldsValue();
        if (data.visible === '-1') {
            delete data.visible;
        } else {
            data.visible = data.visible === '1';
        }
        !data.keyword && delete data.keyword;
        this.props.onSearch(data);
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.onReset();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { itemLayout, actionLayout } = config.searchForm;
        return (
            <Row gutter={24}>
                <Col {...itemLayout}>
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="标签，别名，关键字" />
                        )
                    }
                </Col>
                <Col {...itemLayout}>
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
                <Col className="form-action" {...actionLayout}>
                    <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </Col>
            </Row>
        )
    }
}

TagSearch.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func,
    onReset: PropTypes.func
}

export default Form.create()(TagSearch);