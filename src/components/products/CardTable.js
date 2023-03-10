import React from "react";
import PropTypes from "prop-types";

import styles from "../../styles/Table.module.css";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTable({ color }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.titleDiv}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>Products</h3>
            </div>
          </div>
        </div>
        <div className={styles.tableDiv}>
          {/* Projects table */}
          <table className={styles.table}>
            <thead className={styles.tableHeaderRow}>
              <tr>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Stock</th>
                <th className={styles.tableHeader}>Price</th>
                <th className={styles.tableHeader}>Categories</th>
                <th className={styles.tableHeader}>Tags</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={styles.productName}>
                  <span className={styles.productNameSpan}>name</span>
                </th>
                <td className={styles.tableData}>stock</td>
                <td className={styles.tableData}>price</td>
                <td className={styles.tableData}>categories</td>
                <td className={styles.tableData}>tags</td>
                <td className={styles.tableAction}>
                  <TableDropdown />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
