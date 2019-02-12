/* eslint-disable react/destructuring-assignment */
/* eslint-disable  react/prop-types */
/* eslint-disable  guard-for-in  */
/*  eslint-disable  no-restricted-syntax */
import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton,
  InsertButton,
} from 'react-bootstrap-table';
import { observer } from 'mobx-react';

import './style.css';

class ExpandRow extends Component {
  componentWillMount() {
    this.props.store.getProduct();
  }

  /* Insert functions */
  handleInsertButtonClick = onClick => {
    onClick();
  };

  createCustomInsertButton = onClick => (
    <InsertButton
      btnContextual="btn-warning"
      btnGlyphicon="glyphicon-edit"
      onClick={() => this.handleInsertButtonClick(onClick)}
    />
  );

  onAfterInsertRow = row => {
    this.props.store.addProduct(row);
  };
  /**/

  /* Edit Functions */
  onAfterSaveCell = row => {
    this.props.store.patchProduct(row);
  };
  /**/

  /* Delete Functions */
  handleDeleteButtonClick = onClick => {
    onClick();
  };

  createCustomDeleteButton = onClick => (
    <DeleteButton
      btnText="Select the product to delete it"
      onClick={() => this.handleDeleteButtonClick(onClick)}
    />
  );

  // DELETING ROWS
  onAfterDeleteRow = row => {
    for (const i in row) {
      const deletedProductId = row[i];
      this.props.store.deleteProduct(deletedProductId);
    }
  };

  /**/
  /* Expanf Rows Functions */
  isExpandableRow = row => {
    if (row.description === '') return false;
    return true;
  };

  expandComponent = row => (
    <div>
      <p>The Description of product is : {row.description} </p>
    </div>
  );

  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow,
      afterDeleteRow: this.onAfterDeleteRow,
      deleteBtn: this.createCustomDeleteButton,
      expandRowBgColor: 'grey',
      expandBy: 'column',
    };
    const product = this.props.store.products.productsArray;

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      clickToExpand: true,
    };
    return (
      <React.Fragment>
        <h1 className="header">Products Store</h1>
        <BootstrapTable
          data={product}
          options={options}
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent}
          selectRow={selectRow}
          cellEdit={{
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell,
          }}
          deleteRow
          insertRow
          hover
        >
          <TableHeaderColumn dataField="id" isKey>
            Product Id &nbsp;&nbsp;
            <img src="/img/show.png" alt="logo" width="40" height="40" />
          </TableHeaderColumn>
          <TableHeaderColumn dataField="product" expandable={false}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="company" expandable={false}>
            Company
          </TableHeaderColumn>
          <TableHeaderColumn dataField="country" expandable={false}>
            Country
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" hidden>
            Description
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}
export default observer(ExpandRow);
