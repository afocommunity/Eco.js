import {
  IChatMessage,
  ChatMessage,
} from '../DataTransferObjects/V1/ChatMessage.mjs';
import ECO from '../ECO.mjs';
import { ControllerBase } from './ControllerBase.mjs';
import type { IUser } from '../DataTransferObjects/V1/User.mjs';
import { IPostResult, PostResult } from '../Utils/PostResult.mjs';
import { UserOrChannel } from '../../Definitions/UserOrChanne.mjs';

export class ChatController extends ControllerBase {
  constructor(client: ECO) {
    super(client);
  }
  /**
   * Return all non-private player chat messages sent within the given time range
   *
   * @param {number} [startDay=0] The lower bound on the time range. Default is 0.
   * @param {number} [endDay=-1] The upper bound on the time range. Default is now.
   * @memberof ChatController
   */
  public getChat(startDay = 0, endDay = -1) {
    return this.GET<ChatMessage[], IChatMessage[]>(
      `/api/v1/chat?startDay=${startDay}&endDay=${endDay}`,
      (c, d) => d.map((v) => new ChatMessage(c, v)),
    );
  }
  /**
   * Return all non-private player chat messages sent to the given tag within the given time range
   *
   * @param {string} tag The tag name in question.
   * @param {number} [startDay=0] The lower bound on the time range. Default is 0.
   * @param {number} [endDay=-1] The upper bound on the time range. Default is now.
   * @memberof ChatController
   */
  public getChatByTag(tag: string, startDay = 0, endDay = -1) {
    return this.GET<ChatMessage[], IChatMessage[]>(
      `/api/v1/chat?tag=${encodeURIComponent(
        tag,
      )}&startDay=${startDay}&endDay=${endDay}`,
      (c, d) => d.map((v) => new ChatMessage(c, v)),
    );
  }
  /**
   * Return all non-private player chat messages sent by the given user within the given time range
   *
   * @param {string | IUser} user The user name in question.
   * @param {number} [startDay=0] The lower bound on the time range. Default is 0.
   * @param {number} [endDay=-1] The upper bound on the time range. Default is now.
   * @memberof ChatController
   */
  public getChatSentBy(user: string | IUser, startDay = 0, endDay = -1) {
    return this.GET<ChatMessage[], IChatMessage[]>(
      `/api/v1/chat?tag=${encodeURIComponent(
        (user as IUser)?.Name ?? (user as string),
      )}&startDay=${startDay}&endDay=${endDay}`,
      (c, d) => d.map((v) => new ChatMessage(c, v)),
    );
  }
  /**
   * Gets the `numNextMessages` chat messages sent after the given message on the same tag.
   *
   * @param {IChatMessage} message The message in question
   * @param {number} numNextMessages The number of following messages to return.
   * @returns
   * @memberof ChatController
   */
  public getNext(message: IChatMessage, numNextMessages: number) {
    return this.POST<ChatMessage[], IChatMessage[], IChatMessage>(
      `/api/v1/chat/next?numNextMessages=${numNextMessages}`,
      message,
      (c, d) => d.map((v) => new ChatMessage(c, v)),
    );
  }
  /**
   * Gets the `numPreviousMessages` chat messages sent after the given message on the same tag.
   *
   * @param {IChatMessage} message The message in question.
   * @param {number} numPreviousMessages The number of preceding messages to return.
   * @returns
   * @memberof ChatController
   */
  public getPrevious(message: IChatMessage, numPreviousMessages: number) {
    return this.POST<ChatMessage[], IChatMessage[], IChatMessage>(
      `/api/v1/chat/previous?numNextMessages=${numPreviousMessages}`,
      message,
      (c, d) => d.map((v) => new ChatMessage(c, v)),
    );
  }
  /**
   * Send a message to a Channel or User
   */
  public sendChat(
    receiver: UserOrChannel | IUser,
    text: string,
    sender?: string | IUser,
  ): Promise<PostResult>;
  public sendChat(
    receiver: UserOrChannel | IUser,
    text?: string,
    sender?: string | IUser,
  ): Promise<PostResult> {
    const channel = encodeURIComponent(
      (receiver as IUser)?.Name ?? (receiver as string),
    );
    const sendingUser = encodeURIComponent(
      (sender as IUser)?.Name ??
        (sender as string) ??
        this.client.serverVirtualPlayerName,
    );
    const message = encodeURIComponent(text as string);

    return this.GET<PostResult, IPostResult>(
      `/api/v1/chat/sendChat?username=${sendingUser}&message=${channel} ${message}`,
      (_, $b) => new PostResult($b),
    );
  }
  public _parse(): ChatMessage {
    throw 'Not Yet Implemented';
  }
}
