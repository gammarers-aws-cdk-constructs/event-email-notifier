import {
  PUBLISH_MESSAGE_FIELD,
  PUBLISH_SUBJECT_FIELD,
  PUBLISH_TOPIC_ARN_FIELD,
} from '../../settings/consts';

/**
 * Fields the publisher Lambda expects from the EventBridge input transformer.
 */
export interface PublishRequest {
  /** SNS topic ARN copied from the rule target. */
  readonly topicArn: string;
  /** Subject before runtime sanitization. */
  readonly subject: string;
  /** Value published as the SNS message body. */
  readonly message: unknown;
}

const isRecord = (event: unknown): event is Record<string, unknown> => {
  return typeof event === 'object' && event !== null && !Array.isArray(event);
};

/**
 * Render a rejected payload value so the error names what arrived.
 */
const shownValue = (value: unknown): string => {
  if (value === undefined) {
    return 'undefined';
  }

  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (value === null || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return JSON.stringify(value);
};

/**
 * Read the publisher payload produced by the EventBridge input transformer.
 *
 * @param event - Lambda event
 * @returns Topic, subject, and message body
 * @throws Error when `topicArn` is missing, empty, or not a string, `subject` is not a string, or `message` is missing
 */
export const parsePublishRequest = (event: unknown): PublishRequest => {
  if (!isRecord(event)) {
    throw new Error(
      `event is ${shownValue(event)}, expected an object with topicArn, subject, and message`,
    );
  }

  const topicArn = event[PUBLISH_TOPIC_ARN_FIELD];
  const subject = event[PUBLISH_SUBJECT_FIELD];
  const message = event[PUBLISH_MESSAGE_FIELD];

  if (!Object.hasOwn(event, PUBLISH_MESSAGE_FIELD) || message === undefined) {
    throw new Error('message is undefined, expected a value');
  }

  if (typeof topicArn !== 'string' || topicArn.length === 0) {
    throw new Error(`topicArn is ${shownValue(topicArn)}, expected a non-empty string`);
  }

  if (typeof subject !== 'string') {
    throw new Error(`subject is ${shownValue(subject)}, expected a string`);
  }

  return {
    topicArn,
    subject,
    message,
  };
};
