import React from 'react'
import ContextMenu from '../elements/ContextMenu.component'
import ActionButton from '../elements/ActionButton.component'

const VolumeResources = ({ children, handleNew }) =>
  <div className='component-resource volume-resources'>
    <header>
      <h3 className='with-icon icon-satellite'>Volumes</h3>
      <ContextMenu>
        <ActionButton onClick={ handleNew }
                      isAction={ true }
                      isTransparent={ true }>
          New
        </ActionButton>
      </ContextMenu>
    </header>
    { children }
  </div>

VolumeResources.propTypes = {
  children: React.PropTypes.node.isRequired,
  handleNew: React.PropTypes.func.isRequired
}

export default VolumeResources
