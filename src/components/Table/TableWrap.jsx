import React from 'react';
import tableData from "../../fixtures/big.json"
import Table from "./Table";
const TableWrap = () => {
    return (
        <div>
            <h2>Таблица</h2>
            <Table data={tableData.data}/>
        </div>
    );
};

export default TableWrap;
