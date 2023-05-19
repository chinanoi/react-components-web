import React, { useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import UploadList from './UploadList';
import Dragger from './Dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

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
    onProgress?: (data: any, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    drag?: boolean;
    children?: React.ReactNode;
}

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
        children
    } = props;

    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    const handleClick = () => {
        console.log('object');
    };
    const handleFileChange = () => {

    };
    const handleRemove = () => { };
    const uploadFiles = (files: FileList, test?: boolean) => { };

    return (
        <div className="baiyi-upload-component">
            <div className="baiyi-upload-input" onClick={handleClick}>
                {drag ?
                    <Dragger onFile={(files) => { uploadFiles(files, true); }}>
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
