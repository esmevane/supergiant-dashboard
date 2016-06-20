import React from 'react'
import styles from './styles.module.css'
import Components from 'containers/Components'

export default class AppsListItem extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    onAddComponent: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
  }

  render() {
    const { app, onAddComponent, onEdit, onRemove } = this.props

    return(
      <div className={ styles.container }>
        <div className={ styles.imagery }>
          <i className='fa fa-star fa-5x' />
        </div>
        <div className={ styles.content }>
          <div className={ styles.header }>
            <div className={ styles.title }>
              { app.displayName() }
            </div>
            <div className={ styles.controls }>
              <div className={ styles.resources }>
                <div className={ styles.meter }>
                  30% cpu
                </div>
                <div className={ styles.meter }>
                  20% ram
                </div>
              </div>
              <div className={ styles.actions }>
                <button onClick={ onAddComponent(app.key()) }>
                  <span className={ styles.label }>
                    Add a component
                  </span>
                  <i className='fa fa-fw fa-chevron-circle-right fa-2x' />
                </button>
                <button onClick={ onEdit(app.key()) }>
                  <i className='fa fa-pencil-square fa-2x' />
                </button>
                <button onClick={ onRemove(app.key()) }>
                  <i className='fa fa-times-circle fa-2x' />
                </button>
              </div>
            </div>
          </div>
          <div className={ styles.subheader }>
            <div className={ styles.uri }>
              { `/apps/${app.name}` }
            </div>
            <Components app={ app }
                        scope={ `${app.key()}-components` }
                        client={ app.components } />
          </div>
        </div>
      </div>
    )
  }
}
