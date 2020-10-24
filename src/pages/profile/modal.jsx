import React, {useCallback, useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Upload} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import firebase from "firebase/app";
import "firebase/storage";

const ModalComponent = ({isVisible, createData, form, loading, setVisible, edit, setEdit, updateData}) => {

    const [files , setFiles] = useState([]);

    const onSubmit = useCallback((value) => {

        edit.isEdit
            ? updateData(edit.key, value)
            : createData(value)

        setVisible(false);

    }, [edit, createData, updateData, setVisible])

    const beforeUpload = (fileList) => {

        console.log(fileList);

        setFiles(fileList.fileList);

        let storageRef = firebase.storage().ref();

        let fileRef = storageRef.child('images/' + fileList.file.uid);

        let uploadTask = fileRef.put(fileList.file.originFileObj)

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setFiles([{
                ...fileList.file,
                percent : progress,
                status  : "uploading"
            }])

            console.log('Upload is ' + progress + '% done');

            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {

            // Handle unsuccessful uploads
        },  async () => {

            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            let downloadURL = await uploadTask.snapshot.ref.getDownloadURL()


            console.log('File available at', downloadURL);

            setFiles([{
                ...fileList.file,
                percent : 100,
                status  : "done",
                url     : downloadURL
            }])
        });
    }

    return (
        <Modal
            title={"Tambah data"}
            visible={isVisible}
            footer={null}
            closable={false}
        >
            <Form
                layout="vertical"
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item>
                    <Upload
                        listType="picture-card"
                        onChange={beforeUpload}
                        fileList={files}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Row gutter="10">
                    <Col md={24} xs={24}>
                        <Form.Item
                            label="Nama"
                            name="displayName"
                            rules={[{required : true, message : "Nama wajib diisi."}]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} xs={24}>
                        <Form.Item
                            label="Umur"
                            name="age"
                            rules={[{required : true, message : "Umur wajib diisi."}]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} xs={24}>
                        <Form.Item
                            label="Alamat"
                            name="address"
                            rules={[{required : false, message : "Alamat wajib diisi."}]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    style={{textAlign: "right"}}
                >
                    <Button
                        htmlType="button"
                        type={"primary"}
                        ghost={true}
                        shape="round"
                        onClick={ () => {
                            form.resetFields();
                            setVisible(false);
                            setEdit({isEdit : false, key : ""})
                        }}
                    >
                        Batal
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        loading={loading}
                    >
                        {edit.isEdit ? "Simpan" : "Submit" }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default React.memo(ModalComponent)