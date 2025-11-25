export enum AppStep {
  WELCOME = 'WELCOME',
  SELECT_GAME = 'SELECT_GAME',
  TRADE_SETUP = 'TRADE_SETUP',
  BOT_ACTIVE = 'BOT_ACTIVE',
}

export interface TradeConfig {
  game: string;
  description: string;
  username1: string;
  username2: string;
  tradeTime: string;
}

export interface GameOption {
  id: string;
  name: string;
  image: string;
}