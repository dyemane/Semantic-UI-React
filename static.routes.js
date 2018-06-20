import _ from 'lodash'

import componentMenu from './docs/src/componentMenu'
import {
  getComponentInfo,
  getExampleSources,
  getInfoForSeeTags,
  getSidebarSections,
  getSubcomponentsInfo,
} from './docs/src/staticUtils'
import { getComponentPathname } from './docs/src/utils'

export default async () => {
  const exampleSources = getExampleSources()

  return [
    {
      path: '/',
      redirect: '/introduction',
    },
    {
      path: '/introduction',
      component: 'docs/src/views/Introduction',
    },
    {
      path: '/layouts',
      component: 'docs/src/views/Layouts',
    },
    {
      path: '/theming',
      component: 'docs/src/views/Theming',
    },
    {
      path: '/usage',
      component: 'docs/src/views/Usage',
    },
    ..._.map(componentMenu, baseInfo => ({
      path: getComponentPathname(baseInfo),
      component: 'docs/src/components/ComponentDoc',
      getData: async () => {
        const componentInfo = getComponentInfo(baseInfo.displayName)
        const sidebarSections = getSidebarSections(baseInfo.displayName)

        return {
          componentInfo,
          exampleSources,
          sidebarSections,
          exampleKeys: _.map(_.flatMap(sidebarSections, 'examples'), 'examplePath'),
          seeTags: getInfoForSeeTags(componentInfo),
          subcomponentsInfo: getSubcomponentsInfo(componentInfo),
        }
      },
    })),
    /* <LayoutsLayout exact path='/layouts/:name' component={LayoutsRoot} sidebar /> */
  ]
}
