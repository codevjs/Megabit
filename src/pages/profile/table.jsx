import React from "react";
import {Button, Table, Modal} from "antd";

const Datatable = ({loading, datasource, setVisible, form, handleEdit, deleteData}) => {

    const columns = [
        {
            title: 'Nama',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Umur',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Alamat',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tanggal',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render : (value) => {

                return value.toString()
            }
        },
        {
            title: 'Aksi',
            dataIndex: 'key',
            key: 'key',
            render : (value, record) => {

                return (
                  <div style={{width: 150}}>
                      <Button
                          type={"primary"}
                          onClick={() => {
                              handleEdit(value);
                              form.setFieldsValue(record)
                              setVisible(true);
                          }}
                      >
                          Edit
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                          type={"primary"}
                          ghost={true}
                          onClick={() => {

                              Modal.confirm({
                                  title : "Hapus data",
                                  content : "Apa anda yakin?",
                                  centered : true,
                                  onOk : async () => {
                                      await deleteData(value)
                                  }
                              })
                          }}
                      >
                          Hapus
                      </Button>
                  </div>
                )
            }
        }
    ];

    return (
        <div>
            <Table
                loading={loading}
                dataSource={datasource}
                columns={columns}
            />
        </div>
    )
}

export default React.memo(Datatable);