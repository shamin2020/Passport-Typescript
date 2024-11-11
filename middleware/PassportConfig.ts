import passport from "passport";

import { PassportStrategy } from "../interfaces";

export default class PassportConfig {
  private readonly strategies: PassportStrategy[];

  constructor(strategies: PassportStrategy[]) {
    this.strategies = strategies;
    this.addStrategies();
  }

  /* FIXED  */
  private addStrategies(): void {
    this.strategies.forEach((pStrategy: PassportStrategy) => {
      passport.use(pStrategy.name, pStrategy.strategy);
    });
  }
}
