import { useEffect, useState } from "react";
import { ProductsType } from "./service/getProducts";
import { useTableData } from "./hooks/useTableData";
import { TableWrapper } from "../shared/Table/components/TableWrapper";
import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Skeleton,
  Table,
  TableColumnType,
} from "antd";
import { TableHeaderWrapper } from "../shared/Table/components/TableHeaderWrapper";
import { REGISTER_PRODUCTS } from "../../constants/paths/paths";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Input/Select";
import { SelectLabel } from "../shared/Input/Select/SelectLabel";
import { CategoryType } from "../Categories/service/getCategory";
import { CATEGORIES } from "../../constants/SessionStorageKeys/sessionStorageKeys";
import { useCategoryFilter } from "../../context/CategoryFilterContext/CategoryFilterContext";
import { useProductsData } from "./hooks/useProductsData";
import { useCategoriesData } from "../Categories/hooks/useCategoriesData";
import { useTableActions } from "../../hooks/useTableActions";
import { NumericFormatter } from "../shared/Formatter/NumericFormatter";
import ExpandButton from "../shared/Button/expand-button";
import EyeButton from "../shared/Button/edit-button";
import { ProductView } from "./product-description";
import DeleteButton from "../shared/Button/delete-button";

export const ProductsTable = () => {

  const { products, setProducts, isLoading, deleteProduct,contextHolder } = useTableData();

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const { getCategoryNameById } = useCategoriesData();

  const { products: initialData } = useProductsData();

  const { state } = useCategoryFilter();

  const handleExpand = (record: ProductsType) => {
    const key = record.id;
    setExpandedRowKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const navigate = useNavigate();

  const dataCategories: CategoryType[] =
    JSON.parse(sessionStorage.getItem(CATEGORIES) ?? "[]") || [];

  const { 
    getColumnSearchProps, 
    filteredData, 
    setFilteredData,
    selectedKeys,
    rowClassName,
    handleCheckboxChange,
    handleSelectAll,
    setSelectedKeys
    
 } =
    useTableActions({
      data: products,
      setData: setProducts,
    });

  const handleCategoriesChange = (selectedOption: {
    value: string | number;
    label: string;
  }) => {
    const categoryId = selectedOption.value;

    if (categoryId !== "") {
      setFilteredData((prev) =>
        prev.filter((f) => f.categoria_ids.includes(Number(categoryId)))
      );
    } else {
      setFilteredData(initialData);
    }
  };

  useEffect(() => {

    if (state.categoria_id && state.categoria_id !== null) {
      setFilteredData(
        products.filter((f) => f.categoria_ids.includes(Number(state.categoria_id)))
      );
    }
    
  }, [state.categoria_id,products]);

  const handleClick = () => {
    navigate(REGISTER_PRODUCTS);
  };

  const handleEditClick = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (record:ProductsType) => {
    deleteProduct.mutate(record)
    
  }

  const handleDeleteAll = () => {

    products.forEach((product) => {
      deleteProduct.mutate(product)
    });
    
    setSelectedKeys([]);

  }

  const categories = [
    {
      value: "",
      label: <SelectLabel onBold="Filtrar por: " afterBold="Todos" />,
    },
    ...dataCategories.map((d) => ({
      value: d.id,
      label: <SelectLabel onBold="Filtrar por: " afterBold={d.categoria} />,
    })),
  ];

  const columns: TableColumnType<ProductsType>[] = [
    {
        title: () =>

          <Flex gap={5} align="center">

          
              <Checkbox
                indeterminate={selectedKeys.length > 0}
                onChange={handleSelectAll}
                />

              {selectedKeys.length > 0 &&

              <DeleteButton
                title="Deletar todos os itens selecionados"
                onDelete={handleDeleteAll}
              />

              }
            
          </Flex>
        ,
        dataIndex:'selection',
        key:1,
        render: (_,record) => (
              <Checkbox
                checked={selectedKeys.includes(record.key)}
                onChange={() => handleCheckboxChange(record.key)}
            />
        ),
    },
    {
      key: "image",
      dataIndex: "imagePath",
      render: (value) => <Avatar shape="square" src={value} />,
    },
    {
      title: "SKU",
      key: "categorias_id",
      dataIndex: "categoria_ids",
      render: (value) => getCategoryNameById(value),
    },
    {
      title: "Nome",
      key: "nome",
      dataIndex: "nome",
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      ...getColumnSearchProps("nome", "Nome"),
    },
    {
      title: "Preço",
      key: "valorvenda",
      dataIndex: "valorvenda",
      sorter: (a, b) => parseFloat(a.valorvenda) - parseFloat(b.valorvenda),
      ...getColumnSearchProps("valorvenda", "Preço"),
      render: (value) => <NumericFormatter value={parseFloat(value)} />,
    },
    {
      title: "Media de vendas",
      key: "mediavvs",
      dataIndex: "mediaavs",
      sorter: (a, b) => parseFloat(a.mediaavs) - parseFloat(b.mediaavs),
    },
    {
      title: "ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        const isExpanded = expandedRowKeys.includes(record.id);

        return (
          <Flex gap={5} align="center">
            <ExpandButton
              onClick={() => handleExpand(record)}
              isExpanded={isExpanded}
            />
            <EyeButton onClick={() => handleEditClick(record.id)} />
            <DeleteButton onDelete={() => handleDelete(record)} />
          </Flex>
        );
      },
    },
  ];

  return (
    <TableWrapper>
        {contextHolder}
      <TableHeaderWrapper heading="Produtos gerais">
        <Flex wrap justify="space-between" align="center">
          <Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
            <Select
              options={categories}
              defaultValue={categories[state.default_index ?? 0]}
              onChange={(e) => {
                handleCategoriesChange(e);
              }}
              className="w-full md:w-[250px]"
            />
          </Flex>

          <Flex wrap gap={10} className="mt-3 xl:mt-0">
            <Button size="large" onClick={handleClick}>
              <Flex gap={5} align="center">
                <FaPlus />
                Cadastrar um produto
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </TableHeaderWrapper>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowClassName={rowClassName}
          scroll={{ x: 300 }}
          expandable={{
            expandedRowRender: (record) => <ProductView data={record} />,
            onExpand: (_, record) => handleExpand(record),
            expandedRowKeys,
            expandIcon: () => null,
          }}
        />
      )}
    </TableWrapper>
  );
};