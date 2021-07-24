'use strict';

const _ = require('lodash');

const createProvider = emailConfig => {
  const providerName = _.toLower(emailConfig.provider);
  let provider;
  try {
    provider = require(`siapi-provider-email-${providerName}`);
  } catch (err) {
    throw new Error(
      `The provider package isn't installed. Please run \`npm install siapi-provider-email-${providerName}\` --save`
    );
  }
  return provider.init(emailConfig.providerOptions, emailConfig.settings);
};

module.exports = async () => {
  const emailConfig = _.get(siapi.plugins, 'email.config', {});
  siapi.plugins.email.provider = createProvider(emailConfig);

  // Add permissions
  const actions = [
    {
      section: 'settings',
      category: 'email',
      displayName: 'Access the Email Settings page',
      uid: 'settings.read',
      pluginName: 'email',
    },
  ];

  await siapi.admin.services.permission.actionProvider.registerMany(actions);
};
