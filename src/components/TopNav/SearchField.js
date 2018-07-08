import React, { Component } from "react";
import credentials from "../../static/credentials";
import TextField from "@material-ui/core/TextField";

class SearchField extends Component {
  render() {
    return (
      <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <TextField
          placeholder="Search Video"
          value={null}
          onChange={f => f}
          fullWidth={true}
        />
      </form>
    );
  }
}

export default SearchField;
