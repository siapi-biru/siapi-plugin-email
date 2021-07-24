// NOTE TO PLUGINS DEVELOPERS:
// If you modify this file by adding new options to the plugin entry point
// Here's the file: siapi/docs/3.x/plugin-development/frontend-field-api.md
// Here's the file: siapi/docs/3.x/guides/registering-a-field-in-admin.md
// Also the siapi-generate-plugins/files/admin/src/index.js needs to be updated
// IF THE DOC IS NOT UPDATED THE PULL REQUEST WILL NOT BE MERGED

import React from 'react';
import { CheckPagePermissions } from 'siapi-helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import pluginLogo from './assets/images/logo.svg';
import pluginPermissions from './permissions';
import trads from './translations';
import getTrad from './utils/getTrad';
import SettingsPage from './containers/Settings';

export default siapi => {
  const pluginDescription = pluginPkg.siapi.description || pluginPkg.description;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.siapi.icon,
    id: pluginId,
    isReady: true,
    initializer: () => null,
    injectedComponents: [],
    isRequired: pluginPkg.siapi.required || false,
    layout: null,
    lifecycles: () => {},
    mainComponent: null,
    name: pluginPkg.siapi.name,
    pluginLogo,
    preventComponentRendering: false,
    trads,
    settings: {
      menuSection: {
        id: pluginId,
        title: getTrad('SettingsNav.section-label'),
        links: [
          {
            title: {
              id: getTrad('SettingsNav.link.settings'),
              defaultMessage: 'Settings',
            },
            name: 'settings',
            to: `${siapi.settingsBaseURL}/${pluginId}`,
            Component: () => (
              <CheckPagePermissions permissions={pluginPermissions.settings}>
                <SettingsPage />
              </CheckPagePermissions>
            ),
            permissions: pluginPermissions.settings,
          },
        ],
      },
    },
  };

  return siapi.registerPlugin(plugin);
};
