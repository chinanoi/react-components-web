import React, { useRef, useState, ChangeEvent } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import UploadList from './UploadList';
import Dragger from './Dragger';
import { fileToBuffer, extractExt } from '../../utils/file'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

interface ChunksProps {
    file: Blob;
    filename: string;
}

interface FileListProp {
    file: File;
    id: number;
    count?: number;
    maxSize?: number;
    hash?: string;
    suffix?: string;
    fileList?: string[];
    chunks?: ChunksProps[];
    percent?: string;
    time?: number;
}

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}

interface UploadProps {
    action: string;
    accept?: string;
    multiple?: boolean;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (data: any, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (err: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    drag?: boolean;
    children?: React.ReactNode;
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外参数 */
    data?: { [key: string]: any; };
    /**设置上传的请求头部 */
    headers?: { [key: string]: any; };
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    // 大文件
    bigFile?: boolean;
}

let id = 0

const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        accept,
        multiple,
        drag,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        children,
        name,
        data,
        headers,
        withCredentials,
        bigFile
    } = props;

    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj };
                } else {
                    return file;
                }
            });
        });
    };

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(prevList => {
            return [_file, ...prevList];
        });
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            // 需要注意的是，onUploadProgress 回调函数仅在浏览器环境下有效，在 Node.js 中不支持。另外，在某些情况下（比如使用 XMLHttpRequest 发送跨域请求），可能无法获取到完整的上传进度信息，此时需要根据实际情况进行适当的处理。
            onUploadProgress: (e) => {
                const total = e.total;
                if (!total) {
                    console.log('上传文件大小为空，请重新上传');
                    return;
                }
                let percentage = Math.round((e.loaded * 100) / total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    _file.status = 'uploading';
                    _file.percent = percentage;
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(resp => {
            updateFileList(_file, { status: 'success', response: resp.data });
            _file.status = 'success';
            _file.response = resp.data;
            if (onSuccess) {
                onSuccess(resp.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        }).catch(err => {
            updateFileList(_file, { status: 'error', error: err });
            _file.status = 'error';
            _file.error = err;
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    // 大文件相关
    function fileSlice(files: FileList) {
        const temp: FileListProp[] = [];

        Array.from(files).forEach((file) => {
            const result: FileListProp = {
                id: id++,
                file,
                time: 0,
            };

            const suffix = extractExt(file.name);
            let maxSize = 1024 * 100; // 100kb
            let count = Math.ceil(file.size / maxSize);
            let index = 0;
            const chunks: ChunksProps[] = [];

            if (count > 100) {
                maxSize = file.size / 100;
                count = 100;
            }

            result.count = count;
            result.maxSize = maxSize;
            result.suffix = suffix;

            while (index < count) {
                chunks.push({
                    file: file.slice(index * maxSize, maxSize * (index + 1)),
                    filename: `${index + 1}${suffix}`,
                });
                index++;
            }

            result.chunks = chunks;

            temp.push(result);
        });

        return temp;
    }
    const uploadBigFile = async (file: any) => {
        const result = fileSlice(file);
        const hashs = fileToBuffer(result as any);
        console.log(hashs);
        // for (const [index, data] of hashs.entries()) {
        //     result[index].hash = data;
        //     result[index].chunks?.forEach((chunk) => {
        //         chunk.filename = `${data}_${chunk.filename}`;
        //     });
        // }
    };

    const uploadFiles = (files: FileList) => {
        console.log('files', files);
        let postFiles = Array.from(files);
        // if (bigFile) {
        //     uploadBigFile(files);
        //     return;
        // }
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(file);
                }
            }
        });
    }

    return (
        <div className="baiyi-upload-component">
            <div className="baiyi-upload-input" onClick={handleClick}>
                {drag ?
                    <Dragger onFile={(files) => { uploadFiles(files); }}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="baiyi-file-input"
                    ref={fileInput}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    );
};

export default Upload;
