// ** Vertical Menu Components
import { useAuthCtx } from '@context/authContext'
import _ from 'lodash'
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@layouts/utils'

const VerticalMenuNavItems = (props) => {
  // ** Components Object

  const { userData } = useAuthCtx()
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink,
  }

  // ** Render Nav Menu Items

  const RenderNavItems = []
  if (userData) {
    props.items.forEach((item) => {
      if (
        item.restrictedTo &&
        !_.get(item.restrictedTo, 'role', []).includes(userData.role)
      ) {
        return
      }
      const TagName = Components[resolveNavItemComponent(item)]

      RenderNavItems.push(
        <TagName key={item.id || item.header} item={item} {...props} />,
      )
    })
  }

  return RenderNavItems
}

export default VerticalMenuNavItems
