import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import {
  updateBookProgress,
  updateBookProgressInList
} from "../../../actions/books";

import * as S from "./style";

class ReadProgressWidget extends Component {
  state = {
    visibilityProgress: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  saveProgressClick = e => {
    e.preventDefault();
    const {
      pages,
      goodreadsId,
      updateBookProgress,
      inList,
      updateBookProgressInList
    } = this.props;
    const readPages = parseInt(this.state.readPages);

    if ( isNaN(readPages) || readPages < 0 || readPages > pages ) {
      toastr.error('Error', "Invalid value");
      return
    } else {
      if (inList) {
        updateBookProgressInList(readPages, goodreadsId)
          .then(() => {
            this.setState({ visibilityProgress: false });
            toastr.success("Successful", "Changes installed successfully");
          })
          .catch(error =>
            toastr.error('Server Error', error.response.data.error));
      } else {
        updateBookProgress(readPages, goodreadsId).then(() => {
          this.setState({ visibilityProgress: false });
          toastr.success("Successful", "Changes installed successfully");
        })
          .catch(error =>
            toastr.error('Server Error', error.response.data.error));
      }
    }
  };

  render() {
    const { pages, readPages } = this.props;
    const { visibilityProgress } = this.state;
    const value = readPages || 0;
    return visibilityProgress ? (
      <div>
        <S.Div>
          <span>Currently on </span>
          <S.Input
            type="text"
            name="readPages"
            id="readPages"
            defaultValue={value}
            onChange={this.onChange}
          />
          <span>of {pages}</span>
        </S.Div>

        <S.Button onClick={this.saveProgressClick}>Save</S.Button>
      </div>
    ) : (
      <div>
        <S.Progress value={value} max={pages} />
        <S.Stat>
          {value}/{pages}
        </S.Stat>
        <S.Button
          onClick={() => this.setState({ visibilityProgress: true })}
        >
          Update progress
        </S.Button>
      </div>
    );
  }
}

ReadProgressWidget.propTypes = {
  pages: PropTypes.number.isRequired,
  readPages: PropTypes.number.isRequired,
  goodreadsId: PropTypes.string.isRequired,
  updateBookProgressInList: PropTypes.func.isRequired,
  updateBookProgress: PropTypes.func.isRequired,
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { updateBookProgress, updateBookProgressInList }
)(ReadProgressWidget);
