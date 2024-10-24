/* @flow */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

type SdkConfig = {|
  sdkToken: ?string,
|};

const parseSdkConfig = ({ sdkConfig, logger }): SdkConfig => {
  if (!sdkConfig.sdkToken) {
    throw new ValidationError(
      `script data attribute sdk-client-token is required but was not passed`
    );
  }

  logger.info("three domain secure v2 invoked").track({
    [FPTI_KEY.TRANSITION]: "three_DS_auth_v2",
  });

  return sdkConfig;
};
export interface ThreeDomainSecureComponentInterface {
  isEligible(): ZalgoPromise<boolean>;
  show(): ZoidComponent<void>;
}
export class ThreeDomainSecureComponent {
  logger: LoggerType;
  sdkConfig: SdkConfig;

  constructor({
    logger,
    sdkConfig,
  }: {|
    logger: LoggerType,
    sdkConfig: SdkConfig,
  |}) {
    this.logger = logger;
    this.sdkConfig = parseSdkConfig({ sdkConfig, logger });
  }

  isEligible(): ZalgoPromise<boolean> {
    return new ZalgoPromise((resolve) => {
      resolve(false);
    });
  }

  show() {
    create({ tag: "", url: "" });
  }
}
