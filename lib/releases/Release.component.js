import React from 'react'

const Release = ({ release, destroy }) =>
  <article className='deployment'>
    <header>
      <h4>
        <label htmlFor='accordion1' className='release-label'>March 16, 2016 16:54</label>
        <menu className='context-menu'>
          <span className='option'>3 changes</span>
          <span className='option'>
            <label htmlFor='accordion1'>view configuration</label>
          </span>
        </menu>
      </h4>
    </header>

    <input type='checkbox' id='accordion1' />
    <section className='accordion-data'>
      <pre>
        Deploy details<br />
        details<br />
        details<br />
        details
      </pre>
    </section>
  </article>

Release.propTypes = {
  release: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Release
