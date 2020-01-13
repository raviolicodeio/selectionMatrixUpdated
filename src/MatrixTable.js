import React from 'react';
import _ from './utils';

export default class MatrixTable extends React.Component {
  constructor() {
    super();
    this.state = {
      matrixCellValue: 0, // 0 for inactive, 1 for active
      isHighlighting: false,
      firstRowHighlighted: 0,
      firstColHighlighted: 0,
      lastRowHighlighted: 0,
      lastColHighlighted: 0
    };

    document.addEventListener('mouseup', this.handleOnMouseUp);
  }

  handleOnClick = event => {
    event.preventDefault();
    event.stopPropagation();

    if (_.detectLeftButtonClick(event)) {
      const { cellRow, cellCol } = _.getCoordsFromAttributes(event.target);
      const { matrix } = this.props;
      const getCellValue = matrix[cellRow][cellCol];
      const toggledCellValue = getCellValue === 0 ? 1 : 0;

      this.setState({
        matrixCellValue: toggledCellValue, // toggle matrix cell value state
        isHighlighting: true, // toggle highlighting on
        firstRowHighlighted: cellRow,
        firstColHighlighted: cellCol,
        lastRowHighlighted: cellRow,
        lastColHighlighted: cellCol
      });
    }
  };

  handleOnMove = event => {
    event.preventDefault();
    event.stopPropagation();

    const { cellRow, cellCol } = _.getCoordsFromAttributes(event.target);

    this.setState({
      lastRowHighlighted: cellRow,
      lastColHighlighted: cellCol
    });
  };

  handleOnMouseUp = event => {
    const { matrixCellValue } = this.state;
    const { matrix } = this.props;
    const { lowRow, highRow, lowCol, highCol } = this.getAbsolutes();

    if (_.detectLeftButtonClick(event)) {
      for (let rr = lowRow; rr <= highRow; rr++) {
        for (let cc = lowCol; cc <= highCol; cc++) {
          matrix[rr][cc] = matrixCellValue;
        }
      }

      // toggle highlighting off
      this.setState({ isHighlighting: false });
    }
  };

  isDragging = (row, column) => {
    const { isHighlighting } = this.state;
    const { lowRow, highRow, lowCol, highCol } = this.getAbsolutes();

    const isRow = lowRow <= row && highRow >= row,
      isCol = lowCol <= column && highCol >= column;

    return isRow && isCol && isHighlighting;
  };

  // needed for dragging in all directions
  getAbsolutes() {
    const {
      firstRowHighlighted,
      firstColHighlighted,
      lastRowHighlighted,
      lastColHighlighted
    } = this.state;

    return {
      lowRow: Math.min(firstRowHighlighted, lastRowHighlighted),
      highRow: Math.max(firstRowHighlighted, lastRowHighlighted),
      lowCol: Math.min(firstColHighlighted, lastColHighlighted),
      highCol: Math.max(firstColHighlighted, lastColHighlighted)
    };
  }

  render = () => {
    const { hours, matrix } = this.props;

    return (
      <div id={`matrixDiv`}>
        {/* hours row */}
        <table>
          <tbody>
            <tr>
              {hours.map(ii => {
                return (
                  <td className={`th`} width={30} key={`${ii}-hours`}>
                    {ii}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        {/* selection table */}
        <table width={`100%`}>
          <tbody>
            {matrix.map((row, rowIndex) => {
              return (
                <tr key={`${rowIndex}-tr`}>
                  {row.map((col, colIndex) => {
                    let tdState = colIndex <= 9 ? `isDisabled` : ``,
                      isDisabled = ~tdState.indexOf('isDisabled');

                    // if td is not disabled, apply UI
                    if (!isDisabled) {
                      tdState = this.isDragging(rowIndex, colIndex)
                        ? `isDragging`
                        : ``;

                      tdState +=
                        matrix[rowIndex][colIndex] === 1
                          ? ` isHighlighted`
                          : ``;
                    }

                    return (
                      <td
                        width={30}
                        data-row={rowIndex}
                        data-col={colIndex}
                        className={tdState}
                        onMouseDown={event => this.handleOnClick(event)}
                        onMouseMove={event => this.handleOnMove(event)}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
}
