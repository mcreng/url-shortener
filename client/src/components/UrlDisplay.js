import React, { Component } from "react";
import { Table, Divider } from "antd";
import PropTypes from "prop-types";
import CopyToClipboard from "./CopyToClipboard";
import { connect } from "react-redux";
import { updateTable } from "../actions/UpdateTableAction";
import "./UrlDisplay.css";
class UrlDisplay extends Component {
  constructor(prop) {
    super(prop);
    this.columns = [
      {
        title: "Original URL",
        dataIndex: "url",
        key: "url"
      },
      {
        title: "Shortened URL",
        dataIndex: "surl",
        key: "surl",
        width: 300
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 300,
        render: (text, record) => (
          <span>
            <a
              onClick={() =>
                CopyToClipboard(window.location.href + record.surl)
              }
            >
              Copy Shortened URL
            </a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        )
      }
    ];
  }

  componentWillMount() {
    this.props.updateTable();
  }

  //   TODO: Add delete url capability
  render() {
    return (
      <Table
        className="url-display-table"
        dataSource={this.props.url_list}
        columns={this.columns}
        scroll={{ x: 1500, y: 300 }}
      />
    );
  }
}

UrlDisplay.propTypes = {
  updateTable: PropTypes.func.isRequired,
  url_list: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  url_list: state.update_table.url_list
});

export default connect(
  mapStateToProps,
  { updateTable }
)(UrlDisplay);
