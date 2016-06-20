import React from 'react'
import { Link } from 'react-router'
import styles from './styles.module.css'

export default class BreadcrumbItem extends React.Component {
  render() {
    const { name, path } = this.props.route
    const { pathname, isLast } = this.props
    const to = isLast ? pathname : path

    return(
      <li className={ styles.container }>
        <i className='fa-li fa fa-chevron-right' />
        <Link to={ to }>
          { name }
        </Link>
      </li>
    )
  }
}
