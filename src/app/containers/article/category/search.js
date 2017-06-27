import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio, Select } from 'antd';

import { config } from '../../../utils';
import { CategoryService } from '../../../services';

const FormItem = Form.Item;
const Option = Select.Option;
let tid = null;

class CategorySearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availableCategories: [
                { value: '-1', text: "--请选择--" }
            ]
        };
    }

    componentWillMount() {
        CategoryService.getAll().then(response => {
            const parentCategories = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: [...this.state.availableCategories, ...parentCategories] });
        });
    }

    handleVisibleChange = (e) => {
        const visible = e.target.value;
        this.handleSearch({ visible });
    }

    handleKeywordChange = (e) => {
        clearTimeout(tid);
        tid = setTimeout(() => { this.handleSearch({}) }, 300);
    }

    handleCategoryChange = (value) => {
        const pid = value;
        this.handleSearch({ pid });
    }

    handleSearch = ({ visible = null, pid = null }) => {
        const values = this.props.form.getFieldsValue();
        if (visible) values.visible = visible;
        if (pid) values.pid = pid;
        if (values.visible === "-1") {
            delete values.visible;
        }
        if (values.pid === "-1") {
            delete values.pid;
        }
        if (!values.keyword) {
            delete values.keyword;
        }
        this.props.onSearch(values);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { labelCol, wrapperCol } = config.searchForm;
        return (
            <Form className="search-form" layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('visible', { initialValue: '-1' })(
                            <Radio.Group onChange={this.handleVisibleChange}>
                                <Radio.Button value="-1">全部</Radio.Button>
                                <Radio.Button value="1">可见</Radio.Button>
                                <Radio.Button value="0">隐藏</Radio.Button>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="关键字">
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="分类，Slug，描述" onChange={this.handleKeywordChange} />
                        )
                    }
                </FormItem>
                <FormItem label="所属分类">
                    {
                        getFieldDecorator('pid', { initialValue: "-1" })(
                            <Select style={{ width: 150 }} onChange={this.handleCategoryChange}>
                                {
                                    this.state.availableCategories.map(data => {
                                        return <Option key={data.value} value={data.value}>{data.text}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
            // <Row gutter={24}>
            //     <Col>
            //         {
            //             getFieldDecorator('visible', { initialValue: '-1' })(
            //                 <Radio.Group onChange={this.handleVisibleChange}>
            //                     <Radio.Button value="-1">全部</Radio.Button>
            //                     <Radio.Button value="1">可见</Radio.Button>
            //                     <Radio.Button value="0">隐藏</Radio.Button>
            //                 </Radio.Group>
            //             )
            //         }
            //     </Col>
            //     <Col {...itemLayout}>
            // {
            //     getFieldDecorator('keyword')(
            //         <Input placeholder="标签，别名，关键字" onChange={this.handleKeywordChange} />
            //     )
            // }
            //     </Col>
            //     {/*<Col className="form-action" {...actionLayout}>
            //         <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            //         <Button onClick={this.handleReset}>重置</Button>
            //     </Col>*/}
            // </Row>
        )
    }
}

CategorySearch.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func,
    onReset: PropTypes.func
}

export default Form.create()(CategorySearch);