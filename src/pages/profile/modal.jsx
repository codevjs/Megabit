import React, {useCallback} from "react";
import {Button, Col, Form, Input, Modal, Row} from "antd";

const ModalComponent = ({isVisible, createData, form, loading, setVisible, edit, setEdit, updateData}) => {

    const onSubmit = useCallback((value) => {

        edit.isEdit
            ? updateData(edit.key, value)
            : createData(value)

        setVisible(false);

    }, [edit, createData, updateData, setVisible])

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