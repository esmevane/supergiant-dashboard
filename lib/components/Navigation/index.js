import React from 'react'
import { Link } from 'react-router'
import styles from './styles.module.css'

export default class Navigation extends React.Component {
  render() {
    return(
      <header className={ styles.header }>
        <div className={ styles.logo }>
          <h1>
            <Link to='/'>
              <i className='fa fa-certificate' />
              Supergiant
            </Link>
          </h1>
        </div>
        <div className={ styles.options }>
          <Link to='/tasks'>
            <i className='fa fa-server' />
          </Link>
          <Link to='/nodes'>
            <i className='fa fa-sitemap' />
          </Link>
          <Link to='/settings'>
            <i className='fa fa-cog' />
          </Link>
        </div>
      </header>
    )
  }
}
