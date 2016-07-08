import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'
import ImagesList from 'components/ImagesList'
import Error from 'components/Error'
import styles from './styles.module.css'

const { fetch, destroy } = crud.createCrudActions('images')

class Images extends React.Component {
  static fetchData = () => fetch()

  render() {
    const {
      images,
      editImagePage,
      errorMessage,
      newImagePage,
      refresh,
      removeImage,
      requesting
    } = this.props

    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`
    const loading = requesting ? 1 : 0

    return(
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <Error message={ errorMessage } />
          <i className='fa fa-spinner fa-spin fa-2x'
             style={ { opacity: loading } }/>
          <button className={ styles.button }
                  disabled={ requesting }
                  onClick={ refresh }>
            <i className={ iconClass } title="Refresh images" />
          </button>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.menu }>
            <button className={ styles.action }
                    onClick={ newImagePage }>
              <span className={ styles.label }>
                Add an image
              </span>
              <i className='fa fa-chevron-circle-right' title="Add an image" />
            </button>
          </div>
          <ImagesList images={ images }
                      onEdit={ editImagePage }
                      onRemove={ removeImage }/>
          {
            images.count() === 0 && (
              <div key='welcome' className={ styles.welcome }>
                <div className={ styles.title }>
                  You don't have any images, yet!
                </div>
                <div className={ styles.intro }>
                  <p>
                    Images are an easy way to predefine things like your
                    environment variables, desired ports to expose, volumes,
                    and so on.
                  </p>
                  <p>
                    In a moment, when you start deploying your components,
                    the thing which you'll be changing the most are these: your
                    images.
                  </p>
                  <button className={ styles.action }
                          disabled={ requesting }
                          onClick={ newImagePage }>
                    <span className={ styles.label }>
                      Create your first image
                    </span>
                    <i className='fa fa-chevron-circle-right'
                       title="Create your first image" />
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const images = crud.getRecords(state.get('images'))
  const requesting = crud.isRequesting(state.get('images'))
  const errorMessage = crud.getErrorMessage(state.get('images'))

  return { images, errorMessage, requesting }
}

function mapDispatchToProps(dispatch, props) {
  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const newImagePage = noSubmit(() => dispatch(push(`/images/new`)))
  const refresh = noSubmit(() => dispatch(fetch()))
  const editImagePage = id =>
    noSubmit(() => (dispatch(push(`/images/${id}/edit`))))

  const removeImage = id => noSubmit(() => dispatch(destroy(id)))

  return { editImagePage, newImagePage, refresh, removeImage }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images)
