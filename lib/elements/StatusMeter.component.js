import React from 'react'

const StatusMeter = (props) => {
  const { className = ``, title = `` } = props
  const { metricClasses = ``, detail = ``, percentage } = props

  return(
    <div className={ `status-meter ${className}` } title={ title }>
      <div className={ `status-metric ${metricClasses}` }
           title={ detail }
           style={ { width: percentage } } />
    </div>
  )
}

StatusMeter.propTypes = {
  className: React.PropTypes.string,
  detail: React.PropTypes.string,
  metricClasses: React.PropTypes.string,
  percentage: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
}

export default StatusMeter
