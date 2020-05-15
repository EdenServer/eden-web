import React from 'react';
import apiUtil from '../apiUtil';

class Yells extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { yells: [] };
    this.yells = this.yells.bind(this);
  }

  yells() {
    apiUtil.get({ url: '/api/v1/misc/yells', json: true }, (error, yells) => {
      if (!error) this.setState({ yells });
    });
  }

  componentDidMount() {
    this.yells();
    this.polling = setInterval(this.yells, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.polling);
  }

  render() {
    const { yells } = this.state;

    return (
      <ul className="gm_yell-container h-100">
        {yells.map((yell, i) => (
          <li key={`yell_${i}`} className="gm_yell-message">
            <span className="gm_yell-name">
              [{new Date(yell.date).toLocaleTimeString()}] {yell.speaker}
            </span>{' '}
            : &nbsp;
            <span className="gm_yell-text">{yell.message}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Yells;
