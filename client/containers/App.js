import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {

		return (
			<div>App
        <Navbar />

        <Footer />
      </div>
		)
	}
}
