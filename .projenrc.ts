import { ProjenCdkConstructLibrary } from '@gammarers/projen-projects';
const project = new ProjenCdkConstructLibrary({
  cdkVersion: '2.272.0',
  name: 'event-email-notifier',
  repositoryUrl: 'https://github.com/gammarers-aws-cdk-constructs/event-email-notifier.git',
  description: 'EventBridge rule target that sends email through Amazon SNS with a static or event-derived subject.',
  keywords: ['aws', 'cdk', 'construct', 'eventbridge', 'email', 'notifier'],
  releaseToNpm: true,
  npmTrustedPublishing: true,
  devDeps: [
    // my-projen-projects
    '@gammarers/projen-projects@^0.8.0',
    // aws sdk
    '@aws-sdk/client-sns@^3.1146.0',
    // smithy
    '@smithy/node-http-handler@^4.14.2',
    // jest
    'aws-sdk-client-mock@^4.1.0',
    'aws-sdk-client-mock-jest@^4.1.0',
    // my node modules
    'quiet-json-parser@^0.5.1',
  ],
});
project.synth();
