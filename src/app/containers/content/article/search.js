import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio, Select } from 'antd';

import { CategoryService, TagService } from '../../../services';
import { config } from '../../../utils';

const FormItem = Form.Item;
const Option = Select.Option;
let tid = null;

class ArticleSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleStateChange = (e) => {
        const state = e.target.value
        this.handleSearch({ state });
    }

    handleKeywordChange = (e) => {
        clearTimeout(tid);
        const keyword = e.target.value;
        tid = setTimeout(this.handleSearch({ keyword }), 300);
    }

    handleCategoryChange = (categories) => {
        this.handleSearch({ categories });
    }

    handleTagChange = (tags) => {
        this.handleSearch({ tags });
    }

    handleSearch = (params) => {
        this.props.onSearch(params);
    }

    render() {
        const { form, filter, availableCategories, availableTags } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form className="search-form" layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('state', { initialValue: filter.state })(
                            <Radio.Group onChange={this.handleStateChange}>
                                <Radio.Button value="-1">全部</Radio.Button>
                                <Radio.Button value="1">已发布</Radio.Button>
                                <Radio.Button value="0">草稿</Radio.Button>
                                <Radio.Button value="2">回收站</Radio.Button>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="关键字">
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="标题，描述，正文内容" onChange={this.handleKeywordChange} style={{ width: 200 }} />
                        )
                    }
                </FormItem>
                <FormItem label="分类">
                    {
                        getFieldDecorator('categories')(
                            <Select mode="multiple" placeholder="请选择文章分类" style={{ width: 150 }} onChange={this.handleCategoryChange}>
                                {
                                    availableCategories.map(data => {
                                        return <Option key={data.value} value={data.value}>{data.text}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="标签">
                    {
                        getFieldDecorator('tags')(
                            <Select mode="multiple" placeholder="请选择文章标签" style={{ width: 150 }} onChange={this.handleTagChange}>
                                {
                                    availableTags.map(data => {
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

ArticleSearch.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func
}

export default Form.create()(ArticleSearch);