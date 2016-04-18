import React from 'react'

const Volume = ({ volume }) =>
  <article>
    <div className='col-8'>
      <h4>db-hd-1</h4>
      <p>GP2 drive</p>
    </div>

    <div className='col-4'>
      <h4>20% (100GB)</h4>
      <p className='text-note'>HD utilization</p>
    </div>
  </article>

export default Volume
