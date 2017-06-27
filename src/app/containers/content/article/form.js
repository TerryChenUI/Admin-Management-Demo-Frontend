import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Form, Button, Input, Switch, Radio, Upload, Icon, Select } from 'antd';

// import { Editor } from '../../../components';
import { time, config } from '../../../utils';
import { ArticleService, CategoryService, TagService } from '../../../services';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let tid = null;

class ArticleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            availableCategories: [],
            availableTags: []
        };
    }

    componentWillMount() {
        CategoryService.getAll().then(response => {
            const categories = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableCategories: [...this.state.availableCategories, ...categories] });
        });
        TagService.getAll().then(response => {
            const tags = response.result.data.map(m => { return { value: m._id, text: m.name } });
            this.setState({ availableTags: [...this.state.availableTags, ...tags] });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.initialValue) {
                    data._id = this.props.initialValue._id;
                }
                this.setState({ loading: true });
                this.props.onSubmit(data);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { initialValue } = this.props;
        const { formItemLayout, tailFormItemLayout } = config.editForm;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                >
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue && initialValue.title
                    })(
                        <Input placeholder="文章标题" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="关键字"
                >
                    {getFieldDecorator('keywords', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue && initialValue.keywords
                    })(
                        <Input placeholder="文章关键字，使用','分隔" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="作者"
                >
                    {getFieldDecorator('author', {
                        initialValue: initialValue && initialValue.author
                    })(
                        <Input placeholder="文章作者" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="来源"
                >
                    {getFieldDecorator('source', {
                        initialValue: initialValue && initialValue.source
                    })(
                        <Input placeholder="文章来源" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="缩略图"
                >
                    {getFieldDecorator('thumb', {
                        initialValue: initialValue && initialValue.thumb
                    })(
                        <Upload name="thumb" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> 上传图片
                            </Button>
                        </Upload>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="简介"
                >
                    {getFieldDecorator('description', {
                        initialValue: initialValue && initialValue.description
                    })(
                        <Input type="textarea" rows={4} placeholder="简短描述" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="正文"
                >
                    {getFieldDecorator('content', {
                        initialValue: initialValue && initialValue.content
                    })(
                        <Input type="textarea" rows={10} placeholder="文章正文" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="分类"
                >
                    {getFieldDecorator('categories', {
                        initialValue: initialValue && initialValue.categories
                    })(
                        <Select mode="multiple" placeholder="请选择文章分类">
                            {
                                this.state.availableCategories.map(data => {
                                    return <Option key={data.value} value={data.value}>{data.text}</Option>
                                })
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标签"
                >
                    {getFieldDecorator('tags', {
                        initialValue: initialValue && initialValue.tags
                    })(
                        <Select mode="multiple" placeholder="请选择文章标签">
                            {
                                this.state.availableTags.map(data => {
                                    return <Option key={data.value} value={data.value}>{data.text}</Option>
                                })
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem {...formItemLayout}
                    label="状态">
                    {
                        getFieldDecorator('state', {
                            initialValue: initialValue ? `${initialValue.state}`  : "0"
                        })(
                            <Radio.Group>
                                <Radio.Button value="0">草稿</Radio.Button>
                                <Radio.Button value="1">发布</Radio.Button>
                            </Radio.Group>
                            )
                    }
                </FormItem>
                {initialValue && initialValue.create_time &&
                    <FormItem
                        {...formItemLayout}
                        label="创建时间"
                    >
                        <span className="ant-form-text">
                            {time.convert(initialValue.create_time)}
                        </span>
                    </FormItem>
                }
                {initialValue && initialValue.create_time &&
                    <FormItem
                        {...formItemLayout}
                        label="更新时间"
                    >
                        <span className="ant-form-text">
                            {time.convert(initialValue.update_time)}
                        </span>
                    </FormItem>
                }
                <FormItem className="form-action" {...tailFormItemLayout}>
                    <Link to='/articles'><Button size="large">取消</Button></Link>
                    <Button type="primary" htmlType="submit" size="large" loading={this.state.loading}>保存</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ArticleForm);