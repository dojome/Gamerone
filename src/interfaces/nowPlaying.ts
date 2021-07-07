/**
 * Gamer One API Documentation
 * Welcome to the Official Gamer One API documentation.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: developer@gamerone.gg
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Game } from './game';
import { SocialNetwork } from './socialNetwork';

export interface NowPlaying {
  game: Game | null;
  /**
   * true if the user is online; false if the user is offline
   */
  online: boolean;
  /**
   * the social network the user is streaming on
   */
  onlineAt: Array<SocialNetwork>;
  /**
   * time user stopped playing the game
   */
  stoppedAt: Date;
  /**
   * time user started playing the game
   */
  createdAt: Date;
}