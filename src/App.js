import React from 'react';
import MatrixTable from './MatrixTable';

let totalDays = 31,
  totalHours = 23;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: this.setHours(),
      matrix: this.setMatrix()
    };
  }

  setMatrix = () => {
    let matrix = [];

    for (let ii = 0; ii <= totalDays; ii++) {
      matrix[ii] = [];
      for (let jj = 0; jj <= totalHours; jj++) {
        matrix[ii][jj] = 0;
      }
    }

    return matrix;
  };

  setHours() {
    let hours = [];
    for (let ii = 0; ii <= totalHours; ii++) {
      hours.push(ii);
    }

    return hours;
  }

  render = () => {
    const { hours, matrix } = this.state;

    return (
      <div>
        <div id="wrapper">
          <h1>Selection matrix</h1>
          <h2>Click and drag</h2>
          <h3>inside the dotted line</h3>
          <p>
            <a href={`https://jscoox.github.io/selectionMatrix/`}>
              Vanilla js simple prototype (without multiple selects)
            </a>
          </p>
          <MatrixTable hours={hours} matrix={matrix} />
        </div>
      </div>
    );
  };
}
