import React from 'react'
import styles from './styles.module.css'

export default class ReposListItem extends React.Component {
  static propTypes = {
    repo: React.PropTypes.object.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  }

  render() {
    const { onEdit, onRemove, repo } = this.props

    return(
      <div className={ styles.container }>
        <div className={ styles.content }>
          <div className={ styles.title }>
            { repo.displayName() }
          </div>
          <div className={ styles.content }>
            <table>
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>{ repo.username() }</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{ repo.email() }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={ styles.actions }>
          <button className={ styles.action }
                  onClick={ onEdit }>
            <i className='fa fa-pencil-square fa-2x' />
          </button>
          <button className={ styles.action }
                  onClick={ onRemove }>
            <i className='fa fa-times-circle fa-2x' />
          </button>
        </div>
      </div>
    )
  }
}
