import React from 'react';
import apiUtil from '../apiUtil';
import YellText from './YellText';

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
      <ul className="gm_yell-container h-100 rounded">
        {yells.map((yell, i) => (
          <li key={`yell_${i}`} className="gm_yell-message">
            <YellText {...yell} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Yells;
