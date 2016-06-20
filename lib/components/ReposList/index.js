import React from 'react'
import styles from './styles.module.css'
import ReposListItem from 'components/ReposListItem'
import FlipChange from 'components/FlipChange'

export default class ReposList extends React.Component {
  static propTypes = {
    repos: React.PropTypes.object.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  }

  render() {
    const { onEdit, onRemove, repos } = this.props

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true }>
          {
            repos.map((repo, index) => (
              <ReposListItem key={ index }
                             onRemove={ onRemove(repo.key()) }
                             onEdit={ onEdit(repo.key()) }
                             repo={ repo } />
            ))
          }
        </FlipChange>
      </div>)
  }
}
