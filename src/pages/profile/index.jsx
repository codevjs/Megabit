import React, {useState, useEffect, useCallback} from "react";
import { Layout, Breadcrumb, Form, Button, notification } from 'antd';
import {Header, Footer} from "components";
import firebase from "firebase/app";
import "firebase/firestore";
import Table from "./table";
import ModalComponent from "./modal";

const { Content } = Layout;

const Profile  = () => {

    const [loading, setLoading]       = useState(false);
    const [isVisble, setVisible]      = useState(false);
    const [edit, setEdit]             = useState({isEdit: false, key : ""});
    const [datasource, setDatasource] = useState([]);
    const [form]                      = Form.useForm();

    const handleEdit = (key) => {

        setEdit({
            isEdit: true,
            key  : key
        })
    }

    const getData    = useCallback(async () => {

        setLoading(true);

        let snapshot = await firebase.firestore().collection("user").get();

        let data = []

        snapshot.forEach(function(doc) {

            console.log(doc.data());

            // doc.data() is never undefined for query doc snapshots
            data.push({
                ...doc.data(),
                key        : doc.id,
                timestamp  : doc.data()?.timestamp?.toDate() || new Date()
            })
        });

        setDatasource(data);

        setLoading(false);

    }, [])

    const createData = useCallback( async (value) => {

        try {

            setLoading(true);

            await firebase.firestore().collection("user").add(value);

            notification["success"]({
                message : "Berhasil",
                description : "Berhasil menambahkan data"
            });

            form.resetFields();

            await getData();

        } catch (e) {

            notification["error"]({
                message : "Gagal menambahkan data",
                description : e.message
            });

        } finally {

            setLoading(false);
        }

    }, [form, getData]);

    const updateData = useCallback( async (key, value) => {

        setLoading(true);

        await firebase.firestore().collection("user").doc(key).update(value)

        setLoading(false);

        notification["success"]({
            message : "Berhasil",
            description : "Berhasil memperbarui data"
        });

        form.resetFields();

         await getData();

    }, [form, getData]);

    const deleteData = useCallback( async (key) => {

        setLoading(true);

        await firebase.firestore().collection("user").doc(key).delete()

        setLoading(false);

        notification["success"]({
            message : "Berhasil",
            description : "Berhasil menghapus data"
        });

        form.resetFields();

        await getData();

    }, [form, getData]);

    useEffect(() => {

        getData().then();

    }, [getData]);

    return (

        <Layout>

            <Header />

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Profile</Breadcrumb.Item>
                </Breadcrumb>

                <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 380 }}
                >

                    <div
                        style={{textAlign : "right", marginBottom : 10}}
                    >
                        <Button
                            type={"primary"}
                            onClick={() => setVisible(true)}
                        >
                            Tambah data
                        </Button>
                    </div>

                    <ModalComponent
                        isVisible={isVisble}
                        createData={createData}
                        updateData={updateData}
                        form={form}
                        loading={loading}
                        setVisible={setVisible}
                        edit={edit}
                        setEdit={setEdit}
                    />

                   <Table
                       datasource={datasource}
                       loading={loading}
                       setVisible={setVisible}
                       form={form}
                       handleEdit={handleEdit}
                       deleteData={deleteData}
                   />

                </div>

            </Content>

            <Footer />
        </Layout>
    )
}

export default Profile;