import React from 'react'

export default class Container extends React.Component {
  static propTypes = {
    container: React.PropTypes.object.isRequired
  }

  render() {
    const { container } = this.props

    return(
      <article>
        <div className='col-6'>
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

        <div className='col-3'>
          <h4>43% (5.5GB)</h4>
          <p className='text-note'>RAM utilization</p>
        </div>

        <div className='col-3'>
          <h4>56% (21 cores)</h4>
          <p className='text-note'>CPU utilization</p>
        </div>
      </article>
    )
  }
}
