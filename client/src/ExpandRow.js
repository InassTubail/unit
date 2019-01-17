import React, { Component } from 'react';
import axios from 'axios';
import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton,
  InsertButton,
} from 'react-bootstrap-table';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import './style.css';

class ExpandRow extends Component {
  state = {
    products: [],
  };

  // get The List of products from Database
  componentWillMount() {
    axios.get('http://localhost:3030/products').then(result => {
      this.setState({ products: result.data.data });
    });
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
    axios.post(`http://localhost:3030/products/`, {
      id: row.id,
      product: row.product,
      company: row.company,
      country: row.country,
      description: row.description,
    });
  };

  /**/
  /* Edit Functions */
  onAfterSaveCell = (row, cellName, cellValue) => {
    // console.log(`Save cell ${cellName} with value ${cellValue}`);
    // console.log('The whole row :',row);
    const idProduct = row.id;
    axios
      .patch(`http://localhost:3030/products/${idProduct}`, {
        product: row.product,
        company: row.company,
        country: row.country,
        description: row.description,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
      axios.delete(`http://localhost:3030/products/${deletedProductId}`);
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
      <p>specific info about product {row.description} </p>
    </div>
  );

  /**/

  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow,
      afterDeleteRow: this.onAfterDeleteRow,
      deleteBtn: this.createCustomDeleteButton,
      expandRowBgColor: 'grey',
      expandBy: 'column', // Currently, available value is row and column, default is row
    };
    const product = this.state.products;

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true, // click to select, default is false
      clickToExpand: true, // click to expand row, default is false
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
          // {cellEditProp}
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

export default ExpandRow;
