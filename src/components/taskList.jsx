import React from "react";
import { Table, Tag, Flex } from "antd";
import { Button } from "../components/ui/button";
import { Popconfirm } from "antd";
import { categoryType } from "../lib/data";
import EditItemModal from "../components/ui/editForm";

const TaskList = ({ className, listData, pageSize }) => {
  console.log("🚀 ~ TaskList ~ pageSize:", pageSize)
  const [dataTable, setDataTable] = React.useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // state cho modal
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState(null);

  React.useEffect(() => {
    setDataTable(listData);
  }, [listData, pageSize]);

  const columns = React.useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <b>{text}</b>,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        filters: categoryType,
        onFilter: (value, record) => record.category === value,
      },
      {
        title: "Price ($)",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
        render: (value) => `$${value.toFixed(2)}`,
      },
      {
        title: "Stock",
        dataIndex: "stock",
        key: "stock",
        sorter: (a, b) => a.stock - b.stock,
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        render: (rating) => (
          <Tag color={rating >= 4 ? "green" : rating === 3 ? "orange" : "red"}>
            {"★".repeat(rating)}
          </Tag>
        ),
        sorter: (a, b) => a.rating - b.rating,
      },
      {
        title: "Created",
        dataIndex: "created",
        key: "created",
        sorter: (a, b) => new Date(a.created) - new Date(b.created),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <div className="flex gap-2">
            <Button onClick={() => handleOpenEdit(record)}>Edit</Button>
            <Popconfirm
              title="Delete this item?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className="bg-red-500"
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ],
    []
  );

  // selection
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  // delete
  const handleDelete = (id) => {
    setDataTable((prev) => prev.filter((item) => item.id !== id));
    setSelectedRowKeys((prev) => prev.filter((key) => key !== id));
  };

  const handleDeleteSelected = () => {
    setLoading(true);
    setTimeout(() => {
      setDataTable((prev) =>
        prev.filter((item) => !selectedRowKeys.includes(item.id))
      );
      setSelectedRowKeys([]);
      setLoading(false);
    }, 50);
  };

  // edit
  const handleOpenEdit = (record) => {
    setEditingRecord(record);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingRecord(null);
  };

  const handleSaveEdit = (values) => {
    setDataTable((prev) =>
      prev.map((item) =>
        item.id === editingRecord.id ? { ...item, ...values } : item
      )
    );
    handleCloseEdit();
  };

  
  return (
    <div className={`${className} w-full`}>
      <div className="space-y-4 flex flex-row items-center justify-between w-full bg-neutral-50  dark:bg-slate-900  rounded-xl mt-3 shadow-xl border border-neutral-200 p-6">
        <div style={{ width: "100%" }}>
          <Flex gap="middle" vertical>
            <Table
              columns={columns}
              rowSelection={rowSelection}
              dataSource={dataTable}
               pagination={{
                pageSize: pageSize ?? 10,
                hideOnSinglePage: true, // hide if only one page
              }}
              rowKey="id"
              bordered
            />
            <Flex align="center" gap="middle">
              <Button
                onClick={handleDeleteSelected}
                disabled={!hasSelected}
                loading={loading}
                className="text-sm text-white dark:bg-blue-500 dark:text-[#ddd]"
              >
                Delete Selected
              </Button>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            </Flex>
          </Flex>
        </div>
      </div>

      {/* Modal Edit */}
      <EditItemModal
        open={isEditOpen}
        item={editingRecord}
        onCancel={handleCloseEdit}
        onSave={handleSaveEdit}
      />

    </div>
  );
};

export default TaskList;
