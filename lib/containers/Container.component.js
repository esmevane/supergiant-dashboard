import React from 'react'

export default class Container extends React.Component {
  static propTypes = {
    container: React.PropTypes.object.isRequired,
    destroy: React.PropTypes.func.isRequired
  }

  render() {
    const { container, destroy } = this.props

    return(
      <article className='table-row lined'>
        <div className='col-10'>
          <h4>
            { container.get('image') }
          </h4>
          <p className='text-note'>
            {
              container.get('env').count()
            } env variables | {
              container.get('ports').count()
            } open ports
          </p>
        </div>
        <div className='col-2 text-right'>
          <button className='glyph glyph-x'
                  onClick={ destroy } />&nbsp; &nbsp;
        </div>
      </article>
    )
  }
}
