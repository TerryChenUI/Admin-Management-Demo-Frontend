import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Form, Button, Input, Switch, Radio, Upload, Icon, Select, Modal } from 'antd';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Editor } from '../../../components';
import { time, config } from '../../../utils';
import { ArticleService, CategoryService, TagService, UploadService } from '../../../services';

const FormItem = Form.Item;
const Option = Select.Option;
const { RadioButton, RadioGroup } = Radio;

class ArticleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saving: false,
            editorContent: EditorState.createEmpty(),
            previewVisible: false,
            previewImage: '',
            thumb: null
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { initialValue } = nextProps;
        if (initialValue) {
            // thumb
            const { thumb, content } = initialValue;
            if (thumb) {
                const thumb = {
                    uid: thumb,
                    name: thumb.split('\\')[2],
                    filePath: thumb,
                    url: `${config.site.CORS}/${thumb}`
                };
                this.setState({
                    thumb
                });
            }

            // content
            const state = ContentState.createFromBlockArray(htmlToDraft(content).contentBlocks);
            const editorContent = EditorState.createWithContent(state);
            this.setState({
                editorContent
            });
        }
    }

    onEditorStateChange = (editorContent) => {
        this.setState({
            editorContent
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }

    handleOnChange = (info) => {
        let thumb = {
            uid: info.file.uid
        };
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            const { fileName, filePath } = info.file.response.result;
            thumb.name = fileName;
            thumb.filePath = filePath;
            thumb.filePath = filePath;
            thumb.url = `${config.site.CORS}/${filePath}`;
            console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
        this.setState({
            thumb
        });
    };

    handleRemove = (file) => {
        UploadService.remove(this.state.thumb.filePath).then(() => {
            this.setState({
                thumb: null
            });
        }, (error) => {
            console.log('删除失败');
        })
    };

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
                xhr.open('POST', `${config.site.corsURL}upload`);
                // xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
                const data = new FormData(); // eslint-disable-line no-undef
                data.append('file', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const image = {
                        data: {
                            link: response.result.urlPath
                        }
                    };
                    resolve(image);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.initialValue) {
                    data._id = this.props.initialValue._id;
                }
                if (this.state.thumb) {
                    data.thumb = this.state.thumb.filePath;
                } else {
                    data.thumb = null;
                }
                data.content = draftToHtml(convertToRaw(this.state.editorContent.getCurrentContent()));
                this.setState({ saving: true });
                this.props.onSubmit(data);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { initialValue, availableCategories, availableTags } = this.props;
        const { formItemLayout, tailFormItemLayout } = config.editForm;
        const { previewVisible, previewImage, thumb } = this.state;
        const fileList = thumb ? [thumb] : [];

        const uploadProps = {
            listType: "picture",
            action: `${config.site.corsURL}upload/thumb`,
            headers: { 'X-Requested-With': null },
            fileList: fileList,
            onPreview: this.handlePreview,
            onChange: this.handleOnChange,
            onRemove: this.handleRemove
        };

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
                    {getFieldDecorator('thumb')(
                        <div>
                            <Upload {...uploadProps}>
                                {
                                    fileList.length === 1 ? null :
                                        <div className="select-picture">
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传图片</div>
                                        </div>
                                }
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
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
                    <Editor
                        wrapperStyle={{ minHeight: 500 }}
                        editorStyle={{ minHeight: 376 }}
                        editorState={this.state.editorContent}
                        onEditorStateChange={this.onEditorStateChange}
                        uploadCallback={this.uploadImageCallBack}
                    />
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
                                availableCategories.map(data => {
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
                                availableTags.map(data => {
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
                            initialValue: initialValue ? `${initialValue.state}` : "0"
                        })(
                            <Radio.Group>
                                <Radio.Button value="0">草稿</Radio.Button>
                                <Radio.Button value="1">发布</Radio.Button>
                            </Radio.Group>
                            )
                    }
                </FormItem>
                {initialValue && initialValue.meta &&
                    <FormItem
                        {...formItemLayout}
                        label="数据"
                    >
                        <span className="ant-form-text">
                            阅读次数：{initialValue.meta.views} | 点赞数：{initialValue.meta.likes} | 评论数：{initialValue.meta.likes}
                        </span>
                    </FormItem>
                }
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
                    <Button type="primary" htmlType="submit" size="large" loading={this.state.saving}>保存</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ArticleForm);