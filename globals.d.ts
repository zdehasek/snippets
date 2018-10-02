declare interface Intent = {
    intent: string;
    score: number;
    entities: Object[];
};

declare class Router {
    static CONTINUE: true
    static END: null
    static BREAK: false
}

declare function request (options:Object) : any {

}

/**
* Instance of {Request} class is passed as first parameter of handler (req)
*/
declare class Req {
   constructor();

   /**
    * @prop {number|null}
    */
   timestamp: number | null;

   /**
    * @prop {string} senderId sender.id from the event
    */
   senderId: string;

   /**
    * @prop {string} recipientId recipient.id from the event
    */
   recipientId: string;

   /**
    * @prop {string} pageId page identifier from the event
    */
   pageId: string;

   /**
    * @prop {Object} state current state of the conversation
    */
   state: any;

   /**
    * Returns intent, when using AI
    * @param {boolean|number} getDataOrScore - score limit or true for getting intent data
    * @returns {null|string|Intent}
    */
   intent(getDataOrScore?: boolean | number): null | string | Intent;

   /**
    * Checks, when message contains an attachment (file, image or location)
    * @returns {boolean}
    */
   isAttachment(): boolean;

   /**
    * Checks, when the attachment is an image
    * @param {number} [attachmentIndex=0] - use, when user sends more then one attachment
    * @returns {boolean}
    */
   isImage(attachmentIndex?: number): boolean;

   /**
    * Checks, when the attachment is a file
    * @param {number} [attachmentIndex=0] - use, when user sends more then one attachment
    * @returns {boolean}
    */
   isFile(attachmentIndex?: number): boolean;

   /**
    * Checks for location in attachments
    * @returns {boolean}
    */
   hasLocation(): boolean;

   /**
    * Gets location coordinates from attachment, when exists
    * @returns {null|{lat:number,long:number}}
    * @example
    * const { Router } = require('wingbot');
    * const bot = new Router();
    * bot.use('start', (req, res) => {
    *     res.text('share location?', [
    *         // location share quick reply
    *         { action: 'locAction', title: 'Share location', isLocation: true }
    *     ]);
    * });
    * bot.use('locAction', (req, res) => {
    *     if (req.hasLocation()) {
    *         const { lat, long } = req.getLocation();
    *         res.text(\`Got \${lat}, \${long}\`);
    *     } else {
    *         res.text('No location received');
    *     }
    * });
    */
   getLocation(): null | any;

   /**
    * Returns whole attachment or null
    * @param {number} [attachmentIndex=0] - use, when user sends more then one attachment
    * @returns {Object|null}
    */
   attachment(attachmentIndex?: number): any | null;

   /**
    * Returns attachment URL
    * @param {number} [attachmentIndex=0] - use, when user sends more then one attachment
    * @returns {string|null}
    */
   attachmentUrl(attachmentIndex?: number): string | null;

   /**
    * Returns true, when the request is text message, quick reply or attachment
    * @returns {boolean}
    */
   isMessage(): boolean;

   /**
    * Check, that message is a quick reply
    * @returns {boolean}
    */
   isQuickReply(): boolean;

   /**
    * Check, that message is PURE text
    * @returns {boolean}
    */
   isText(): boolean;

   /**
    * Returns text of the message
    * @param {boolean} [tokenized=false] - when true, message is normalized to lowercase with -
    * @returns {string}
    * @example
    * console.log(req.text(true)) // "can-you-help-me"
    */
   text(tokenized?: boolean): string;

   /**
    * Returns the request expected handler in case have been set last response
    * @returns {string|null}
    */
   expected(): string | null;

   /**
    * Returns action or data of quick reply
    * When getData is true, object will be returned. Otherwise string or null.
    * @param {boolean} [getData=false]
    * @returns {null|string|Object}
    * @example
    * typeof res.quickReply() === 'string' || res.quickReply() === null;
    * typeof res.quickReply(true) === 'object';
    */
   quickReply(getData?: boolean): null | string | any;

   /**
    * Returns true, if request is the postback
    * @returns {boolean}
    */
   isPostBack(): boolean;

   /**
    * Returns true, if request is the referral
    * @returns {boolean}
    */
   isReferral(): boolean;

   /**
    * Returns true, if request pass thread control
    * @returns {boolean}
    */
   isPassThread(): boolean;

   /**
    * Returns true, if request is the optin
    * @returns {boolean}
    */
   isOptin(): boolean;

   /**
    * Returns action of the postback or quickreply
    * When getData is true, object will be returned. Otherwise string or null.
    * 1. the postback is checked
    * 2. the referral is checked
    * 3. the quick reply is checked
    * 4. expected keywords are checked
    * 5. expected state is checked
    * @param {boolean} [getData=false]
    * @returns {null|string|Object}
    * @example
    * typeof res.action() === 'string' || res.action() === null;
    * typeof res.action(true) === 'object';
    */
   action(getData?: boolean): null | string | any;

   /**
    * Returns action or data of postback
    * When getData is true, object will be returned. Otherwise string or null.
    * @param {boolean} [getData=false]
    * @returns {null|string|Object}
    * @example
    * typeof res.postBack() === 'string' || res.postBack() === null;
    * typeof res.postBack(true) === 'object';
    */
   postBack(getData?: boolean): null | string | any;

}

/**
* Instance of responder is passed as second parameter of handler (res)
* @class Res
*/
declare class Res {
   /**
    * The empty object, which is filled with res.setState() method
    * and saved (with Object.assign) at the end of event processing
    * into the conversation state.
    * @prop {Object}
    */
   newState: any;

   /**
    * @param {string} messagingType
    * @param {string} [tag]
    * @returns {this}
    */
   setMessgingType(messagingType: string, tag?: string): this;

   /**
    * Returns true, when responder is not sending an update (notification) message
    * @returns {boolean}
    */
   isResponseType(): boolean;

   /**
    * @type {Object}
    */
   data: any;

   /**
    * Set temporary data to responder, which are persisted through single event
    * @param {Object} data
    * @returns {this}
    * @example
    * bot.use('foo', (req, res, postBack) => {
    *     res.setData({ a: 1 });
    *     postBack('bar');
    * });
    * bot.use('bar', (req, res) => {
    *     res.data.a; // === 1 from postback
    * });
    */
   setData(data: any): this;

   /**
    * Send text as a response
    * @param {string} text - text to send to user, can contain placeholders (%s)
    * @param {...Object.<string, string>|Object[]} [quickReplies] - quick replies object
    * @returns {this}
    * @example
    * // simply
    * res.text('Hello %s', name, {
    *     action: 'Quick reply',
    *     another: 'Another quick reply'
    * });
    * // complex
    * res.text('Hello %s', name, [
    *     { action: 'action', title: 'Quick reply' },
    *     {
    *         action: 'complexAction', // required
    *         title: 'Another quick reply', // required
    *         match: 'string' || /regexp/, // optional
    *         someData: 'Will be included in payload data' // optional
    *     }
    * ]);
    */
   text(text: string, ...quickReplies?: any | any[]): this;

   /**
    * Sets new attributes to state (with Object.assign())
    * @param {Object} object
    * @returns {this}
    * @example
    * res.setState({ visited: true });
    */
   setState(object: any): this;

   /**
    * Appends quick reply, to be sent with following text method
    * @param {string} action - relative or absolute action
    * @param {string} title - quick reply title
    * @param {Object} [data] - additional data
    * @param {boolean} [prepend] - set true to add reply at the beginning
    * @example
    * bot.use((req, res) => {
    *     res.addQuickReply('barAction', 'last action');
    *     res.addQuickReply('theAction', 'first action', {}, true);
    *     res.text('Text', {
    *         fooAction: 'goto foo'
    *     }); // will be merged and sent with previously added quick replies
    * });
    */
   addQuickReply(action: string, title: string, data?: any, prepend?: boolean): void;

   /**
    * When user writes some text as reply, it will be processed as action
    * @param {string} action - desired action
    * @param {Object} data - desired action data
    * @returns {this}
    */
   expected(action: string, data: any): this;

   /**
    * Converts relative action to absolute action path
    * @param {string} action - relative action to covert to absolute
    * @returns {string} absolute action path
    */
   toAbsoluteAction(action: string): string;

   /**
    * Sends image as response. Requires appUrl option to send images from server
    * @param {string} imageUrl - relative or absolute url
    * @param {boolean} [reusable] - force facebook to cache image
    * @returns {this}
    * @example
    * // image on same server (appUrl option)
    * res.image('/img/foo.png');
    * // image at url
    * res.image('https://google.com/img/foo.png');
    */
   image(imageUrl: string, reusable?: boolean): this;

   /**
    * Sends video as response. Requires appUrl option to send videos from server
    * @param {string} videoUrl - relative or absolute url
    * @param {boolean} [reusable] - force facebook to cache asset
    * @returns {this}
    * @example
    * // file on same server (appUrl option)
    * res.video('/img/foo.mp4');
    * // file at url
    * res.video('https://google.com/img/foo.mp4');
    */
   video(videoUrl: string, reusable?: boolean): this;

   /**
    * Sends file as response. Requires appUrl option to send files from server
    * @param {string} fileUrl - relative or absolute url
    * @param {boolean} [reusable] - force facebook to cache asset
    * @returns {this}
    * @example
    * // file on same server (appUrl option)
    * res.file('/img/foo.pdf');
    * // file at url
    * res.file('https://google.com/img/foo.pdf');
    */
   file(fileUrl: string, reusable?: boolean): this;

   /**
    * Sets delay between two responses
    * @param {number} [ms=600]
    * @returns {this}
    */
   wait(ms?: number): this;

   /**
    * Sends "typing..." information
    * @returns {this}
    */
   typingOn(): this;

   /**
    * Stops "typing..." information
    * @returns {this}
    */
   typingOff(): this;

   /**
    * Reports last message from user as seen
    * @returns {this}
    */
   seen(): this;

   /**
    * Pass thread to another app
    * @param {string} targetAppId
    * @param {string|Object} [data]
    * @returns {this}
    */
   passThread(targetAppId: string, data?: string | any): this;

   /**
    * Sends Receipt template
    * @param {string} recipientName
    * @param {string} [paymentMethod='Cash'] - should not contain more then 4 numbers
    * @param {string} [currency='USD'] - sets right currency
    * @param {string} [uniqueCode=null] - when omitted, will be generated randomly
    * @returns {ReceiptTemplate}
    * @example
    * res.receipt('Name', 'Cash', 'CZK', '1')
    *     .addElement('Element name', 1, 2, '/inside.png', 'text')
    *     .send();
    */
   receipt(recipientName: string, paymentMethod?: string, currency?: string, uniqueCode?: string): ReceiptTemplate;

   /**
    * Sends nice button template. It can redirect user to server with token in url
    * @param {string} text
    * @returns {ButtonTemplate}
    * @example
    * res.button('Hello')
    *     .postBackButton('Text', 'action')
    *     .urlButton('Url button', '/internal', true) // opens webview with token
    *     .urlButton('Other button', 'https://goo.gl') // opens in internal browser
    *     .send();
    */
   button(text: string): ButtonTemplate;

   /**
    * Creates a generic template
    * @param {boolean} [shareable] - ability to share template
    * @param {boolean} [isSquare] - use square aspect ratio for images
    * @example
    * res.genericTemplate()
    *     .addElement('title', 'subtitle')
    *         .setElementImage('/local.png')
    *         .setElementAction('https://www.seznam.cz')
    *         .postBackButton('Button title', 'action', { actionData: 1 })
    *     .addElement('another', 'subtitle')
    *         .setElementImage('https://goo.gl/image.png')
    *         .setElementActionPostback('action', { actionData: 1 })
    *         .urlButton('Local link with extension', '/local/path', true, 'compact')
    *     .send();
    * @returns {GenericTemplate}
    */
   genericTemplate(shareable?: boolean, isSquare?: boolean): GenericTemplate;

   /**
    * Creates a generic template
    * @example
    * res.list('compact')
    *     .postBackButton('Main button', 'action', { actionData: 1 })
    *     .addElement('title', 'subtitle')
    *         .setElementImage('/local.png')
    *         .setElementUrl('https://www.seznam.cz')
    *         .postBackButton('Button title', 'action', { actionData: 1 })
    *     .addElement('another', 'subtitle')
    *         .setElementImage('https://goo.gl/image.png')
    *         .setElementAction('action', { actionData: 1 })
    *         .urlButton('Local link with extension', '/local/path', true, 'compact')
    *     .send();
    * @param {'large'|'compact'} [topElementStyle='large']
    * @returns {ListTemplate}
    */
   list(topElementStyle?: "large" | "compact"): ListTemplate;

}

/**
* @typedef {Object} TemplateContext
* @prop {string} [appUrl]
* @prop {string} [token]
* @prop {string} [senderId]
* @prop {Function} [translator]
*/
declare type TemplateContext = {
   appUrl?: string;
   token?: string;
   senderId?: string;
   translator?: ()=>any;
};

/**
* @class
*/
declare class BaseTemplate {
   constructor(onDone: ()=>any, context?: TemplateContext);

}

/**
* Helps with creating of button template
* Instance of button template is returned by {Responder}
* @class ButtonTemplate
* @extends BaseTemplate
*/
declare class ButtonTemplate extends BaseTemplate {
   /**
    * Adds button. When hasExtension is set to true, url will contain hash like:
    *
    * @param {string} title - button text
    * @param {string} linkUrl - button url
    * @param {boolean} hasExtension - includes token in url
    * @param {string} [webviewHeight=null] - compact|tall|full
    * @returns {this}
    * @memberOf ButtonTemplate
    */
   urlButton(title: string, linkUrl: string, hasExtension?: boolean, webviewHeight?: string): this;

   /**
    * Adds button, which makes another action
    * @param {string} title - Button title
    * @param {string} action - Button action (can be absolute or relative)
    * @param {Object} [data={}] - Action data
    * @returns {this}
    * @memberOf ButtonTemplate
    */
   postBackButton(title: string, action: string, data?: any): this;

   /**
    * @returns {this}
    * @memberOf ButtonTemplate
    */
   shareButton(): this;

}

/**
* Generic template utility
* @class GenericTemplate
* @extends ButtonTemplate
*/
declare class GenericTemplate extends ButtonTemplate {
   /**
    * Adds element to generic template
    * @param {string} title
    * @param {string} [subtitle=null]
    * @param {boolean} [dontTranslate=false]
    * @returns {this}
    * @memberOf GenericTemplate
    */
   addElement(title: string, subtitle?: string, dontTranslate?: boolean): this;

   /**
    * Sets url of recently added element
    * @returns {this}
    * @memberOf GenericTemplate
    */
   setElementActionShare(): this;

   /**
    * Sets url of recently added element
    * @param {string} action - Button action (can be absolute or relative)
    * @param {Object} [data={}] - Action data
    * @returns {this}
    * @memberOf GenericTemplate
    */
   setElementActionPostback(action: string, data?: any): this;

   /**
    * Sets image of recently added element
    * @param {string} image
    * @returns {this}
    * @memberOf GenericTemplate
    */
   setElementImage(image: string): this;

   /**
    * Sets default action of recently added element
    * @param {string} url - button url
    * @param {boolean} hasExtension - includes token in url
    * @param {string} [webviewHeight=null] - compact|tall|full
    * @returns {this}
    * @memberOf GenericTemplate
    */
   setElementAction(url: string, hasExtension?: boolean, webviewHeight?: string): this;

}

/**
* Generic template utility
* @class ListTemplate
* @extends ButtonTemplate
*/
declare class ListTemplate extends ButtonTemplate {
   /**
    * Adds element to generic template
    * @param {string} title
    * @param {string} [subtitle=null]
    * @param {boolean} [dontTranslate=false]
    * @returns {this}
    * @memberOf ListTemplate
    */
   addElement(title: string, subtitle?: string, dontTranslate?: boolean): this;

   /**
    * Sets url of recently added element
    * @param {any} url
    * @param {boolean} [hasExtension=false]
    * @returns {this}
    * @memberOf ListTemplate
    */
   setElementUrl(url: any, hasExtension?: boolean): this;

   /**
    * Sets image of recently added element
    * @param {string} image
    * @returns {this}
    * @memberOf ListTemplate
    */
   setElementImage(image: string): this;

   /**
    * Sets default action of recently added element
    * @param {string} url - button url
    * @param {boolean} hasExtension - includes token in url
    * @param {string} [webviewHeight=null] - compact|tall|full
    * @returns {this}
    */
   setElementAction(url: string, hasExtension?: boolean, webviewHeight?: string): this;

}

/**
* Provides fluent interface to make nice Receipts
* Instance of button template is returned by {Responder}
* @class ReceiptTemplate
* @extends BaseTemplate
*/
declare class ReceiptTemplate extends BaseTemplate {
   /**
    * Adds item to receipt
    * @param {string} title
    * @param {number} [price=0] - a item price
    * @param {number} [quantity=null] - amount of items
    * @param {string} [image=null] - image of item
    * @param {string} [subtitle=null] - optional subtitle
    * @returns {this}
    * @memberOf ReceiptTemplate
    */
   addElement(title: string, price?: number, quantity?: number, image?: string, subtitle?: string): this;

}