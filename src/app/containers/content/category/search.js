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
    }

    handleVisibleChange = (e) => {
        const visible = e.target.value;
        this.handleSearch({ visible });
    }

    handleKeywordChange = (e) => {
        clearTimeout(tid);
        const keyword = e.target.value;
        tid = setTimeout(this.handleSearch({ keyword }), 300);
    }

    handleCategoryChange = (pid) => {
        this.handleSearch({ pid });
    }

    handleSearch = (params) => {
        this.props.onSearch(params);
    }

    render() {
        const { form, filter, availableCategories } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form className="search-form" layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('visible', { initialValue: filter.visible })(
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
                        getFieldDecorator('pid', { initialValue: filter.pid })(
                            <Select style={{ width: 150 }} onChange={this.handleCategoryChange}>
                                {
                                    availableCategories.map(data => {
                                        return <Option key={data.value} value={data.value}>{data.text}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

CategorySearch.propTypes = {
    filter: PropTypes.object,
    availableCategories: PropTypes.array,
    onSearch: PropTypes.func
}

export default Form.create()(CategorySearch);