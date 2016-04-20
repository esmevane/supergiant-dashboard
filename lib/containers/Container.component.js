import React from 'react'

export default class Container extends React.Component {
  static propTypes = {
    container: React.PropTypes.object.isRequired,
    destroy: React.PropTypes.func.isRequired
  }

  render() {
    const { container, destroy } = this.props

    return(
      <article>
        <div className='col-10'>
          <h4>
            <a href='#' onClick={ e => e.preventDefault() }>
              { container.get('image') }
            </a>
          </h4>
          <p>
            {
              container.get('env').count()
            } env variables | {
              container.get('ports').count()
            } open ports
          </p>
        </div>
        <div className='col-1'>
          <button className='transparent with-glyph glyph-x-action-color'
                  onClick={ destroy } />
        </div>
      </article>
    )
  }
}
