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
            <a
              onClick={async () => {
                // TODO: Implement a redux where includes the whole thing -> fix loading
                const response = await fetch("/api/url", {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ surl: record.surl })
                });
                this.props.updateTable();
              }}
            >
              Delete
            </a>
          </span>
        )
      }
    ];
  }

  componentWillMount() {
    this.props.updateTable();
  }

  render() {
    return (
      <Table
        className="url-display-table"
        dataSource={this.props.url_list}
        columns={this.columns}
        scroll={{ x: 1500, y: 300 }}
        loading={this.props.loading}
      />
    );
  }
}

UrlDisplay.propTypes = {
  updateTable: PropTypes.func.isRequired,
  url_list: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  url_list: state.update_table.url_list,
  loading: state.update_table.loading
});

export default connect(
  mapStateToProps,
  { updateTable }
)(UrlDisplay);
