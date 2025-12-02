// import { productTableInfo } from './product';
// import { userTableInfo } from './user';

// const tablesInfo = [productTableInfo, userTableInfo];

// type SingleTableInfoType = (typeof tablesInfo)[number];

// type TableType = SingleTableInfoType['table'];
// type TableKeyType = SingleTableInfoType['key'];

// const exporter: Record<TableKeyType, TableType> = {};

// tablesInfo.forEach((tableInfo) => {
//   exporter[tableInfo.key] = tableInfo.table;
// });

// // console.log(exporter);

// export default exporter;
export * from './product';
export * from './user';
