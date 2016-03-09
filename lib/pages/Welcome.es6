import React from 'react'
import { Link } from 'react-router'

export default class Welcome extends React.Component {
  render() {
    return(
      <section className='welcome'>
        <h1>Welcome!</h1>
        <h3>
          Get started by checking out <Link to='styleguide'>the styleguide</Link>, or <a href='book'>the manual</a>.
        </h3>
      </section>
    )
  }
}
