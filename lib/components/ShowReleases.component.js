import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { orbitingSatellite } from '../visuals/orbitingSatellite'

export default class ShowContainer extends React.Component {
  componentDidMount() { orbitingSatellite.start() }
  componentWillUnmount() { orbitingSatellite.stop() }

  render() {
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>
            <button className='esc' onClick={ () => window.location = window.location.href.replace(/\/releases/, '') } />
            Releases
          </div>
          <div className='context-menu' />
        </header>

        <div className='accordion-table'>
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

          <article>
            <header>
              <h4>
                <label htmlFor='accordion2' className='release-label'>March 12, 2016 1:28</label>
                <menu className='context-menu'>
                  <span className='option'>5 changes</span>
                  <span className='option'>
                    <label htmlFor='accordion2'>view configuration</label>
                  </span>
                </menu>
              </h4>
            </header>

            <input type='checkbox' id='accordion2' />
            <section className='accordion-data'>
              <pre>
                Deploy details<br />
                details<br />
                details<br />
                details
              </pre>
            </section>
          </article>

          <article>
            <header>
              <h4>
                <label htmlFor='accordion3' className='release-label'>March 8, 2016 17:02</label>
                <menu className='context-menu'>
                  <span className='option'>3 changes</span>
                  <span className='option'>
                    <label htmlFor='accordion3'>view configuration</label>
                  </span>
                </menu>
              </h4>
            </header>

            <input type='checkbox' id='accordion3' />
            <section className='accordion-data'>
              <pre>
                Deploy details<br />
                details<br />
                details<br />
                details
              </pre>
            </section>
          </article>

        </div>
      </section>
    )
  }
}
