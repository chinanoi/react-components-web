import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Upload from './components/Upload';
import Button from './components/Button';
import Icon from './components/Icon';

if (module && module.hot) {
    module.hot.accept();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Upload action="http://localhost:8000/uploadSingle">
            <Button size="lg" buttonType="primary"><Icon icon="upload" /> 上传单个 </Button>
        </Upload>
        <Upload action="http://localhost:8000/uploadSingle" multiple>
            <Button size="lg" buttonType="primary"><Icon icon="upload" /> 上传多个 </Button>
        </Upload>
        <Upload action="http://localhost:8000/uploadSingle" multiple drag>
            拖拽到这里上传
        </Upload>
        <Upload action="http://localhost:8000/uploadSingle" multiple bigFile>
            <Button size="lg" buttonType="primary"><Icon icon="upload" /> 大文件上传 </Button>
        </Upload>

    </React.StrictMode>
);
