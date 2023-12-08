import React from 'react';
import { Button } from 'antd';

class Home extends React.Component<any, { count: number }, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  add = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render(): React.ReactNode {
    return (
      <div className="h-1000px">
        {this.state.count}
        <Button type="primary" onClick={this.add}>
          +
        </Button>
        <span className="i-ph-anchor-simple-thin w-50px h-50px" />
      </div>
    );
  }
}

export default Home;
