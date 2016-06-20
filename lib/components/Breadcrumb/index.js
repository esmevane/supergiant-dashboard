import React from 'react'
import BreadcrumbItem from 'components/BreadcrumbItem'
import styles from './styles.module.css'

export default class Breadcrumb extends React.Component {
  render() {
    const { routes, location } = this.props
    const { pathname } = location

    const toItem = (route, index, list) =>
      <BreadcrumbItem key={ index }
                      route={ route }
                      pathname={ pathname }
                      isLast={ (index + 1) === list.length } />

    const items = routes.filter(route => route.name).map(toItem)

    return(
      <div className={ styles.container }>
        <ul className='fa-ul'>
          { items }
        </ul>
      </div>
    )
  }
}
