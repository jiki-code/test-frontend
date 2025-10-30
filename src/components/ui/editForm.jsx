import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import {categoryType} from "../../lib/data"


const EditItemModal = ({ open, item, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        category: item.category,
        price: item.price,
        stock: item.stock,
        rating: item.rating,
      });
    } else {
      form.resetFields();
    }
  }, [item, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave?.(values);
      })
      .catch(() => {});
  };

  return (
    <Modal
      title={item ? `Edit ${item.name}` : "Edit item"}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
           rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select options={categoryType} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <Input   type="range" min={1} max={5} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditItemModal;
