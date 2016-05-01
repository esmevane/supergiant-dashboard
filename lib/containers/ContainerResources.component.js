import React from 'react'
import ContextMenu from '../elements/ContextMenu.component'
import ActionButton from '../elements/ActionButton.component'

const ContainerResources = ({ children, handleNew }) =>
  <div className='component-resource container-resources'>
    <header>
      <h3 className='with-icon icon-city'>Containers</h3>
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

ContainerResources.propTypes = {
  children: React.PropTypes.node.isRequired,
  handleNew: React.PropTypes.func.isRequired
}

export default ContainerResources
