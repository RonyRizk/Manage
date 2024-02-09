import { r as registerInstance, a as createEvent, h, e as Host, g as getElement } from './index-1e7fb42e.js';
import { R as RoomService } from './room.service-1ac5f740.js';
import { B as BookingService } from './booking.service-2c8855f6.js';
import { f as formatLegendColors, d as dateToFormattedString, i as isBlockUnit, g as getNextDay, a as addTwoMonthToDate, c as convertDMYToISO, b as computeEndDate } from './utils-39c4fb98.js';
import { a as axios } from './index-315af25e.js';
import { E as EventsService } from './events.service-c810bb11.js';
import { h as hooks } from './moment-7d60e5ef.js';
import { T as ToBeAssignedService } from './toBeAssigned.service-7371899d.js';
import { t as transformNewBLockedRooms, a as transformNewBooking, b as bookingStatus, c as calculateDaysBetweenDates } from './booking-8a72e500.js';
import { c as calendar_dates } from './calendar-dates.store-115b9ddf.js';
import { l as locales } from './locales.store-222d3a77.js';
import { c as calendar_data } from './calendar-data-050614f7.js';

const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };

const withNativeBlob$1 = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView$1 = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob$1 && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer$2 &&
        (data instanceof ArrayBuffer || isView$1(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
function toArray(data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    else {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
    if (withNativeBlob$1 && packet.data instanceof Blob) {
        return packet.data
            .arrayBuffer()
            .then(toArray)
            .then(callback);
    }
    else if (withNativeArrayBuffer$2 &&
        (packet.data instanceof ArrayBuffer || isView$1(packet.data))) {
        return callback(toArray(packet.data));
    }
    encodePacket(packet, false, encoded => {
        if (!TEXT_ENCODER) {
            TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
    });
}

// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup$1[chars.charCodeAt(i)] = i;
}
const encode$2 = (arraybuffer) => {
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
const decode$2 = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup$1[base64.charCodeAt(i)];
        encoded2 = lookup$1[base64.charCodeAt(i + 1)];
        encoded3 = lookup$1[base64.charCodeAt(i + 2)];
        encoded4 = lookup$1[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};

const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer$1) {
        const decoded = decode$2(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            if (data instanceof Blob) {
                // from WebSocket + binaryType "blob"
                return data;
            }
            else {
                // from HTTP long-polling or WebTransport
                return new Blob([data]);
            }
        case "arraybuffer":
        default:
            if (data instanceof ArrayBuffer) {
                // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
                return data;
            }
            else {
                // from WebTransport (Uint8Array)
                return data.buffer;
            }
    }
};

const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        encodePacket(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = decodePacket(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
function createPacketEncoderStream() {
    return new TransformStream({
        transform(packet, controller) {
            encodePacketToBinary(packet, encodedPacket => {
                const payloadLength = encodedPacket.length;
                let header;
                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
                if (payloadLength < 126) {
                    header = new Uint8Array(1);
                    new DataView(header.buffer).setUint8(0, payloadLength);
                }
                else if (payloadLength < 65536) {
                    header = new Uint8Array(3);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 126);
                    view.setUint16(1, payloadLength);
                }
                else {
                    header = new Uint8Array(9);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 127);
                    view.setBigUint64(1, BigInt(payloadLength));
                }
                // first bit indicates whether the payload is plain text (0) or binary (1)
                if (packet.data && typeof packet.data !== "string") {
                    header[0] |= 0x80;
                }
                controller.enqueue(header);
                controller.enqueue(encodedPacket);
            });
        }
    });
}
let TEXT_DECODER;
function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
        return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i = 0; i < size; i++) {
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
            chunks.shift();
            j = 0;
        }
    }
    if (chunks.length && j < chunks[0].length) {
        chunks[0] = chunks[0].slice(j);
    }
    return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
        TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0 /* READ_HEADER */;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
        transform(chunk, controller) {
            chunks.push(chunk);
            while (true) {
                if (state === 0 /* READ_HEADER */) {
                    if (totalLength(chunks) < 1) {
                        break;
                    }
                    const header = concatChunks(chunks, 1);
                    isBinary = (header[0] & 0x80) === 0x80;
                    expectedLength = header[0] & 0x7f;
                    if (expectedLength < 126) {
                        state = 3 /* READ_PAYLOAD */;
                    }
                    else if (expectedLength === 126) {
                        state = 1 /* READ_EXTENDED_LENGTH_16 */;
                    }
                    else {
                        state = 2 /* READ_EXTENDED_LENGTH_64 */;
                    }
                }
                else if (state === 1 /* READ_EXTENDED_LENGTH_16 */) {
                    if (totalLength(chunks) < 2) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 2);
                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
                    state = 3 /* READ_PAYLOAD */;
                }
                else if (state === 2 /* READ_EXTENDED_LENGTH_64 */) {
                    if (totalLength(chunks) < 8) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 8);
                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
                    const n = view.getUint32(0);
                    if (n > Math.pow(2, 53 - 32) - 1) {
                        // the maximum safe integer in JavaScript is 2^53 - 1
                        controller.enqueue(ERROR_PACKET);
                        break;
                    }
                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
                    state = 3 /* READ_PAYLOAD */;
                }
                else {
                    if (totalLength(chunks) < expectedLength) {
                        break;
                    }
                    const data = concatChunks(chunks, expectedLength);
                    controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
                    state = 0 /* READ_HEADER */;
                }
                if (expectedLength === 0 || expectedLength > maxPayload) {
                    controller.enqueue(ERROR_PACKET);
                    break;
                }
            }
        }
    });
}
const protocol$2 = 4;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

const globalThisShim = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    }
    else {
        obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
        obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}

// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode$1(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode$1(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}

class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
        super();
        this.writable = false;
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */
    open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */
    close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
        const packet = decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) { }
    createUri(schema, query = {}) {
        return (schema +
            "://" +
            this._hostname() +
            this._port() +
            this.opts.path +
            this._query(query));
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port &&
            ((this.opts.secure && Number(this.opts.port !== 443)) ||
                (!this.opts.secure && Number(this.opts.port) !== 80))) {
            return ":" + this.opts.port;
        }
        else {
            return "";
        }
    }
    _query(query) {
        const encodedQuery = encode$1(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
}

// imported from https://github.com/unshiftio/yeast
'use strict';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), length = 64, map = {};
let seed = 0, i = 0, prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
    let encoded = '';
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
    let decoded = 0;
    for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
    }
    return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
    const now = encode(+new Date());
    if (now !== prev)
        return seed = 0, prev = now;
    return now + '.' + encode(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++)
    map[alphabet[i]] = i;

// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
const hasCORS = value;

// browser shim for xmlhttprequest module
function XHR(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}
function createCookieJar() { }

function empty() { }
const hasXHR2 = (function () {
    const xhr = new XHR({
        xdomain: false,
    });
    return null != xhr.responseType;
})();
class Polling extends Transport {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
        if (this.opts.withCredentials) {
            this.cookieJar = createCookieJar();
        }
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
        const callback = (packet) => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        decodePayload(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
        this.writable = false;
        encodePayload(packets, (data) => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, cookieJar: this.cookieJar }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data,
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(uri, opts) {
        super();
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    create() {
        var _a;
        const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        const xhr = (this.xhr = new XHR(opts));
        try {
            xhr.open(this.method, this.uri, true);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                var _a;
                if (xhr.readyState === 3) {
                    (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(xhr);
                }
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
        this.cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}

const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return (cb) => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
const WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";

// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends Transport {
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    get name() {
        return "websocket";
    }
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new WebSocket(uri, protocols)
                        : new WebSocket(uri)
                    : new WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent) => this.onClose({
            description: "websocket connection closed",
            context: closeEvent,
        });
        this.ws.onmessage = (ev) => this.onData(ev.data);
        this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            encodePacket(packet, this.supportsBinary, (data) => {
                // always create a new object (GH-437)
                const opts = {};
                if (!usingBrowserWebSocket) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = 
                        // @ts-ignore
                        "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    nextTick(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @private
     */
    check() {
        return !!WebSocket;
    }
}

class WT extends Transport {
    get name() {
        return "webtransport";
    }
    doOpen() {
        // @ts-ignore
        if (typeof WebTransport !== "function") {
            return;
        }
        // @ts-ignore
        this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        this.transport.closed
            .then(() => {
            this.onClose();
        })
            .catch((err) => {
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this.transport.ready.then(() => {
            this.transport.createBidirectionalStream().then((stream) => {
                const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                const reader = stream.readable.pipeThrough(decoderStream).getReader();
                const encoderStream = createPacketEncoderStream();
                encoderStream.readable.pipeTo(stream.writable);
                this.writer = encoderStream.writable.getWriter();
                const read = () => {
                    reader
                        .read()
                        .then(({ done, value }) => {
                        if (done) {
                            return;
                        }
                        this.onPacket(value);
                        read();
                    })
                        .catch((err) => {
                    });
                };
                read();
                const packet = { type: "open" };
                if (this.query.sid) {
                    packet.data = `{"sid":"${this.query.sid}"}`;
                }
                this.writer.write(packet).then(() => this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            this.writer.write(packet).then(() => {
                if (lastPacket) {
                    nextTick(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        var _a;
        (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}

const transports = {
    websocket: WS,
    webtransport: WT,
    polling: Polling,
};

// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    if (str.length > 2000) {
        throw "URI too long";
    }
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}

class Socket$1 extends Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts = {}) {
        super();
        this.binaryType = defaultBinaryType;
        this.writeBuffer = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = parse(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = parse(opts.host).host;
        }
        installTimerFunctions(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || [
            "polling",
            "websocket",
            "webtransport",
        ];
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024,
            },
            transportOptions: {},
            closeOnBeforeunload: false,
        }, opts);
        this.opts.path =
            this.opts.path.replace(/\/$/, "") +
                (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = decode$1(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this.beforeunloadEventListener = () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this.beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close", {
                        description: "network connection lost",
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = protocol$2;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port,
        }, this.opts.transportOptions[name]);
        return new transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket$1.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", (reason) => this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket$1.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", (msg) => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket$1.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err) => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this.upgrades.indexOf("webtransport") !== -1 &&
            name !== "webtransport") {
            // favor WebTransport
            this.setTimeoutFn(() => {
                if (!failed) {
                    transport.open();
                }
            }, 200);
        }
        else {
            transport.open();
        }
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
        this.readyState = "open";
        Socket$1.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState && this.opts.upgrade) {
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            this.resetPingTimeout();
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += byteLength(data);
            }
            if (i > 0 && payloadSize > this.maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options,
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    onError(err) {
        Socket$1.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("beforeunload", this.beforeunloadEventListener, false);
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
Socket$1.protocol = protocol$2;

const protocol$1 = Socket$1.protocol;

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = parse(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}

const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}

/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS$1 = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener", // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (hasBinary(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id,
                });
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if (isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return (Array.isArray(payload) &&
                    (typeof payload[0] === "number" ||
                        (typeof payload[0] === "string" &&
                            RESERVED_EVENTS$1.indexOf(payload[0]) === -1)));
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}

const parser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    protocol: protocol,
    get PacketType () { return PacketType; },
    Encoder: Encoder,
    Decoder: Decoder
});

function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}

/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */
        this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */
        this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */
        this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */
        this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */
        this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */
        this._queueSeq = 0;
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on(io, "open", this.onopen.bind(this)),
            on(io, "packet", this.onpacket.bind(this)),
            on(io, "error", this.onerror.bind(this)),
            on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
        }
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
        // the timeout flag is optional
        const withErr = this.flags.timeout !== undefined || this._opts.ackTimeout !== undefined;
        return new Promise((resolve, reject) => {
            args.push((arg1, arg2) => {
                if (withErr) {
                    return arg1 ? reject(arg1) : resolve(arg2);
                }
                else {
                    return resolve(arg1);
                }
            });
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({ fromQueue: true }, this.flags),
        };
        args.push((err, ...responseArgs) => {
            if (packet !== this._queue[0]) {
                // the packet has already been acknowledged
                return;
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            }
            else {
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this._sendConnectPacket(data);
            });
        }
        else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
        this.packet({
            type: PacketType.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
                : data,
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};

class Manager extends Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new Socket$1(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        const onError = (err) => {
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = on(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        try {
            this.decoder.add(data);
        }
        catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        nextTick(() => {
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}

/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager,
    Socket,
    io: lookup,
    connect: lookup,
});

const iglooCalendarCss = "@font-face{font-family:feather;src:url(../fonts/feather.eot?t=1525787366991);src:url(../fonts/feather.eot?t=1525787366991#iefix) format('embedded-opentype'),url(fonts/feather.woff?9xfrq8) format('woff'),url(../fonts/feather.ttf?t=1525787366991) format('truetype'),url(../fonts/feather.svg?t=1525787366991#feather) format('svg')}[class*=\" ft-\"].sc-igloo-calendar,[class^=ft-].sc-igloo-calendar{font-family:feather!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ft-alert-octagon.sc-igloo-calendar:before{content:\"\\e81b\"}.ft-alert-circle.sc-igloo-calendar:before{content:\"\\e81c\"}.ft-activity.sc-igloo-calendar:before{content:\"\\e81d\"}.ft-alert-triangle.sc-igloo-calendar:before{content:\"\\e81e\"}.ft-align-center.sc-igloo-calendar:before{content:\"\\e81f\"}.ft-airplay.sc-igloo-calendar:before{content:\"\\e820\"}.ft-align-justify.sc-igloo-calendar:before{content:\"\\e821\"}.ft-align-left.sc-igloo-calendar:before{content:\"\\e822\"}.ft-align-right.sc-igloo-calendar:before{content:\"\\e823\"}.ft-arrow-down-left.sc-igloo-calendar:before{content:\"\\e824\"}.ft-arrow-down-right.sc-igloo-calendar:before{content:\"\\e825\"}.ft-anchor.sc-igloo-calendar:before{content:\"\\e826\"}.ft-aperture.sc-igloo-calendar:before{content:\"\\e827\"}.ft-arrow-left.sc-igloo-calendar:before{content:\"\\e828\"}.ft-arrow-right.sc-igloo-calendar:before{content:\"\\e829\"}.ft-arrow-down.sc-igloo-calendar:before{content:\"\\e82a\"}.ft-arrow-up-left.sc-igloo-calendar:before{content:\"\\e82b\"}.ft-arrow-up-right.sc-igloo-calendar:before{content:\"\\e82c\"}.ft-arrow-up.sc-igloo-calendar:before{content:\"\\e82d\"}.ft-award.sc-igloo-calendar:before{content:\"\\e82e\"}.ft-bar-chart.sc-igloo-calendar:before{content:\"\\e82f\"}.ft-at-sign.sc-igloo-calendar:before{content:\"\\e830\"}.ft-bar-chart-2.sc-igloo-calendar:before{content:\"\\e831\"}.ft-battery-charging.sc-igloo-calendar:before{content:\"\\e832\"}.ft-bell-off.sc-igloo-calendar:before{content:\"\\e833\"}.ft-battery.sc-igloo-calendar:before{content:\"\\e834\"}.ft-bluetooth.sc-igloo-calendar:before{content:\"\\e835\"}.ft-bell.sc-igloo-calendar:before{content:\"\\e836\"}.ft-book.sc-igloo-calendar:before{content:\"\\e837\"}.ft-briefcase.sc-igloo-calendar:before{content:\"\\e838\"}.ft-camera-off.sc-igloo-calendar:before{content:\"\\e839\"}.ft-calendar.sc-igloo-calendar:before{content:\"\\e83a\"}.ft-bookmark.sc-igloo-calendar:before{content:\"\\e83b\"}.ft-box.sc-igloo-calendar:before{content:\"\\e83c\"}.ft-camera.sc-igloo-calendar:before{content:\"\\e83d\"}.ft-check-circle.sc-igloo-calendar:before{content:\"\\e83e\"}.ft-check.sc-igloo-calendar:before{content:\"\\e83f\"}.ft-check-square.sc-igloo-calendar:before{content:\"\\e840\"}.ft-cast.sc-igloo-calendar:before{content:\"\\e841\"}.ft-chevron-down.sc-igloo-calendar:before{content:\"\\e842\"}.ft-chevron-left.sc-igloo-calendar:before{content:\"\\e843\"}.ft-chevron-right.sc-igloo-calendar:before{content:\"\\e844\"}.ft-chevron-up.sc-igloo-calendar:before{content:\"\\e845\"}.ft-chevrons-down.sc-igloo-calendar:before{content:\"\\e846\"}.ft-chevrons-right.sc-igloo-calendar:before{content:\"\\e847\"}.ft-chevrons-up.sc-igloo-calendar:before{content:\"\\e848\"}.ft-chevrons-left.sc-igloo-calendar:before{content:\"\\e849\"}.ft-circle.sc-igloo-calendar:before{content:\"\\e84a\"}.ft-clipboard.sc-igloo-calendar:before{content:\"\\e84b\"}.ft-chrome.sc-igloo-calendar:before{content:\"\\e84c\"}.ft-clock.sc-igloo-calendar:before{content:\"\\e84d\"}.ft-cloud-lightning.sc-igloo-calendar:before{content:\"\\e84e\"}.ft-cloud-drizzle.sc-igloo-calendar:before{content:\"\\e84f\"}.ft-cloud-rain.sc-igloo-calendar:before{content:\"\\e850\"}.ft-cloud-off.sc-igloo-calendar:before{content:\"\\e851\"}.ft-codepen.sc-igloo-calendar:before{content:\"\\e852\"}.ft-cloud-snow.sc-igloo-calendar:before{content:\"\\e853\"}.ft-compass.sc-igloo-calendar:before{content:\"\\e854\"}.ft-copy.sc-igloo-calendar:before{content:\"\\e855\"}.ft-corner-down-right.sc-igloo-calendar:before{content:\"\\e856\"}.ft-corner-down-left.sc-igloo-calendar:before{content:\"\\e857\"}.ft-corner-left-down.sc-igloo-calendar:before{content:\"\\e858\"}.ft-corner-left-up.sc-igloo-calendar:before{content:\"\\e859\"}.ft-corner-up-left.sc-igloo-calendar:before{content:\"\\e85a\"}.ft-corner-up-right.sc-igloo-calendar:before{content:\"\\e85b\"}.ft-corner-right-down.sc-igloo-calendar:before{content:\"\\e85c\"}.ft-corner-right-up.sc-igloo-calendar:before{content:\"\\e85d\"}.ft-cpu.sc-igloo-calendar:before{content:\"\\e85e\"}.ft-credit-card.sc-igloo-calendar:before{content:\"\\e85f\"}.ft-crosshair.sc-igloo-calendar:before{content:\"\\e860\"}.ft-disc.sc-igloo-calendar:before{content:\"\\e861\"}.ft-delete.sc-igloo-calendar:before{content:\"\\e862\"}.ft-download-cloud.sc-igloo-calendar:before{content:\"\\e863\"}.ft-download.sc-igloo-calendar:before{content:\"\\e864\"}.ft-droplet.sc-igloo-calendar:before{content:\"\\e865\"}.ft-edit-2.sc-igloo-calendar:before{content:\"\\e866\"}.ft-edit.sc-igloo-calendar:before{content:\"\\e867\"}.ft-edit-1.sc-igloo-calendar:before{content:\"\\e868\"}.ft-external-link.sc-igloo-calendar:before{content:\"\\e869\"}.ft-eye.sc-igloo-calendar:before{content:\"\\e86a\"}.ft-feather.sc-igloo-calendar:before{content:\"\\e86b\"}.ft-facebook.sc-igloo-calendar:before{content:\"\\e86c\"}.ft-file-minus.sc-igloo-calendar:before{content:\"\\e86d\"}.ft-eye-off.sc-igloo-calendar:before{content:\"\\e86e\"}.ft-fast-forward.sc-igloo-calendar:before{content:\"\\e86f\"}.ft-file-text.sc-igloo-calendar:before{content:\"\\e870\"}.ft-film.sc-igloo-calendar:before{content:\"\\e871\"}.ft-file.sc-igloo-calendar:before{content:\"\\e872\"}.ft-file-plus.sc-igloo-calendar:before{content:\"\\e873\"}.ft-folder.sc-igloo-calendar:before{content:\"\\e874\"}.ft-filter.sc-igloo-calendar:before{content:\"\\e875\"}.ft-flag.sc-igloo-calendar:before{content:\"\\e876\"}.ft-globe.sc-igloo-calendar:before{content:\"\\e877\"}.ft-grid.sc-igloo-calendar:before{content:\"\\e878\"}.ft-heart.sc-igloo-calendar:before{content:\"\\e879\"}.ft-home.sc-igloo-calendar:before{content:\"\\e87a\"}.ft-github.sc-igloo-calendar:before{content:\"\\e87b\"}.ft-image.sc-igloo-calendar:before{content:\"\\e87c\"}.ft-inbox.sc-igloo-calendar:before{content:\"\\e87d\"}.ft-layers.sc-igloo-calendar:before{content:\"\\e87e\"}.ft-info.sc-igloo-calendar:before{content:\"\\e87f\"}.ft-instagram.sc-igloo-calendar:before{content:\"\\e880\"}.ft-layout.sc-igloo-calendar:before{content:\"\\e881\"}.ft-link-2.sc-igloo-calendar:before{content:\"\\e882\"}.ft-life-buoy.sc-igloo-calendar:before{content:\"\\e883\"}.ft-link.sc-igloo-calendar:before{content:\"\\e884\"}.ft-log-in.sc-igloo-calendar:before{content:\"\\e885\"}.ft-list.sc-igloo-calendar:before{content:\"\\e886\"}.ft-lock.sc-igloo-calendar:before{content:\"\\e887\"}.ft-log-out.sc-igloo-calendar:before{content:\"\\e888\"}.ft-loader.sc-igloo-calendar:before{content:\"\\e889\"}.ft-mail.sc-igloo-calendar:before{content:\"\\e88a\"}.ft-maximize-2.sc-igloo-calendar:before{content:\"\\e88b\"}.ft-map.sc-igloo-calendar:before{content:\"\\e88c\"}.ft-map-pin.sc-igloo-calendar:before{content:\"\\e88e\"}.ft-menu.sc-igloo-calendar:before{content:\"\\e88f\"}.ft-message-circle.sc-igloo-calendar:before{content:\"\\e890\"}.ft-message-square.sc-igloo-calendar:before{content:\"\\e891\"}.ft-minimize-2.sc-igloo-calendar:before{content:\"\\e892\"}.ft-mic-off.sc-igloo-calendar:before{content:\"\\e893\"}.ft-minus-circle.sc-igloo-calendar:before{content:\"\\e894\"}.ft-mic.sc-igloo-calendar:before{content:\"\\e895\"}.ft-minus-square.sc-igloo-calendar:before{content:\"\\e896\"}.ft-minus.sc-igloo-calendar:before{content:\"\\e897\"}.ft-moon.sc-igloo-calendar:before{content:\"\\e898\"}.ft-monitor.sc-igloo-calendar:before{content:\"\\e899\"}.ft-more-vertical.sc-igloo-calendar:before{content:\"\\e89a\"}.ft-more-horizontal.sc-igloo-calendar:before{content:\"\\e89b\"}.ft-move.sc-igloo-calendar:before{content:\"\\e89c\"}.ft-music.sc-igloo-calendar:before{content:\"\\e89d\"}.ft-navigation-2.sc-igloo-calendar:before{content:\"\\e89e\"}.ft-navigation.sc-igloo-calendar:before{content:\"\\e89f\"}.ft-octagon.sc-igloo-calendar:before{content:\"\\e8a0\"}.ft-package.sc-igloo-calendar:before{content:\"\\e8a1\"}.ft-pause-circle.sc-igloo-calendar:before{content:\"\\e8a2\"}.ft-pause.sc-igloo-calendar:before{content:\"\\e8a3\"}.ft-percent.sc-igloo-calendar:before{content:\"\\e8a4\"}.ft-phone-call.sc-igloo-calendar:before{content:\"\\e8a5\"}.ft-phone-forwarded.sc-igloo-calendar:before{content:\"\\e8a6\"}.ft-phone-missed.sc-igloo-calendar:before{content:\"\\e8a7\"}.ft-phone-off.sc-igloo-calendar:before{content:\"\\e8a8\"}.ft-phone-incoming.sc-igloo-calendar:before{content:\"\\e8a9\"}.ft-phone.sc-igloo-calendar:before{content:\"\\e8aa\"}.ft-phone-outgoing.sc-igloo-calendar:before{content:\"\\e8ab\"}.ft-pie-chart.sc-igloo-calendar:before{content:\"\\e8ac\"}.ft-play-circle.sc-igloo-calendar:before{content:\"\\e8ad\"}.ft-play.sc-igloo-calendar:before{content:\"\\e8ae\"}.ft-plus-square.sc-igloo-calendar:before{content:\"\\e8af\"}.ft-plus-circle.sc-igloo-calendar:before{content:\"\\e8b0\"}.ft-plus.sc-igloo-calendar:before{content:\"\\e8b1\"}.ft-pocket.sc-igloo-calendar:before{content:\"\\e8b2\"}.ft-printer.sc-igloo-calendar:before{content:\"\\e8b3\"}.ft-power.sc-igloo-calendar:before{content:\"\\e8b4\"}.ft-radio.sc-igloo-calendar:before{content:\"\\e8b5\"}.ft-repeat.sc-igloo-calendar:before{content:\"\\e8b6\"}.ft-refresh-ccw.sc-igloo-calendar:before{content:\"\\e8b7\"}.ft-rewind.sc-igloo-calendar:before{content:\"\\e8b8\"}.ft-rotate-ccw.sc-igloo-calendar:before{content:\"\\e8b9\"}.ft-refresh-cw.sc-igloo-calendar:before{content:\"\\e8ba\"}.ft-rotate-cw.sc-igloo-calendar:before{content:\"\\e8bb\"}.ft-save.sc-igloo-calendar:before{content:\"\\e8bc\"}.ft-search.sc-igloo-calendar:before{content:\"\\e8bd\"}.ft-server.sc-igloo-calendar:before{content:\"\\e8be\"}.ft-scissors.sc-igloo-calendar:before{content:\"\\e8bf\"}.ft-share-2.sc-igloo-calendar:before{content:\"\\e8c0\"}.ft-share.sc-igloo-calendar:before{content:\"\\e8c1\"}.ft-shield.sc-igloo-calendar:before{content:\"\\e8c2\"}.ft-settings.sc-igloo-calendar:before{content:\"\\e8c3\"}.ft-skip-back.sc-igloo-calendar:before{content:\"\\e8c4\"}.ft-shuffle.sc-igloo-calendar:before{content:\"\\e8c5\"}.ft-sidebar.sc-igloo-calendar:before{content:\"\\e8c6\"}.ft-skip-forward.sc-igloo-calendar:before{content:\"\\e8c7\"}.ft-slack.sc-igloo-calendar:before{content:\"\\e8c8\"}.ft-slash.sc-igloo-calendar:before{content:\"\\e8c9\"}.ft-smartphone.sc-igloo-calendar:before{content:\"\\e8ca\"}.ft-square.sc-igloo-calendar:before{content:\"\\e8cb\"}.ft-speaker.sc-igloo-calendar:before{content:\"\\e8cc\"}.ft-star.sc-igloo-calendar:before{content:\"\\e8cd\"}.ft-stop-circle.sc-igloo-calendar:before{content:\"\\e8ce\"}.ft-sun.sc-igloo-calendar:before{content:\"\\e8cf\"}.ft-sunrise.sc-igloo-calendar:before{content:\"\\e8d0\"}.ft-tablet.sc-igloo-calendar:before{content:\"\\e8d1\"}.ft-tag.sc-igloo-calendar:before{content:\"\\e8d2\"}.ft-sunset.sc-igloo-calendar:before{content:\"\\e8d3\"}.ft-target.sc-igloo-calendar:before{content:\"\\e8d4\"}.ft-thermometer.sc-igloo-calendar:before{content:\"\\e8d5\"}.ft-thumbs-up.sc-igloo-calendar:before{content:\"\\e8d6\"}.ft-thumbs-down.sc-igloo-calendar:before{content:\"\\e8d7\"}.ft-toggle-left.sc-igloo-calendar:before{content:\"\\e8d8\"}.ft-toggle-right.sc-igloo-calendar:before{content:\"\\e8d9\"}.ft-trash-2.sc-igloo-calendar:before{content:\"\\e8da\"}.ft-trash.sc-igloo-calendar:before{content:\"\\e8db\"}.ft-trending-up.sc-igloo-calendar:before{content:\"\\e8dc\"}.ft-trending-down.sc-igloo-calendar:before{content:\"\\e8dd\"}.ft-triangle.sc-igloo-calendar:before{content:\"\\e8de\"}.ft-type.sc-igloo-calendar:before{content:\"\\e8df\"}.ft-twitter.sc-igloo-calendar:before{content:\"\\e8e0\"}.ft-upload.sc-igloo-calendar:before{content:\"\\e8e1\"}.ft-umbrella.sc-igloo-calendar:before{content:\"\\e8e2\"}.ft-upload-cloud.sc-igloo-calendar:before{content:\"\\e8e3\"}.ft-unlock.sc-igloo-calendar:before{content:\"\\e8e4\"}.ft-user-check.sc-igloo-calendar:before{content:\"\\e8e5\"}.ft-user-minus.sc-igloo-calendar:before{content:\"\\e8e6\"}.ft-user-plus.sc-igloo-calendar:before{content:\"\\e8e7\"}.ft-user-x.sc-igloo-calendar:before{content:\"\\e8e8\"}.ft-user.sc-igloo-calendar:before{content:\"\\e8e9\"}.ft-users.sc-igloo-calendar:before{content:\"\\e8ea\"}.ft-video-off.sc-igloo-calendar:before{content:\"\\e8eb\"}.ft-video.sc-igloo-calendar:before{content:\"\\e8ec\"}.ft-voicemail.sc-igloo-calendar:before{content:\"\\e8ed\"}.ft-volume-x.sc-igloo-calendar:before{content:\"\\e8ee\"}.ft-volume-2.sc-igloo-calendar:before{content:\"\\e8ef\"}.ft-volume-1.sc-igloo-calendar:before{content:\"\\e8f0\"}.ft-volume.sc-igloo-calendar:before{content:\"\\e8f1\"}.ft-watch.sc-igloo-calendar:before{content:\"\\e8f2\"}.ft-wifi.sc-igloo-calendar:before{content:\"\\e8f3\"}.ft-x-square.sc-igloo-calendar:before{content:\"\\e8f4\"}.ft-wind.sc-igloo-calendar:before{content:\"\\e8f5\"}.ft-x.sc-igloo-calendar:before{content:\"\\e8f6\"}.ft-x-circle.sc-igloo-calendar:before{content:\"\\e8f7\"}.ft-zap.sc-igloo-calendar:before{content:\"\\e8f8\"}.ft-zoom-in.sc-igloo-calendar:before{content:\"\\e8f9\"}.ft-zoom-out.sc-igloo-calendar:before{content:\"\\e8fa\"}.ft-command.sc-igloo-calendar:before{content:\"\\e8fb\"}.ft-cloud.sc-igloo-calendar:before{content:\"\\e8fc\"}.ft-hash.sc-igloo-calendar:before{content:\"\\e8fd\"}.ft-headphones.sc-igloo-calendar:before{content:\"\\e8fe\"}.ft-underline.sc-igloo-calendar:before{content:\"\\e8ff\"}.ft-italic.sc-igloo-calendar:before{content:\"\\e900\"}.ft-bold.sc-igloo-calendar:before{content:\"\\e901\"}.ft-crop.sc-igloo-calendar:before{content:\"\\e902\"}.ft-help-circle.sc-igloo-calendar:before{content:\"\\e903\"}.ft-paperclip.sc-igloo-calendar:before{content:\"\\e904\"}.ft-shopping-cart.sc-igloo-calendar:before{content:\"\\e905\"}.ft-tv.sc-igloo-calendar:before{content:\"\\e906\"}.ft-wifi-off.sc-igloo-calendar:before{content:\"\\e907\"}.ft-minimize.sc-igloo-calendar:before{content:\"\\e88d\"}.ft-maximize.sc-igloo-calendar:before{content:\"\\e908\"}.ft-gitlab.sc-igloo-calendar:before{content:\"\\e909\"}.ft-sliders.sc-igloo-calendar:before{content:\"\\e90a\"}.ft-star-on.sc-igloo-calendar:before{content:\"\\e90b\"}.ft-heart-on.sc-igloo-calendar:before{content:\"\\e90c\"}.ft-archive.sc-igloo-calendar:before{content:\"\\e90d\"}.ft-arrow-down-circle.sc-igloo-calendar:before{content:\"\\e90e\"}.ft-arrow-up-circle.sc-igloo-calendar:before{content:\"\\e90f\"}.ft-arrow-left-circle.sc-igloo-calendar:before{content:\"\\e910\"}.ft-arrow-right-circle.sc-igloo-calendar:before{content:\"\\e911\"}.ft-bar-chart-line-.sc-igloo-calendar:before{content:\"\\e912\"}.ft-bar-chart-line.sc-igloo-calendar:before{content:\"\\e913\"}.ft-book-open.sc-igloo-calendar:before{content:\"\\e914\"}.ft-code.sc-igloo-calendar:before{content:\"\\e915\"}.ft-database.sc-igloo-calendar:before{content:\"\\e916\"}.ft-dollar-sign.sc-igloo-calendar:before{content:\"\\e917\"}.ft-folder-plus.sc-igloo-calendar:before{content:\"\\e918\"}.ft-gift.sc-igloo-calendar:before{content:\"\\e919\"}.ft-folder-minus.sc-igloo-calendar:before{content:\"\\e91a\"}.ft-git-commit.sc-igloo-calendar:before{content:\"\\e91b\"}.ft-git-branch.sc-igloo-calendar:before{content:\"\\e91c\"}.ft-git-pull-request.sc-igloo-calendar:before{content:\"\\e91d\"}.ft-git-merge.sc-igloo-calendar:before{content:\"\\e91e\"}.ft-linkedin.sc-igloo-calendar:before{content:\"\\e91f\"}.ft-hard-drive.sc-igloo-calendar:before{content:\"\\e920\"}.ft-more-vertical-.sc-igloo-calendar:before{content:\"\\e921\"}.ft-more-horizontal-.sc-igloo-calendar:before{content:\"\\e922\"}.ft-rss.sc-igloo-calendar:before{content:\"\\e923\"}.ft-send.sc-igloo-calendar:before{content:\"\\e924\"}.ft-shield-off.sc-igloo-calendar:before{content:\"\\e925\"}.ft-shopping-bag.sc-igloo-calendar:before{content:\"\\e926\"}.ft-terminal.sc-igloo-calendar:before{content:\"\\e927\"}.ft-truck.sc-igloo-calendar:before{content:\"\\e928\"}.ft-zap-off.sc-igloo-calendar:before{content:\"\\e929\"}.ft-youtube.sc-igloo-calendar:before{content:\"\\e92a\"}.fa.sc-igloo-calendar,.fas.sc-igloo-calendar,.far.sc-igloo-calendar,.fal.sc-igloo-calendar,.fad.sc-igloo-calendar,.fab.sc-igloo-calendar{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1}.fa-lg.sc-igloo-calendar{font-size:1.33333em;line-height:0.75em;vertical-align:-.0667em}.fa-xs.sc-igloo-calendar{font-size:.75em}.fa-sm.sc-igloo-calendar{font-size:.875em}.fa-1x.sc-igloo-calendar{font-size:1em}.fa-2x.sc-igloo-calendar{font-size:2em}.fa-3x.sc-igloo-calendar{font-size:3em}.fa-4x.sc-igloo-calendar{font-size:4em}.fa-5x.sc-igloo-calendar{font-size:5em}.fa-6x.sc-igloo-calendar{font-size:6em}.fa-7x.sc-igloo-calendar{font-size:7em}.fa-8x.sc-igloo-calendar{font-size:8em}.fa-9x.sc-igloo-calendar{font-size:9em}.fa-10x.sc-igloo-calendar{font-size:10em}.fa-fw.sc-igloo-calendar{text-align:center;width:1.25em}.fa-ul.sc-igloo-calendar{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul.sc-igloo-calendar>li.sc-igloo-calendar{position:relative}.fa-li.sc-igloo-calendar{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border.sc-igloo-calendar{border:solid 0.08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left.sc-igloo-calendar{float:left}.fa-pull-right.sc-igloo-calendar{float:right}.fa.fa-pull-left.sc-igloo-calendar,.fas.fa-pull-left.sc-igloo-calendar,.far.fa-pull-left.sc-igloo-calendar,.fal.fa-pull-left.sc-igloo-calendar,.fab.fa-pull-left.sc-igloo-calendar{margin-right:.3em}.fa.fa-pull-right.sc-igloo-calendar,.fas.fa-pull-right.sc-igloo-calendar,.far.fa-pull-right.sc-igloo-calendar,.fal.fa-pull-right.sc-igloo-calendar,.fab.fa-pull-right.sc-igloo-calendar{margin-left:.3em}.fa-spin.sc-igloo-calendar{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse.sc-igloo-calendar{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90.sc-igloo-calendar{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180.sc-igloo-calendar{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270.sc-igloo-calendar{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal.sc-igloo-calendar{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical.sc-igloo-calendar{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);transform:scale(1, -1)}.fa-flip-both.sc-igloo-calendar,.fa-flip-horizontal.fa-flip-vertical.sc-igloo-calendar{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(-1, -1);transform:scale(-1, -1)}.sc-igloo-calendar:root .fa-rotate-90.sc-igloo-calendar,.sc-igloo-calendar:root .fa-rotate-180.sc-igloo-calendar,.sc-igloo-calendar:root .fa-rotate-270.sc-igloo-calendar,.sc-igloo-calendar:root .fa-flip-horizontal.sc-igloo-calendar,.sc-igloo-calendar:root .fa-flip-vertical.sc-igloo-calendar,.sc-igloo-calendar:root .fa-flip-both.sc-igloo-calendar{-webkit-filter:none;filter:none}.fa-stack.sc-igloo-calendar{display:inline-block;height:2em;line-height:2em;position:relative;vertical-align:middle;width:2.5em}.fa-stack-1x.sc-igloo-calendar,.fa-stack-2x.sc-igloo-calendar{left:0;position:absolute;text-align:center;width:100%}.fa-stack-1x.sc-igloo-calendar{line-height:inherit}.fa-stack-2x.sc-igloo-calendar{font-size:2em}.fa-inverse.sc-igloo-calendar{color:#fff}.fa-500px.sc-igloo-calendar:before{content:\"\\f26e\"}.fa-accessible-icon.sc-igloo-calendar:before{content:\"\\f368\"}.fa-accusoft.sc-igloo-calendar:before{content:\"\\f369\"}.fa-acquisitions-incorporated.sc-igloo-calendar:before{content:\"\\f6af\"}.fa-ad.sc-igloo-calendar:before{content:\"\\f641\"}.fa-address-book.sc-igloo-calendar:before{content:\"\\f2b9\"}.fa-address-card.sc-igloo-calendar:before{content:\"\\f2bb\"}.fa-adjust.sc-igloo-calendar:before{content:\"\\f042\"}.fa-adn.sc-igloo-calendar:before{content:\"\\f170\"}.fa-adobe.sc-igloo-calendar:before{content:\"\\f778\"}.fa-adversal.sc-igloo-calendar:before{content:\"\\f36a\"}.fa-affiliatetheme.sc-igloo-calendar:before{content:\"\\f36b\"}.fa-air-freshener.sc-igloo-calendar:before{content:\"\\f5d0\"}.fa-airbnb.sc-igloo-calendar:before{content:\"\\f834\"}.fa-algolia.sc-igloo-calendar:before{content:\"\\f36c\"}.fa-align-center.sc-igloo-calendar:before{content:\"\\f037\"}.fa-align-justify.sc-igloo-calendar:before{content:\"\\f039\"}.fa-align-left.sc-igloo-calendar:before{content:\"\\f036\"}.fa-align-right.sc-igloo-calendar:before{content:\"\\f038\"}.fa-alipay.sc-igloo-calendar:before{content:\"\\f642\"}.fa-allergies.sc-igloo-calendar:before{content:\"\\f461\"}.fa-amazon.sc-igloo-calendar:before{content:\"\\f270\"}.fa-amazon-pay.sc-igloo-calendar:before{content:\"\\f42c\"}.fa-ambulance.sc-igloo-calendar:before{content:\"\\f0f9\"}.fa-american-sign-language-interpreting.sc-igloo-calendar:before{content:\"\\f2a3\"}.fa-amilia.sc-igloo-calendar:before{content:\"\\f36d\"}.fa-anchor.sc-igloo-calendar:before{content:\"\\f13d\"}.fa-android.sc-igloo-calendar:before{content:\"\\f17b\"}.fa-angellist.sc-igloo-calendar:before{content:\"\\f209\"}.fa-angle-double-down.sc-igloo-calendar:before{content:\"\\f103\"}.fa-angle-double-left.sc-igloo-calendar:before{content:\"\\f100\"}.fa-angle-double-right.sc-igloo-calendar:before{content:\"\\f101\"}.fa-angle-double-up.sc-igloo-calendar:before{content:\"\\f102\"}.fa-angle-down.sc-igloo-calendar:before{content:\"\\f107\"}.fa-angle-left.sc-igloo-calendar:before{content:\"\\f104\"}.fa-angle-right.sc-igloo-calendar:before{content:\"\\f105\"}.fa-angle-up.sc-igloo-calendar:before{content:\"\\f106\"}.fa-angry.sc-igloo-calendar:before{content:\"\\f556\"}.fa-angrycreative.sc-igloo-calendar:before{content:\"\\f36e\"}.fa-angular.sc-igloo-calendar:before{content:\"\\f420\"}.fa-ankh.sc-igloo-calendar:before{content:\"\\f644\"}.fa-app-store.sc-igloo-calendar:before{content:\"\\f36f\"}.fa-app-store-ios.sc-igloo-calendar:before{content:\"\\f370\"}.fa-apper.sc-igloo-calendar:before{content:\"\\f371\"}.fa-apple.sc-igloo-calendar:before{content:\"\\f179\"}.fa-apple-alt.sc-igloo-calendar:before{content:\"\\f5d1\"}.fa-apple-pay.sc-igloo-calendar:before{content:\"\\f415\"}.fa-archive.sc-igloo-calendar:before{content:\"\\f187\"}.fa-archway.sc-igloo-calendar:before{content:\"\\f557\"}.fa-arrow-alt-circle-down.sc-igloo-calendar:before{content:\"\\f358\"}.fa-arrow-alt-circle-left.sc-igloo-calendar:before{content:\"\\f359\"}.fa-arrow-alt-circle-right.sc-igloo-calendar:before{content:\"\\f35a\"}.fa-arrow-alt-circle-up.sc-igloo-calendar:before{content:\"\\f35b\"}.fa-arrow-circle-down.sc-igloo-calendar:before{content:\"\\f0ab\"}.fa-arrow-circle-left.sc-igloo-calendar:before{content:\"\\f0a8\"}.fa-arrow-circle-right.sc-igloo-calendar:before{content:\"\\f0a9\"}.fa-arrow-circle-up.sc-igloo-calendar:before{content:\"\\f0aa\"}.fa-arrow-down.sc-igloo-calendar:before{content:\"\\f063\"}.fa-arrow-left.sc-igloo-calendar:before{content:\"\\f060\"}.fa-arrow-right.sc-igloo-calendar:before{content:\"\\f061\"}.fa-arrow-up.sc-igloo-calendar:before{content:\"\\f062\"}.fa-arrows-alt.sc-igloo-calendar:before{content:\"\\f0b2\"}.fa-arrows-alt-h.sc-igloo-calendar:before{content:\"\\f337\"}.fa-arrows-alt-v.sc-igloo-calendar:before{content:\"\\f338\"}.fa-artstation.sc-igloo-calendar:before{content:\"\\f77a\"}.fa-assistive-listening-systems.sc-igloo-calendar:before{content:\"\\f2a2\"}.fa-asterisk.sc-igloo-calendar:before{content:\"\\f069\"}.fa-asymmetrik.sc-igloo-calendar:before{content:\"\\f372\"}.fa-at.sc-igloo-calendar:before{content:\"\\f1fa\"}.fa-atlas.sc-igloo-calendar:before{content:\"\\f558\"}.fa-atlassian.sc-igloo-calendar:before{content:\"\\f77b\"}.fa-atom.sc-igloo-calendar:before{content:\"\\f5d2\"}.fa-audible.sc-igloo-calendar:before{content:\"\\f373\"}.fa-audio-description.sc-igloo-calendar:before{content:\"\\f29e\"}.fa-autoprefixer.sc-igloo-calendar:before{content:\"\\f41c\"}.fa-avianex.sc-igloo-calendar:before{content:\"\\f374\"}.fa-aviato.sc-igloo-calendar:before{content:\"\\f421\"}.fa-award.sc-igloo-calendar:before{content:\"\\f559\"}.fa-aws.sc-igloo-calendar:before{content:\"\\f375\"}.fa-baby.sc-igloo-calendar:before{content:\"\\f77c\"}.fa-baby-carriage.sc-igloo-calendar:before{content:\"\\f77d\"}.fa-backspace.sc-igloo-calendar:before{content:\"\\f55a\"}.fa-backward.sc-igloo-calendar:before{content:\"\\f04a\"}.fa-bacon.sc-igloo-calendar:before{content:\"\\f7e5\"}.fa-bahai.sc-igloo-calendar:before{content:\"\\f666\"}.fa-balance-scale.sc-igloo-calendar:before{content:\"\\f24e\"}.fa-balance-scale-left.sc-igloo-calendar:before{content:\"\\f515\"}.fa-balance-scale-right.sc-igloo-calendar:before{content:\"\\f516\"}.fa-ban.sc-igloo-calendar:before{content:\"\\f05e\"}.fa-band-aid.sc-igloo-calendar:before{content:\"\\f462\"}.fa-bandcamp.sc-igloo-calendar:before{content:\"\\f2d5\"}.fa-barcode.sc-igloo-calendar:before{content:\"\\f02a\"}.fa-bars.sc-igloo-calendar:before{content:\"\\f0c9\"}.fa-baseball-ball.sc-igloo-calendar:before{content:\"\\f433\"}.fa-basketball-ball.sc-igloo-calendar:before{content:\"\\f434\"}.fa-bath.sc-igloo-calendar:before{content:\"\\f2cd\"}.fa-battery-empty.sc-igloo-calendar:before{content:\"\\f244\"}.fa-battery-full.sc-igloo-calendar:before{content:\"\\f240\"}.fa-battery-half.sc-igloo-calendar:before{content:\"\\f242\"}.fa-battery-quarter.sc-igloo-calendar:before{content:\"\\f243\"}.fa-battery-three-quarters.sc-igloo-calendar:before{content:\"\\f241\"}.fa-battle-net.sc-igloo-calendar:before{content:\"\\f835\"}.fa-bed.sc-igloo-calendar:before{content:\"\\f236\"}.fa-beer.sc-igloo-calendar:before{content:\"\\f0fc\"}.fa-behance.sc-igloo-calendar:before{content:\"\\f1b4\"}.fa-behance-square.sc-igloo-calendar:before{content:\"\\f1b5\"}.fa-bell.sc-igloo-calendar:before{content:\"\\f0f3\"}.fa-bell-slash.sc-igloo-calendar:before{content:\"\\f1f6\"}.fa-bezier-curve.sc-igloo-calendar:before{content:\"\\f55b\"}.fa-bible.sc-igloo-calendar:before{content:\"\\f647\"}.fa-bicycle.sc-igloo-calendar:before{content:\"\\f206\"}.fa-biking.sc-igloo-calendar:before{content:\"\\f84a\"}.fa-bimobject.sc-igloo-calendar:before{content:\"\\f378\"}.fa-binoculars.sc-igloo-calendar:before{content:\"\\f1e5\"}.fa-biohazard.sc-igloo-calendar:before{content:\"\\f780\"}.fa-birthday-cake.sc-igloo-calendar:before{content:\"\\f1fd\"}.fa-bitbucket.sc-igloo-calendar:before{content:\"\\f171\"}.fa-bitcoin.sc-igloo-calendar:before{content:\"\\f379\"}.fa-bity.sc-igloo-calendar:before{content:\"\\f37a\"}.fa-black-tie.sc-igloo-calendar:before{content:\"\\f27e\"}.fa-blackberry.sc-igloo-calendar:before{content:\"\\f37b\"}.fa-blender.sc-igloo-calendar:before{content:\"\\f517\"}.fa-blender-phone.sc-igloo-calendar:before{content:\"\\f6b6\"}.fa-blind.sc-igloo-calendar:before{content:\"\\f29d\"}.fa-blog.sc-igloo-calendar:before{content:\"\\f781\"}.fa-blogger.sc-igloo-calendar:before{content:\"\\f37c\"}.fa-blogger-b.sc-igloo-calendar:before{content:\"\\f37d\"}.fa-bluetooth.sc-igloo-calendar:before{content:\"\\f293\"}.fa-bluetooth-b.sc-igloo-calendar:before{content:\"\\f294\"}.fa-bold.sc-igloo-calendar:before{content:\"\\f032\"}.fa-bolt.sc-igloo-calendar:before{content:\"\\f0e7\"}.fa-bomb.sc-igloo-calendar:before{content:\"\\f1e2\"}.fa-bone.sc-igloo-calendar:before{content:\"\\f5d7\"}.fa-bong.sc-igloo-calendar:before{content:\"\\f55c\"}.fa-book.sc-igloo-calendar:before{content:\"\\f02d\"}.fa-book-dead.sc-igloo-calendar:before{content:\"\\f6b7\"}.fa-book-medical.sc-igloo-calendar:before{content:\"\\f7e6\"}.fa-book-open.sc-igloo-calendar:before{content:\"\\f518\"}.fa-book-reader.sc-igloo-calendar:before{content:\"\\f5da\"}.fa-bookmark.sc-igloo-calendar:before{content:\"\\f02e\"}.fa-bootstrap.sc-igloo-calendar:before{content:\"\\f836\"}.fa-border-all.sc-igloo-calendar:before{content:\"\\f84c\"}.fa-border-none.sc-igloo-calendar:before{content:\"\\f850\"}.fa-border-style.sc-igloo-calendar:before{content:\"\\f853\"}.fa-bowling-ball.sc-igloo-calendar:before{content:\"\\f436\"}.fa-box.sc-igloo-calendar:before{content:\"\\f466\"}.fa-box-open.sc-igloo-calendar:before{content:\"\\f49e\"}.fa-boxes.sc-igloo-calendar:before{content:\"\\f468\"}.fa-braille.sc-igloo-calendar:before{content:\"\\f2a1\"}.fa-brain.sc-igloo-calendar:before{content:\"\\f5dc\"}.fa-bread-slice.sc-igloo-calendar:before{content:\"\\f7ec\"}.fa-briefcase.sc-igloo-calendar:before{content:\"\\f0b1\"}.fa-briefcase-medical.sc-igloo-calendar:before{content:\"\\f469\"}.fa-broadcast-tower.sc-igloo-calendar:before{content:\"\\f519\"}.fa-broom.sc-igloo-calendar:before{content:\"\\f51a\"}.fa-brush.sc-igloo-calendar:before{content:\"\\f55d\"}.fa-btc.sc-igloo-calendar:before{content:\"\\f15a\"}.fa-buffer.sc-igloo-calendar:before{content:\"\\f837\"}.fa-bug.sc-igloo-calendar:before{content:\"\\f188\"}.fa-building.sc-igloo-calendar:before{content:\"\\f1ad\"}.fa-bullhorn.sc-igloo-calendar:before{content:\"\\f0a1\"}.fa-bullseye.sc-igloo-calendar:before{content:\"\\f140\"}.fa-burn.sc-igloo-calendar:before{content:\"\\f46a\"}.fa-buromobelexperte.sc-igloo-calendar:before{content:\"\\f37f\"}.fa-bus.sc-igloo-calendar:before{content:\"\\f207\"}.fa-bus-alt.sc-igloo-calendar:before{content:\"\\f55e\"}.fa-business-time.sc-igloo-calendar:before{content:\"\\f64a\"}.fa-buy-n-large.sc-igloo-calendar:before{content:\"\\f8a6\"}.fa-buysellads.sc-igloo-calendar:before{content:\"\\f20d\"}.fa-calculator.sc-igloo-calendar:before{content:\"\\f1ec\"}.fa-calendar.sc-igloo-calendar:before{content:\"\\f133\"}.fa-calendar-alt.sc-igloo-calendar:before{content:\"\\f073\"}.fa-calendar-check.sc-igloo-calendar:before{content:\"\\f274\"}.fa-calendar-day.sc-igloo-calendar:before{content:\"\\f783\"}.fa-calendar-minus.sc-igloo-calendar:before{content:\"\\f272\"}.fa-calendar-plus.sc-igloo-calendar:before{content:\"\\f271\"}.fa-calendar-times.sc-igloo-calendar:before{content:\"\\f273\"}.fa-calendar-week.sc-igloo-calendar:before{content:\"\\f784\"}.fa-camera.sc-igloo-calendar:before{content:\"\\f030\"}.fa-camera-retro.sc-igloo-calendar:before{content:\"\\f083\"}.fa-campground.sc-igloo-calendar:before{content:\"\\f6bb\"}.fa-canadian-maple-leaf.sc-igloo-calendar:before{content:\"\\f785\"}.fa-candy-cane.sc-igloo-calendar:before{content:\"\\f786\"}.fa-cannabis.sc-igloo-calendar:before{content:\"\\f55f\"}.fa-capsules.sc-igloo-calendar:before{content:\"\\f46b\"}.fa-car.sc-igloo-calendar:before{content:\"\\f1b9\"}.fa-car-alt.sc-igloo-calendar:before{content:\"\\f5de\"}.fa-car-battery.sc-igloo-calendar:before{content:\"\\f5df\"}.fa-car-crash.sc-igloo-calendar:before{content:\"\\f5e1\"}.fa-car-side.sc-igloo-calendar:before{content:\"\\f5e4\"}.fa-caravan.sc-igloo-calendar:before{content:\"\\f8ff\"}.fa-caret-down.sc-igloo-calendar:before{content:\"\\f0d7\"}.fa-caret-left.sc-igloo-calendar:before{content:\"\\f0d9\"}.fa-caret-right.sc-igloo-calendar:before{content:\"\\f0da\"}.fa-caret-square-down.sc-igloo-calendar:before{content:\"\\f150\"}.fa-caret-square-left.sc-igloo-calendar:before{content:\"\\f191\"}.fa-caret-square-right.sc-igloo-calendar:before{content:\"\\f152\"}.fa-caret-square-up.sc-igloo-calendar:before{content:\"\\f151\"}.fa-caret-up.sc-igloo-calendar:before{content:\"\\f0d8\"}.fa-carrot.sc-igloo-calendar:before{content:\"\\f787\"}.fa-cart-arrow-down.sc-igloo-calendar:before{content:\"\\f218\"}.fa-cart-plus.sc-igloo-calendar:before{content:\"\\f217\"}.fa-cash-register.sc-igloo-calendar:before{content:\"\\f788\"}.fa-cat.sc-igloo-calendar:before{content:\"\\f6be\"}.fa-cc-amazon-pay.sc-igloo-calendar:before{content:\"\\f42d\"}.fa-cc-amex.sc-igloo-calendar:before{content:\"\\f1f3\"}.fa-cc-apple-pay.sc-igloo-calendar:before{content:\"\\f416\"}.fa-cc-diners-club.sc-igloo-calendar:before{content:\"\\f24c\"}.fa-cc-discover.sc-igloo-calendar:before{content:\"\\f1f2\"}.fa-cc-jcb.sc-igloo-calendar:before{content:\"\\f24b\"}.fa-cc-mastercard.sc-igloo-calendar:before{content:\"\\f1f1\"}.fa-cc-paypal.sc-igloo-calendar:before{content:\"\\f1f4\"}.fa-cc-stripe.sc-igloo-calendar:before{content:\"\\f1f5\"}.fa-cc-visa.sc-igloo-calendar:before{content:\"\\f1f0\"}.fa-centercode.sc-igloo-calendar:before{content:\"\\f380\"}.fa-centos.sc-igloo-calendar:before{content:\"\\f789\"}.fa-certificate.sc-igloo-calendar:before{content:\"\\f0a3\"}.fa-chair.sc-igloo-calendar:before{content:\"\\f6c0\"}.fa-chalkboard.sc-igloo-calendar:before{content:\"\\f51b\"}.fa-chalkboard-teacher.sc-igloo-calendar:before{content:\"\\f51c\"}.fa-charging-station.sc-igloo-calendar:before{content:\"\\f5e7\"}.fa-chart-area.sc-igloo-calendar:before{content:\"\\f1fe\"}.fa-chart-bar.sc-igloo-calendar:before{content:\"\\f080\"}.fa-chart-line.sc-igloo-calendar:before{content:\"\\f201\"}.fa-chart-pie.sc-igloo-calendar:before{content:\"\\f200\"}.fa-check.sc-igloo-calendar:before{content:\"\\f00c\"}.fa-check-circle.sc-igloo-calendar:before{content:\"\\f058\"}.fa-check-double.sc-igloo-calendar:before{content:\"\\f560\"}.fa-check-square.sc-igloo-calendar:before{content:\"\\f14a\"}.fa-cheese.sc-igloo-calendar:before{content:\"\\f7ef\"}.fa-chess.sc-igloo-calendar:before{content:\"\\f439\"}.fa-chess-bishop.sc-igloo-calendar:before{content:\"\\f43a\"}.fa-chess-board.sc-igloo-calendar:before{content:\"\\f43c\"}.fa-chess-king.sc-igloo-calendar:before{content:\"\\f43f\"}.fa-chess-knight.sc-igloo-calendar:before{content:\"\\f441\"}.fa-chess-pawn.sc-igloo-calendar:before{content:\"\\f443\"}.fa-chess-queen.sc-igloo-calendar:before{content:\"\\f445\"}.fa-chess-rook.sc-igloo-calendar:before{content:\"\\f447\"}.fa-chevron-circle-down.sc-igloo-calendar:before{content:\"\\f13a\"}.fa-chevron-circle-left.sc-igloo-calendar:before{content:\"\\f137\"}.fa-chevron-circle-right.sc-igloo-calendar:before{content:\"\\f138\"}.fa-chevron-circle-up.sc-igloo-calendar:before{content:\"\\f139\"}.fa-chevron-down.sc-igloo-calendar:before{content:\"\\f078\"}.fa-chevron-left.sc-igloo-calendar:before{content:\"\\f053\"}.fa-chevron-right.sc-igloo-calendar:before{content:\"\\f054\"}.fa-chevron-up.sc-igloo-calendar:before{content:\"\\f077\"}.fa-child.sc-igloo-calendar:before{content:\"\\f1ae\"}.fa-chrome.sc-igloo-calendar:before{content:\"\\f268\"}.fa-chromecast.sc-igloo-calendar:before{content:\"\\f838\"}.fa-church.sc-igloo-calendar:before{content:\"\\f51d\"}.fa-circle.sc-igloo-calendar:before{content:\"\\f111\"}.fa-circle-notch.sc-igloo-calendar:before{content:\"\\f1ce\"}.fa-city.sc-igloo-calendar:before{content:\"\\f64f\"}.fa-clinic-medical.sc-igloo-calendar:before{content:\"\\f7f2\"}.fa-clipboard.sc-igloo-calendar:before{content:\"\\f328\"}.fa-clipboard-check.sc-igloo-calendar:before{content:\"\\f46c\"}.fa-clipboard-list.sc-igloo-calendar:before{content:\"\\f46d\"}.fa-clock.sc-igloo-calendar:before{content:\"\\f017\"}.fa-clone.sc-igloo-calendar:before{content:\"\\f24d\"}.fa-closed-captioning.sc-igloo-calendar:before{content:\"\\f20a\"}.fa-cloud.sc-igloo-calendar:before{content:\"\\f0c2\"}.fa-cloud-download-alt.sc-igloo-calendar:before{content:\"\\f381\"}.fa-cloud-meatball.sc-igloo-calendar:before{content:\"\\f73b\"}.fa-cloud-moon.sc-igloo-calendar:before{content:\"\\f6c3\"}.fa-cloud-moon-rain.sc-igloo-calendar:before{content:\"\\f73c\"}.fa-cloud-rain.sc-igloo-calendar:before{content:\"\\f73d\"}.fa-cloud-showers-heavy.sc-igloo-calendar:before{content:\"\\f740\"}.fa-cloud-sun.sc-igloo-calendar:before{content:\"\\f6c4\"}.fa-cloud-sun-rain.sc-igloo-calendar:before{content:\"\\f743\"}.fa-cloud-upload-alt.sc-igloo-calendar:before{content:\"\\f382\"}.fa-cloudscale.sc-igloo-calendar:before{content:\"\\f383\"}.fa-cloudsmith.sc-igloo-calendar:before{content:\"\\f384\"}.fa-cloudversify.sc-igloo-calendar:before{content:\"\\f385\"}.fa-cocktail.sc-igloo-calendar:before{content:\"\\f561\"}.fa-code.sc-igloo-calendar:before{content:\"\\f121\"}.fa-code-branch.sc-igloo-calendar:before{content:\"\\f126\"}.fa-codepen.sc-igloo-calendar:before{content:\"\\f1cb\"}.fa-codiepie.sc-igloo-calendar:before{content:\"\\f284\"}.fa-coffee.sc-igloo-calendar:before{content:\"\\f0f4\"}.fa-cog.sc-igloo-calendar:before{content:\"\\f013\"}.fa-cogs.sc-igloo-calendar:before{content:\"\\f085\"}.fa-coins.sc-igloo-calendar:before{content:\"\\f51e\"}.fa-columns.sc-igloo-calendar:before{content:\"\\f0db\"}.fa-comment.sc-igloo-calendar:before{content:\"\\f075\"}.fa-comment-alt.sc-igloo-calendar:before{content:\"\\f27a\"}.fa-comment-dollar.sc-igloo-calendar:before{content:\"\\f651\"}.fa-comment-dots.sc-igloo-calendar:before{content:\"\\f4ad\"}.fa-comment-medical.sc-igloo-calendar:before{content:\"\\f7f5\"}.fa-comment-slash.sc-igloo-calendar:before{content:\"\\f4b3\"}.fa-comments.sc-igloo-calendar:before{content:\"\\f086\"}.fa-comments-dollar.sc-igloo-calendar:before{content:\"\\f653\"}.fa-compact-disc.sc-igloo-calendar:before{content:\"\\f51f\"}.fa-compass.sc-igloo-calendar:before{content:\"\\f14e\"}.fa-compress.sc-igloo-calendar:before{content:\"\\f066\"}.fa-compress-alt.sc-igloo-calendar:before{content:\"\\f422\"}.fa-compress-arrows-alt.sc-igloo-calendar:before{content:\"\\f78c\"}.fa-concierge-bell.sc-igloo-calendar:before{content:\"\\f562\"}.fa-confluence.sc-igloo-calendar:before{content:\"\\f78d\"}.fa-connectdevelop.sc-igloo-calendar:before{content:\"\\f20e\"}.fa-contao.sc-igloo-calendar:before{content:\"\\f26d\"}.fa-cookie.sc-igloo-calendar:before{content:\"\\f563\"}.fa-cookie-bite.sc-igloo-calendar:before{content:\"\\f564\"}.fa-copy.sc-igloo-calendar:before{content:\"\\f0c5\"}.fa-copyright.sc-igloo-calendar:before{content:\"\\f1f9\"}.fa-cotton-bureau.sc-igloo-calendar:before{content:\"\\f89e\"}.fa-couch.sc-igloo-calendar:before{content:\"\\f4b8\"}.fa-cpanel.sc-igloo-calendar:before{content:\"\\f388\"}.fa-creative-commons.sc-igloo-calendar:before{content:\"\\f25e\"}.fa-creative-commons-by.sc-igloo-calendar:before{content:\"\\f4e7\"}.fa-creative-commons-nc.sc-igloo-calendar:before{content:\"\\f4e8\"}.fa-creative-commons-nc-eu.sc-igloo-calendar:before{content:\"\\f4e9\"}.fa-creative-commons-nc-jp.sc-igloo-calendar:before{content:\"\\f4ea\"}.fa-creative-commons-nd.sc-igloo-calendar:before{content:\"\\f4eb\"}.fa-creative-commons-pd.sc-igloo-calendar:before{content:\"\\f4ec\"}.fa-creative-commons-pd-alt.sc-igloo-calendar:before{content:\"\\f4ed\"}.fa-creative-commons-remix.sc-igloo-calendar:before{content:\"\\f4ee\"}.fa-creative-commons-sa.sc-igloo-calendar:before{content:\"\\f4ef\"}.fa-creative-commons-sampling.sc-igloo-calendar:before{content:\"\\f4f0\"}.fa-creative-commons-sampling-plus.sc-igloo-calendar:before{content:\"\\f4f1\"}.fa-creative-commons-share.sc-igloo-calendar:before{content:\"\\f4f2\"}.fa-creative-commons-zero.sc-igloo-calendar:before{content:\"\\f4f3\"}.fa-credit-card.sc-igloo-calendar:before{content:\"\\f09d\"}.fa-critical-role.sc-igloo-calendar:before{content:\"\\f6c9\"}.fa-crop.sc-igloo-calendar:before{content:\"\\f125\"}.fa-crop-alt.sc-igloo-calendar:before{content:\"\\f565\"}.fa-cross.sc-igloo-calendar:before{content:\"\\f654\"}.fa-crosshairs.sc-igloo-calendar:before{content:\"\\f05b\"}.fa-crow.sc-igloo-calendar:before{content:\"\\f520\"}.fa-crown.sc-igloo-calendar:before{content:\"\\f521\"}.fa-crutch.sc-igloo-calendar:before{content:\"\\f7f7\"}.fa-css3.sc-igloo-calendar:before{content:\"\\f13c\"}.fa-css3-alt.sc-igloo-calendar:before{content:\"\\f38b\"}.fa-cube.sc-igloo-calendar:before{content:\"\\f1b2\"}.fa-cubes.sc-igloo-calendar:before{content:\"\\f1b3\"}.fa-cut.sc-igloo-calendar:before{content:\"\\f0c4\"}.fa-cuttlefish.sc-igloo-calendar:before{content:\"\\f38c\"}.fa-d-and-d.sc-igloo-calendar:before{content:\"\\f38d\"}.fa-d-and-d-beyond.sc-igloo-calendar:before{content:\"\\f6ca\"}.fa-dailymotion.sc-igloo-calendar:before{content:\"\\f952\"}.fa-dashcube.sc-igloo-calendar:before{content:\"\\f210\"}.fa-database.sc-igloo-calendar:before{content:\"\\f1c0\"}.fa-deaf.sc-igloo-calendar:before{content:\"\\f2a4\"}.fa-delicious.sc-igloo-calendar:before{content:\"\\f1a5\"}.fa-democrat.sc-igloo-calendar:before{content:\"\\f747\"}.fa-deploydog.sc-igloo-calendar:before{content:\"\\f38e\"}.fa-deskpro.sc-igloo-calendar:before{content:\"\\f38f\"}.fa-desktop.sc-igloo-calendar:before{content:\"\\f108\"}.fa-dev.sc-igloo-calendar:before{content:\"\\f6cc\"}.fa-deviantart.sc-igloo-calendar:before{content:\"\\f1bd\"}.fa-dharmachakra.sc-igloo-calendar:before{content:\"\\f655\"}.fa-dhl.sc-igloo-calendar:before{content:\"\\f790\"}.fa-diagnoses.sc-igloo-calendar:before{content:\"\\f470\"}.fa-diaspora.sc-igloo-calendar:before{content:\"\\f791\"}.fa-dice.sc-igloo-calendar:before{content:\"\\f522\"}.fa-dice-d20.sc-igloo-calendar:before{content:\"\\f6cf\"}.fa-dice-d6.sc-igloo-calendar:before{content:\"\\f6d1\"}.fa-dice-five.sc-igloo-calendar:before{content:\"\\f523\"}.fa-dice-four.sc-igloo-calendar:before{content:\"\\f524\"}.fa-dice-one.sc-igloo-calendar:before{content:\"\\f525\"}.fa-dice-six.sc-igloo-calendar:before{content:\"\\f526\"}.fa-dice-three.sc-igloo-calendar:before{content:\"\\f527\"}.fa-dice-two.sc-igloo-calendar:before{content:\"\\f528\"}.fa-digg.sc-igloo-calendar:before{content:\"\\f1a6\"}.fa-digital-ocean.sc-igloo-calendar:before{content:\"\\f391\"}.fa-digital-tachograph.sc-igloo-calendar:before{content:\"\\f566\"}.fa-directions.sc-igloo-calendar:before{content:\"\\f5eb\"}.fa-discord.sc-igloo-calendar:before{content:\"\\f392\"}.fa-discourse.sc-igloo-calendar:before{content:\"\\f393\"}.fa-divide.sc-igloo-calendar:before{content:\"\\f529\"}.fa-dizzy.sc-igloo-calendar:before{content:\"\\f567\"}.fa-dna.sc-igloo-calendar:before{content:\"\\f471\"}.fa-dochub.sc-igloo-calendar:before{content:\"\\f394\"}.fa-docker.sc-igloo-calendar:before{content:\"\\f395\"}.fa-dog.sc-igloo-calendar:before{content:\"\\f6d3\"}.fa-dollar-sign.sc-igloo-calendar:before{content:\"\\f155\"}.fa-dolly.sc-igloo-calendar:before{content:\"\\f472\"}.fa-dolly-flatbed.sc-igloo-calendar:before{content:\"\\f474\"}.fa-donate.sc-igloo-calendar:before{content:\"\\f4b9\"}.fa-door-closed.sc-igloo-calendar:before{content:\"\\f52a\"}.fa-door-open.sc-igloo-calendar:before{content:\"\\f52b\"}.fa-dot-circle.sc-igloo-calendar:before{content:\"\\f192\"}.fa-dove.sc-igloo-calendar:before{content:\"\\f4ba\"}.fa-download.sc-igloo-calendar:before{content:\"\\f019\"}.fa-draft2digital.sc-igloo-calendar:before{content:\"\\f396\"}.fa-drafting-compass.sc-igloo-calendar:before{content:\"\\f568\"}.fa-dragon.sc-igloo-calendar:before{content:\"\\f6d5\"}.fa-draw-polygon.sc-igloo-calendar:before{content:\"\\f5ee\"}.fa-dribbble.sc-igloo-calendar:before{content:\"\\f17d\"}.fa-dribbble-square.sc-igloo-calendar:before{content:\"\\f397\"}.fa-dropbox.sc-igloo-calendar:before{content:\"\\f16b\"}.fa-drum.sc-igloo-calendar:before{content:\"\\f569\"}.fa-drum-steelpan.sc-igloo-calendar:before{content:\"\\f56a\"}.fa-drumstick-bite.sc-igloo-calendar:before{content:\"\\f6d7\"}.fa-drupal.sc-igloo-calendar:before{content:\"\\f1a9\"}.fa-dumbbell.sc-igloo-calendar:before{content:\"\\f44b\"}.fa-dumpster.sc-igloo-calendar:before{content:\"\\f793\"}.fa-dumpster-fire.sc-igloo-calendar:before{content:\"\\f794\"}.fa-dungeon.sc-igloo-calendar:before{content:\"\\f6d9\"}.fa-dyalog.sc-igloo-calendar:before{content:\"\\f399\"}.fa-earlybirds.sc-igloo-calendar:before{content:\"\\f39a\"}.fa-ebay.sc-igloo-calendar:before{content:\"\\f4f4\"}.fa-edge.sc-igloo-calendar:before{content:\"\\f282\"}.fa-edit.sc-igloo-calendar:before{content:\"\\f044\"}.fa-egg.sc-igloo-calendar:before{content:\"\\f7fb\"}.fa-eject.sc-igloo-calendar:before{content:\"\\f052\"}.fa-elementor.sc-igloo-calendar:before{content:\"\\f430\"}.fa-ellipsis-h.sc-igloo-calendar:before{content:\"\\f141\"}.fa-ellipsis-v.sc-igloo-calendar:before{content:\"\\f142\"}.fa-ello.sc-igloo-calendar:before{content:\"\\f5f1\"}.fa-ember.sc-igloo-calendar:before{content:\"\\f423\"}.fa-empire.sc-igloo-calendar:before{content:\"\\f1d1\"}.fa-envelope.sc-igloo-calendar:before{content:\"\\f0e0\"}.fa-envelope-open.sc-igloo-calendar:before{content:\"\\f2b6\"}.fa-envelope-open-text.sc-igloo-calendar:before{content:\"\\f658\"}.fa-envelope-square.sc-igloo-calendar:before{content:\"\\f199\"}.fa-envira.sc-igloo-calendar:before{content:\"\\f299\"}.fa-equals.sc-igloo-calendar:before{content:\"\\f52c\"}.fa-eraser.sc-igloo-calendar:before{content:\"\\f12d\"}.fa-erlang.sc-igloo-calendar:before{content:\"\\f39d\"}.fa-ethereum.sc-igloo-calendar:before{content:\"\\f42e\"}.fa-ethernet.sc-igloo-calendar:before{content:\"\\f796\"}.fa-etsy.sc-igloo-calendar:before{content:\"\\f2d7\"}.fa-euro-sign.sc-igloo-calendar:before{content:\"\\f153\"}.fa-evernote.sc-igloo-calendar:before{content:\"\\f839\"}.fa-exchange-alt.sc-igloo-calendar:before{content:\"\\f362\"}.fa-exclamation.sc-igloo-calendar:before{content:\"\\f12a\"}.fa-exclamation-circle.sc-igloo-calendar:before{content:\"\\f06a\"}.fa-exclamation-triangle.sc-igloo-calendar:before{content:\"\\f071\"}.fa-expand.sc-igloo-calendar:before{content:\"\\f065\"}.fa-expand-alt.sc-igloo-calendar:before{content:\"\\f424\"}.fa-expand-arrows-alt.sc-igloo-calendar:before{content:\"\\f31e\"}.fa-expeditedssl.sc-igloo-calendar:before{content:\"\\f23e\"}.fa-external-link-alt.sc-igloo-calendar:before{content:\"\\f35d\"}.fa-external-link-square-alt.sc-igloo-calendar:before{content:\"\\f360\"}.fa-eye.sc-igloo-calendar:before{content:\"\\f06e\"}.fa-eye-dropper.sc-igloo-calendar:before{content:\"\\f1fb\"}.fa-eye-slash.sc-igloo-calendar:before{content:\"\\f070\"}.fa-facebook.sc-igloo-calendar:before{content:\"\\f09a\"}.fa-facebook-f.sc-igloo-calendar:before{content:\"\\f39e\"}.fa-facebook-messenger.sc-igloo-calendar:before{content:\"\\f39f\"}.fa-facebook-square.sc-igloo-calendar:before{content:\"\\f082\"}.fa-fan.sc-igloo-calendar:before{content:\"\\f863\"}.fa-fantasy-flight-games.sc-igloo-calendar:before{content:\"\\f6dc\"}.fa-fast-backward.sc-igloo-calendar:before{content:\"\\f049\"}.fa-fast-forward.sc-igloo-calendar:before{content:\"\\f050\"}.fa-fax.sc-igloo-calendar:before{content:\"\\f1ac\"}.fa-feather.sc-igloo-calendar:before{content:\"\\f52d\"}.fa-feather-alt.sc-igloo-calendar:before{content:\"\\f56b\"}.fa-fedex.sc-igloo-calendar:before{content:\"\\f797\"}.fa-fedora.sc-igloo-calendar:before{content:\"\\f798\"}.fa-female.sc-igloo-calendar:before{content:\"\\f182\"}.fa-fighter-jet.sc-igloo-calendar:before{content:\"\\f0fb\"}.fa-figma.sc-igloo-calendar:before{content:\"\\f799\"}.fa-file.sc-igloo-calendar:before{content:\"\\f15b\"}.fa-file-alt.sc-igloo-calendar:before{content:\"\\f15c\"}.fa-file-archive.sc-igloo-calendar:before{content:\"\\f1c6\"}.fa-file-audio.sc-igloo-calendar:before{content:\"\\f1c7\"}.fa-file-code.sc-igloo-calendar:before{content:\"\\f1c9\"}.fa-file-contract.sc-igloo-calendar:before{content:\"\\f56c\"}.fa-file-csv.sc-igloo-calendar:before{content:\"\\f6dd\"}.fa-file-download.sc-igloo-calendar:before{content:\"\\f56d\"}.fa-file-excel.sc-igloo-calendar:before{content:\"\\f1c3\"}.fa-file-export.sc-igloo-calendar:before{content:\"\\f56e\"}.fa-file-image.sc-igloo-calendar:before{content:\"\\f1c5\"}.fa-file-import.sc-igloo-calendar:before{content:\"\\f56f\"}.fa-file-invoice.sc-igloo-calendar:before{content:\"\\f570\"}.fa-file-invoice-dollar.sc-igloo-calendar:before{content:\"\\f571\"}.fa-file-medical.sc-igloo-calendar:before{content:\"\\f477\"}.fa-file-medical-alt.sc-igloo-calendar:before{content:\"\\f478\"}.fa-file-pdf.sc-igloo-calendar:before{content:\"\\f1c1\"}.fa-file-powerpoint.sc-igloo-calendar:before{content:\"\\f1c4\"}.fa-file-prescription.sc-igloo-calendar:before{content:\"\\f572\"}.fa-file-signature.sc-igloo-calendar:before{content:\"\\f573\"}.fa-file-upload.sc-igloo-calendar:before{content:\"\\f574\"}.fa-file-video.sc-igloo-calendar:before{content:\"\\f1c8\"}.fa-file-word.sc-igloo-calendar:before{content:\"\\f1c2\"}.fa-fill.sc-igloo-calendar:before{content:\"\\f575\"}.fa-fill-drip.sc-igloo-calendar:before{content:\"\\f576\"}.fa-film.sc-igloo-calendar:before{content:\"\\f008\"}.fa-filter.sc-igloo-calendar:before{content:\"\\f0b0\"}.fa-fingerprint.sc-igloo-calendar:before{content:\"\\f577\"}.fa-fire.sc-igloo-calendar:before{content:\"\\f06d\"}.fa-fire-alt.sc-igloo-calendar:before{content:\"\\f7e4\"}.fa-fire-extinguisher.sc-igloo-calendar:before{content:\"\\f134\"}.fa-firefox.sc-igloo-calendar:before{content:\"\\f269\"}.fa-firefox-browser.sc-igloo-calendar:before{content:\"\\f907\"}.fa-first-aid.sc-igloo-calendar:before{content:\"\\f479\"}.fa-first-order.sc-igloo-calendar:before{content:\"\\f2b0\"}.fa-first-order-alt.sc-igloo-calendar:before{content:\"\\f50a\"}.fa-firstdraft.sc-igloo-calendar:before{content:\"\\f3a1\"}.fa-fish.sc-igloo-calendar:before{content:\"\\f578\"}.fa-fist-raised.sc-igloo-calendar:before{content:\"\\f6de\"}.fa-flag.sc-igloo-calendar:before{content:\"\\f024\"}.fa-flag-checkered.sc-igloo-calendar:before{content:\"\\f11e\"}.fa-flag-usa.sc-igloo-calendar:before{content:\"\\f74d\"}.fa-flask.sc-igloo-calendar:before{content:\"\\f0c3\"}.fa-flickr.sc-igloo-calendar:before{content:\"\\f16e\"}.fa-flipboard.sc-igloo-calendar:before{content:\"\\f44d\"}.fa-flushed.sc-igloo-calendar:before{content:\"\\f579\"}.fa-fly.sc-igloo-calendar:before{content:\"\\f417\"}.fa-folder.sc-igloo-calendar:before{content:\"\\f07b\"}.fa-folder-minus.sc-igloo-calendar:before{content:\"\\f65d\"}.fa-folder-open.sc-igloo-calendar:before{content:\"\\f07c\"}.fa-folder-plus.sc-igloo-calendar:before{content:\"\\f65e\"}.fa-font.sc-igloo-calendar:before{content:\"\\f031\"}.fa-font-awesome.sc-igloo-calendar:before{content:\"\\f2b4\"}.fa-font-awesome-alt.sc-igloo-calendar:before{content:\"\\f35c\"}.fa-font-awesome-flag.sc-igloo-calendar:before{content:\"\\f425\"}.fa-font-awesome-logo-full.sc-igloo-calendar:before{content:\"\\f4e6\"}.fa-fonticons.sc-igloo-calendar:before{content:\"\\f280\"}.fa-fonticons-fi.sc-igloo-calendar:before{content:\"\\f3a2\"}.fa-football-ball.sc-igloo-calendar:before{content:\"\\f44e\"}.fa-fort-awesome.sc-igloo-calendar:before{content:\"\\f286\"}.fa-fort-awesome-alt.sc-igloo-calendar:before{content:\"\\f3a3\"}.fa-forumbee.sc-igloo-calendar:before{content:\"\\f211\"}.fa-forward.sc-igloo-calendar:before{content:\"\\f04e\"}.fa-foursquare.sc-igloo-calendar:before{content:\"\\f180\"}.fa-free-code-camp.sc-igloo-calendar:before{content:\"\\f2c5\"}.fa-freebsd.sc-igloo-calendar:before{content:\"\\f3a4\"}.fa-frog.sc-igloo-calendar:before{content:\"\\f52e\"}.fa-frown.sc-igloo-calendar:before{content:\"\\f119\"}.fa-frown-open.sc-igloo-calendar:before{content:\"\\f57a\"}.fa-fulcrum.sc-igloo-calendar:before{content:\"\\f50b\"}.fa-funnel-dollar.sc-igloo-calendar:before{content:\"\\f662\"}.fa-futbol.sc-igloo-calendar:before{content:\"\\f1e3\"}.fa-galactic-republic.sc-igloo-calendar:before{content:\"\\f50c\"}.fa-galactic-senate.sc-igloo-calendar:before{content:\"\\f50d\"}.fa-gamepad.sc-igloo-calendar:before{content:\"\\f11b\"}.fa-gas-pump.sc-igloo-calendar:before{content:\"\\f52f\"}.fa-gavel.sc-igloo-calendar:before{content:\"\\f0e3\"}.fa-gem.sc-igloo-calendar:before{content:\"\\f3a5\"}.fa-genderless.sc-igloo-calendar:before{content:\"\\f22d\"}.fa-get-pocket.sc-igloo-calendar:before{content:\"\\f265\"}.fa-gg.sc-igloo-calendar:before{content:\"\\f260\"}.fa-gg-circle.sc-igloo-calendar:before{content:\"\\f261\"}.fa-ghost.sc-igloo-calendar:before{content:\"\\f6e2\"}.fa-gift.sc-igloo-calendar:before{content:\"\\f06b\"}.fa-gifts.sc-igloo-calendar:before{content:\"\\f79c\"}.fa-git.sc-igloo-calendar:before{content:\"\\f1d3\"}.fa-git-alt.sc-igloo-calendar:before{content:\"\\f841\"}.fa-git-square.sc-igloo-calendar:before{content:\"\\f1d2\"}.fa-github.sc-igloo-calendar:before{content:\"\\f09b\"}.fa-github-alt.sc-igloo-calendar:before{content:\"\\f113\"}.fa-github-square.sc-igloo-calendar:before{content:\"\\f092\"}.fa-gitkraken.sc-igloo-calendar:before{content:\"\\f3a6\"}.fa-gitlab.sc-igloo-calendar:before{content:\"\\f296\"}.fa-gitter.sc-igloo-calendar:before{content:\"\\f426\"}.fa-glass-cheers.sc-igloo-calendar:before{content:\"\\f79f\"}.fa-glass-martini.sc-igloo-calendar:before{content:\"\\f000\"}.fa-glass-martini-alt.sc-igloo-calendar:before{content:\"\\f57b\"}.fa-glass-whiskey.sc-igloo-calendar:before{content:\"\\f7a0\"}.fa-glasses.sc-igloo-calendar:before{content:\"\\f530\"}.fa-glide.sc-igloo-calendar:before{content:\"\\f2a5\"}.fa-glide-g.sc-igloo-calendar:before{content:\"\\f2a6\"}.fa-globe.sc-igloo-calendar:before{content:\"\\f0ac\"}.fa-globe-africa.sc-igloo-calendar:before{content:\"\\f57c\"}.fa-globe-americas.sc-igloo-calendar:before{content:\"\\f57d\"}.fa-globe-asia.sc-igloo-calendar:before{content:\"\\f57e\"}.fa-globe-europe.sc-igloo-calendar:before{content:\"\\f7a2\"}.fa-gofore.sc-igloo-calendar:before{content:\"\\f3a7\"}.fa-golf-ball.sc-igloo-calendar:before{content:\"\\f450\"}.fa-goodreads.sc-igloo-calendar:before{content:\"\\f3a8\"}.fa-goodreads-g.sc-igloo-calendar:before{content:\"\\f3a9\"}.fa-google.sc-igloo-calendar:before{content:\"\\f1a0\"}.fa-google-drive.sc-igloo-calendar:before{content:\"\\f3aa\"}.fa-google-play.sc-igloo-calendar:before{content:\"\\f3ab\"}.fa-google-plus.sc-igloo-calendar:before{content:\"\\f2b3\"}.fa-google-plus-g.sc-igloo-calendar:before{content:\"\\f0d5\"}.fa-google-plus-square.sc-igloo-calendar:before{content:\"\\f0d4\"}.fa-google-wallet.sc-igloo-calendar:before{content:\"\\f1ee\"}.fa-gopuram.sc-igloo-calendar:before{content:\"\\f664\"}.fa-graduation-cap.sc-igloo-calendar:before{content:\"\\f19d\"}.fa-gratipay.sc-igloo-calendar:before{content:\"\\f184\"}.fa-grav.sc-igloo-calendar:before{content:\"\\f2d6\"}.fa-greater-than.sc-igloo-calendar:before{content:\"\\f531\"}.fa-greater-than-equal.sc-igloo-calendar:before{content:\"\\f532\"}.fa-grimace.sc-igloo-calendar:before{content:\"\\f57f\"}.fa-grin.sc-igloo-calendar:before{content:\"\\f580\"}.fa-grin-alt.sc-igloo-calendar:before{content:\"\\f581\"}.fa-grin-beam.sc-igloo-calendar:before{content:\"\\f582\"}.fa-grin-beam-sweat.sc-igloo-calendar:before{content:\"\\f583\"}.fa-grin-hearts.sc-igloo-calendar:before{content:\"\\f584\"}.fa-grin-squint.sc-igloo-calendar:before{content:\"\\f585\"}.fa-grin-squint-tears.sc-igloo-calendar:before{content:\"\\f586\"}.fa-grin-stars.sc-igloo-calendar:before{content:\"\\f587\"}.fa-grin-tears.sc-igloo-calendar:before{content:\"\\f588\"}.fa-grin-tongue.sc-igloo-calendar:before{content:\"\\f589\"}.fa-grin-tongue-squint.sc-igloo-calendar:before{content:\"\\f58a\"}.fa-grin-tongue-wink.sc-igloo-calendar:before{content:\"\\f58b\"}.fa-grin-wink.sc-igloo-calendar:before{content:\"\\f58c\"}.fa-grip-horizontal.sc-igloo-calendar:before{content:\"\\f58d\"}.fa-grip-lines.sc-igloo-calendar:before{content:\"\\f7a4\"}.fa-grip-lines-vertical.sc-igloo-calendar:before{content:\"\\f7a5\"}.fa-grip-vertical.sc-igloo-calendar:before{content:\"\\f58e\"}.fa-gripfire.sc-igloo-calendar:before{content:\"\\f3ac\"}.fa-grunt.sc-igloo-calendar:before{content:\"\\f3ad\"}.fa-guitar.sc-igloo-calendar:before{content:\"\\f7a6\"}.fa-gulp.sc-igloo-calendar:before{content:\"\\f3ae\"}.fa-h-square.sc-igloo-calendar:before{content:\"\\f0fd\"}.fa-hacker-news.sc-igloo-calendar:before{content:\"\\f1d4\"}.fa-hacker-news-square.sc-igloo-calendar:before{content:\"\\f3af\"}.fa-hackerrank.sc-igloo-calendar:before{content:\"\\f5f7\"}.fa-hamburger.sc-igloo-calendar:before{content:\"\\f805\"}.fa-hammer.sc-igloo-calendar:before{content:\"\\f6e3\"}.fa-hamsa.sc-igloo-calendar:before{content:\"\\f665\"}.fa-hand-holding.sc-igloo-calendar:before{content:\"\\f4bd\"}.fa-hand-holding-heart.sc-igloo-calendar:before{content:\"\\f4be\"}.fa-hand-holding-usd.sc-igloo-calendar:before{content:\"\\f4c0\"}.fa-hand-lizard.sc-igloo-calendar:before{content:\"\\f258\"}.fa-hand-middle-finger.sc-igloo-calendar:before{content:\"\\f806\"}.fa-hand-paper.sc-igloo-calendar:before{content:\"\\f256\"}.fa-hand-peace.sc-igloo-calendar:before{content:\"\\f25b\"}.fa-hand-point-down.sc-igloo-calendar:before{content:\"\\f0a7\"}.fa-hand-point-left.sc-igloo-calendar:before{content:\"\\f0a5\"}.fa-hand-point-right.sc-igloo-calendar:before{content:\"\\f0a4\"}.fa-hand-point-up.sc-igloo-calendar:before{content:\"\\f0a6\"}.fa-hand-pointer.sc-igloo-calendar:before{content:\"\\f25a\"}.fa-hand-rock.sc-igloo-calendar:before{content:\"\\f255\"}.fa-hand-scissors.sc-igloo-calendar:before{content:\"\\f257\"}.fa-hand-spock.sc-igloo-calendar:before{content:\"\\f259\"}.fa-hands.sc-igloo-calendar:before{content:\"\\f4c2\"}.fa-hands-helping.sc-igloo-calendar:before{content:\"\\f4c4\"}.fa-handshake.sc-igloo-calendar:before{content:\"\\f2b5\"}.fa-hanukiah.sc-igloo-calendar:before{content:\"\\f6e6\"}.fa-hard-hat.sc-igloo-calendar:before{content:\"\\f807\"}.fa-hashtag.sc-igloo-calendar:before{content:\"\\f292\"}.fa-hat-cowboy.sc-igloo-calendar:before{content:\"\\f8c0\"}.fa-hat-cowboy-side.sc-igloo-calendar:before{content:\"\\f8c1\"}.fa-hat-wizard.sc-igloo-calendar:before{content:\"\\f6e8\"}.fa-hdd.sc-igloo-calendar:before{content:\"\\f0a0\"}.fa-heading.sc-igloo-calendar:before{content:\"\\f1dc\"}.fa-headphones.sc-igloo-calendar:before{content:\"\\f025\"}.fa-headphones-alt.sc-igloo-calendar:before{content:\"\\f58f\"}.fa-headset.sc-igloo-calendar:before{content:\"\\f590\"}.fa-heart.sc-igloo-calendar:before{content:\"\\f004\"}.fa-heart-broken.sc-igloo-calendar:before{content:\"\\f7a9\"}.fa-heartbeat.sc-igloo-calendar:before{content:\"\\f21e\"}.fa-helicopter.sc-igloo-calendar:before{content:\"\\f533\"}.fa-highlighter.sc-igloo-calendar:before{content:\"\\f591\"}.fa-hiking.sc-igloo-calendar:before{content:\"\\f6ec\"}.fa-hippo.sc-igloo-calendar:before{content:\"\\f6ed\"}.fa-hips.sc-igloo-calendar:before{content:\"\\f452\"}.fa-hire-a-helper.sc-igloo-calendar:before{content:\"\\f3b0\"}.fa-history.sc-igloo-calendar:before{content:\"\\f1da\"}.fa-hockey-puck.sc-igloo-calendar:before{content:\"\\f453\"}.fa-holly-berry.sc-igloo-calendar:before{content:\"\\f7aa\"}.fa-home.sc-igloo-calendar:before{content:\"\\f015\"}.fa-hooli.sc-igloo-calendar:before{content:\"\\f427\"}.fa-hornbill.sc-igloo-calendar:before{content:\"\\f592\"}.fa-horse.sc-igloo-calendar:before{content:\"\\f6f0\"}.fa-horse-head.sc-igloo-calendar:before{content:\"\\f7ab\"}.fa-hospital.sc-igloo-calendar:before{content:\"\\f0f8\"}.fa-hospital-alt.sc-igloo-calendar:before{content:\"\\f47d\"}.fa-hospital-symbol.sc-igloo-calendar:before{content:\"\\f47e\"}.fa-hot-tub.sc-igloo-calendar:before{content:\"\\f593\"}.fa-hotdog.sc-igloo-calendar:before{content:\"\\f80f\"}.fa-hotel.sc-igloo-calendar:before{content:\"\\f594\"}.fa-hotjar.sc-igloo-calendar:before{content:\"\\f3b1\"}.fa-hourglass.sc-igloo-calendar:before{content:\"\\f254\"}.fa-hourglass-end.sc-igloo-calendar:before{content:\"\\f253\"}.fa-hourglass-half.sc-igloo-calendar:before{content:\"\\f252\"}.fa-hourglass-start.sc-igloo-calendar:before{content:\"\\f251\"}.fa-house-damage.sc-igloo-calendar:before{content:\"\\f6f1\"}.fa-houzz.sc-igloo-calendar:before{content:\"\\f27c\"}.fa-hryvnia.sc-igloo-calendar:before{content:\"\\f6f2\"}.fa-html5.sc-igloo-calendar:before{content:\"\\f13b\"}.fa-hubspot.sc-igloo-calendar:before{content:\"\\f3b2\"}.fa-i-cursor.sc-igloo-calendar:before{content:\"\\f246\"}.fa-ice-cream.sc-igloo-calendar:before{content:\"\\f810\"}.fa-icicles.sc-igloo-calendar:before{content:\"\\f7ad\"}.fa-icons.sc-igloo-calendar:before{content:\"\\f86d\"}.fa-id-badge.sc-igloo-calendar:before{content:\"\\f2c1\"}.fa-id-card.sc-igloo-calendar:before{content:\"\\f2c2\"}.fa-id-card-alt.sc-igloo-calendar:before{content:\"\\f47f\"}.fa-ideal.sc-igloo-calendar:before{content:\"\\f913\"}.fa-igloo.sc-igloo-calendar:before{content:\"\\f7ae\"}.fa-image.sc-igloo-calendar:before{content:\"\\f03e\"}.fa-images.sc-igloo-calendar:before{content:\"\\f302\"}.fa-imdb.sc-igloo-calendar:before{content:\"\\f2d8\"}.fa-inbox.sc-igloo-calendar:before{content:\"\\f01c\"}.fa-indent.sc-igloo-calendar:before{content:\"\\f03c\"}.fa-industry.sc-igloo-calendar:before{content:\"\\f275\"}.fa-infinity.sc-igloo-calendar:before{content:\"\\f534\"}.fa-info.sc-igloo-calendar:before{content:\"\\f129\"}.fa-info-circle.sc-igloo-calendar:before{content:\"\\f05a\"}.fa-instagram.sc-igloo-calendar:before{content:\"\\f16d\"}.fa-instagram-square.sc-igloo-calendar:before{content:\"\\f955\"}.fa-intercom.sc-igloo-calendar:before{content:\"\\f7af\"}.fa-internet-explorer.sc-igloo-calendar:before{content:\"\\f26b\"}.fa-invision.sc-igloo-calendar:before{content:\"\\f7b0\"}.fa-ioxhost.sc-igloo-calendar:before{content:\"\\f208\"}.fa-italic.sc-igloo-calendar:before{content:\"\\f033\"}.fa-itch-io.sc-igloo-calendar:before{content:\"\\f83a\"}.fa-itunes.sc-igloo-calendar:before{content:\"\\f3b4\"}.fa-itunes-note.sc-igloo-calendar:before{content:\"\\f3b5\"}.fa-java.sc-igloo-calendar:before{content:\"\\f4e4\"}.fa-jedi.sc-igloo-calendar:before{content:\"\\f669\"}.fa-jedi-order.sc-igloo-calendar:before{content:\"\\f50e\"}.fa-jenkins.sc-igloo-calendar:before{content:\"\\f3b6\"}.fa-jira.sc-igloo-calendar:before{content:\"\\f7b1\"}.fa-joget.sc-igloo-calendar:before{content:\"\\f3b7\"}.fa-joint.sc-igloo-calendar:before{content:\"\\f595\"}.fa-joomla.sc-igloo-calendar:before{content:\"\\f1aa\"}.fa-journal-whills.sc-igloo-calendar:before{content:\"\\f66a\"}.fa-js.sc-igloo-calendar:before{content:\"\\f3b8\"}.fa-js-square.sc-igloo-calendar:before{content:\"\\f3b9\"}.fa-jsfiddle.sc-igloo-calendar:before{content:\"\\f1cc\"}.fa-kaaba.sc-igloo-calendar:before{content:\"\\f66b\"}.fa-kaggle.sc-igloo-calendar:before{content:\"\\f5fa\"}.fa-key.sc-igloo-calendar:before{content:\"\\f084\"}.fa-keybase.sc-igloo-calendar:before{content:\"\\f4f5\"}.fa-keyboard.sc-igloo-calendar:before{content:\"\\f11c\"}.fa-keycdn.sc-igloo-calendar:before{content:\"\\f3ba\"}.fa-khanda.sc-igloo-calendar:before{content:\"\\f66d\"}.fa-kickstarter.sc-igloo-calendar:before{content:\"\\f3bb\"}.fa-kickstarter-k.sc-igloo-calendar:before{content:\"\\f3bc\"}.fa-kiss.sc-igloo-calendar:before{content:\"\\f596\"}.fa-kiss-beam.sc-igloo-calendar:before{content:\"\\f597\"}.fa-kiss-wink-heart.sc-igloo-calendar:before{content:\"\\f598\"}.fa-kiwi-bird.sc-igloo-calendar:before{content:\"\\f535\"}.fa-korvue.sc-igloo-calendar:before{content:\"\\f42f\"}.fa-landmark.sc-igloo-calendar:before{content:\"\\f66f\"}.fa-language.sc-igloo-calendar:before{content:\"\\f1ab\"}.fa-laptop.sc-igloo-calendar:before{content:\"\\f109\"}.fa-laptop-code.sc-igloo-calendar:before{content:\"\\f5fc\"}.fa-laptop-medical.sc-igloo-calendar:before{content:\"\\f812\"}.fa-laravel.sc-igloo-calendar:before{content:\"\\f3bd\"}.fa-lastfm.sc-igloo-calendar:before{content:\"\\f202\"}.fa-lastfm-square.sc-igloo-calendar:before{content:\"\\f203\"}.fa-laugh.sc-igloo-calendar:before{content:\"\\f599\"}.fa-laugh-beam.sc-igloo-calendar:before{content:\"\\f59a\"}.fa-laugh-squint.sc-igloo-calendar:before{content:\"\\f59b\"}.fa-laugh-wink.sc-igloo-calendar:before{content:\"\\f59c\"}.fa-layer-group.sc-igloo-calendar:before{content:\"\\f5fd\"}.fa-leaf.sc-igloo-calendar:before{content:\"\\f06c\"}.fa-leanpub.sc-igloo-calendar:before{content:\"\\f212\"}.fa-lemon.sc-igloo-calendar:before{content:\"\\f094\"}.fa-less.sc-igloo-calendar:before{content:\"\\f41d\"}.fa-less-than.sc-igloo-calendar:before{content:\"\\f536\"}.fa-less-than-equal.sc-igloo-calendar:before{content:\"\\f537\"}.fa-level-down-alt.sc-igloo-calendar:before{content:\"\\f3be\"}.fa-level-up-alt.sc-igloo-calendar:before{content:\"\\f3bf\"}.fa-life-ring.sc-igloo-calendar:before{content:\"\\f1cd\"}.fa-lightbulb.sc-igloo-calendar:before{content:\"\\f0eb\"}.fa-line.sc-igloo-calendar:before{content:\"\\f3c0\"}.fa-link.sc-igloo-calendar:before{content:\"\\f0c1\"}.fa-linkedin.sc-igloo-calendar:before{content:\"\\f08c\"}.fa-linkedin-in.sc-igloo-calendar:before{content:\"\\f0e1\"}.fa-linode.sc-igloo-calendar:before{content:\"\\f2b8\"}.fa-linux.sc-igloo-calendar:before{content:\"\\f17c\"}.fa-lira-sign.sc-igloo-calendar:before{content:\"\\f195\"}.fa-list.sc-igloo-calendar:before{content:\"\\f03a\"}.fa-list-alt.sc-igloo-calendar:before{content:\"\\f022\"}.fa-list-ol.sc-igloo-calendar:before{content:\"\\f0cb\"}.fa-list-ul.sc-igloo-calendar:before{content:\"\\f0ca\"}.fa-location-arrow.sc-igloo-calendar:before{content:\"\\f124\"}.fa-lock.sc-igloo-calendar:before{content:\"\\f023\"}.fa-lock-open.sc-igloo-calendar:before{content:\"\\f3c1\"}.fa-long-arrow-alt-down.sc-igloo-calendar:before{content:\"\\f309\"}.fa-long-arrow-alt-left.sc-igloo-calendar:before{content:\"\\f30a\"}.fa-long-arrow-alt-right.sc-igloo-calendar:before{content:\"\\f30b\"}.fa-long-arrow-alt-up.sc-igloo-calendar:before{content:\"\\f30c\"}.fa-low-vision.sc-igloo-calendar:before{content:\"\\f2a8\"}.fa-luggage-cart.sc-igloo-calendar:before{content:\"\\f59d\"}.fa-lyft.sc-igloo-calendar:before{content:\"\\f3c3\"}.fa-magento.sc-igloo-calendar:before{content:\"\\f3c4\"}.fa-magic.sc-igloo-calendar:before{content:\"\\f0d0\"}.fa-magnet.sc-igloo-calendar:before{content:\"\\f076\"}.fa-mail-bulk.sc-igloo-calendar:before{content:\"\\f674\"}.fa-mailchimp.sc-igloo-calendar:before{content:\"\\f59e\"}.fa-male.sc-igloo-calendar:before{content:\"\\f183\"}.fa-mandalorian.sc-igloo-calendar:before{content:\"\\f50f\"}.fa-map.sc-igloo-calendar:before{content:\"\\f279\"}.fa-map-marked.sc-igloo-calendar:before{content:\"\\f59f\"}.fa-map-marked-alt.sc-igloo-calendar:before{content:\"\\f5a0\"}.fa-map-marker.sc-igloo-calendar:before{content:\"\\f041\"}.fa-map-marker-alt.sc-igloo-calendar:before{content:\"\\f3c5\"}.fa-map-pin.sc-igloo-calendar:before{content:\"\\f276\"}.fa-map-signs.sc-igloo-calendar:before{content:\"\\f277\"}.fa-markdown.sc-igloo-calendar:before{content:\"\\f60f\"}.fa-marker.sc-igloo-calendar:before{content:\"\\f5a1\"}.fa-mars.sc-igloo-calendar:before{content:\"\\f222\"}.fa-mars-double.sc-igloo-calendar:before{content:\"\\f227\"}.fa-mars-stroke.sc-igloo-calendar:before{content:\"\\f229\"}.fa-mars-stroke-h.sc-igloo-calendar:before{content:\"\\f22b\"}.fa-mars-stroke-v.sc-igloo-calendar:before{content:\"\\f22a\"}.fa-mask.sc-igloo-calendar:before{content:\"\\f6fa\"}.fa-mastodon.sc-igloo-calendar:before{content:\"\\f4f6\"}.fa-maxcdn.sc-igloo-calendar:before{content:\"\\f136\"}.fa-mdb.sc-igloo-calendar:before{content:\"\\f8ca\"}.fa-medal.sc-igloo-calendar:before{content:\"\\f5a2\"}.fa-medapps.sc-igloo-calendar:before{content:\"\\f3c6\"}.fa-medium.sc-igloo-calendar:before{content:\"\\f23a\"}.fa-medium-m.sc-igloo-calendar:before{content:\"\\f3c7\"}.fa-medkit.sc-igloo-calendar:before{content:\"\\f0fa\"}.fa-medrt.sc-igloo-calendar:before{content:\"\\f3c8\"}.fa-meetup.sc-igloo-calendar:before{content:\"\\f2e0\"}.fa-megaport.sc-igloo-calendar:before{content:\"\\f5a3\"}.fa-meh.sc-igloo-calendar:before{content:\"\\f11a\"}.fa-meh-blank.sc-igloo-calendar:before{content:\"\\f5a4\"}.fa-meh-rolling-eyes.sc-igloo-calendar:before{content:\"\\f5a5\"}.fa-memory.sc-igloo-calendar:before{content:\"\\f538\"}.fa-mendeley.sc-igloo-calendar:before{content:\"\\f7b3\"}.fa-menorah.sc-igloo-calendar:before{content:\"\\f676\"}.fa-mercury.sc-igloo-calendar:before{content:\"\\f223\"}.fa-meteor.sc-igloo-calendar:before{content:\"\\f753\"}.fa-microblog.sc-igloo-calendar:before{content:\"\\f91a\"}.fa-microchip.sc-igloo-calendar:before{content:\"\\f2db\"}.fa-microphone.sc-igloo-calendar:before{content:\"\\f130\"}.fa-microphone-alt.sc-igloo-calendar:before{content:\"\\f3c9\"}.fa-microphone-alt-slash.sc-igloo-calendar:before{content:\"\\f539\"}.fa-microphone-slash.sc-igloo-calendar:before{content:\"\\f131\"}.fa-microscope.sc-igloo-calendar:before{content:\"\\f610\"}.fa-microsoft.sc-igloo-calendar:before{content:\"\\f3ca\"}.fa-minus.sc-igloo-calendar:before{content:\"\\f068\"}.fa-minus-circle.sc-igloo-calendar:before{content:\"\\f056\"}.fa-minus-square.sc-igloo-calendar:before{content:\"\\f146\"}.fa-mitten.sc-igloo-calendar:before{content:\"\\f7b5\"}.fa-mix.sc-igloo-calendar:before{content:\"\\f3cb\"}.fa-mixcloud.sc-igloo-calendar:before{content:\"\\f289\"}.fa-mixer.sc-igloo-calendar:before{content:\"\\f956\"}.fa-mizuni.sc-igloo-calendar:before{content:\"\\f3cc\"}.fa-mobile.sc-igloo-calendar:before{content:\"\\f10b\"}.fa-mobile-alt.sc-igloo-calendar:before{content:\"\\f3cd\"}.fa-modx.sc-igloo-calendar:before{content:\"\\f285\"}.fa-monero.sc-igloo-calendar:before{content:\"\\f3d0\"}.fa-money-bill.sc-igloo-calendar:before{content:\"\\f0d6\"}.fa-money-bill-alt.sc-igloo-calendar:before{content:\"\\f3d1\"}.fa-money-bill-wave.sc-igloo-calendar:before{content:\"\\f53a\"}.fa-money-bill-wave-alt.sc-igloo-calendar:before{content:\"\\f53b\"}.fa-money-check.sc-igloo-calendar:before{content:\"\\f53c\"}.fa-money-check-alt.sc-igloo-calendar:before{content:\"\\f53d\"}.fa-monument.sc-igloo-calendar:before{content:\"\\f5a6\"}.fa-moon.sc-igloo-calendar:before{content:\"\\f186\"}.fa-mortar-pestle.sc-igloo-calendar:before{content:\"\\f5a7\"}.fa-mosque.sc-igloo-calendar:before{content:\"\\f678\"}.fa-motorcycle.sc-igloo-calendar:before{content:\"\\f21c\"}.fa-mountain.sc-igloo-calendar:before{content:\"\\f6fc\"}.fa-mouse.sc-igloo-calendar:before{content:\"\\f8cc\"}.fa-mouse-pointer.sc-igloo-calendar:before{content:\"\\f245\"}.fa-mug-hot.sc-igloo-calendar:before{content:\"\\f7b6\"}.fa-music.sc-igloo-calendar:before{content:\"\\f001\"}.fa-napster.sc-igloo-calendar:before{content:\"\\f3d2\"}.fa-neos.sc-igloo-calendar:before{content:\"\\f612\"}.fa-network-wired.sc-igloo-calendar:before{content:\"\\f6ff\"}.fa-neuter.sc-igloo-calendar:before{content:\"\\f22c\"}.fa-newspaper.sc-igloo-calendar:before{content:\"\\f1ea\"}.fa-nimblr.sc-igloo-calendar:before{content:\"\\f5a8\"}.fa-node.sc-igloo-calendar:before{content:\"\\f419\"}.fa-node-js.sc-igloo-calendar:before{content:\"\\f3d3\"}.fa-not-equal.sc-igloo-calendar:before{content:\"\\f53e\"}.fa-notes-medical.sc-igloo-calendar:before{content:\"\\f481\"}.fa-npm.sc-igloo-calendar:before{content:\"\\f3d4\"}.fa-ns8.sc-igloo-calendar:before{content:\"\\f3d5\"}.fa-nutritionix.sc-igloo-calendar:before{content:\"\\f3d6\"}.fa-object-group.sc-igloo-calendar:before{content:\"\\f247\"}.fa-object-ungroup.sc-igloo-calendar:before{content:\"\\f248\"}.fa-odnoklassniki.sc-igloo-calendar:before{content:\"\\f263\"}.fa-odnoklassniki-square.sc-igloo-calendar:before{content:\"\\f264\"}.fa-oil-can.sc-igloo-calendar:before{content:\"\\f613\"}.fa-old-republic.sc-igloo-calendar:before{content:\"\\f510\"}.fa-om.sc-igloo-calendar:before{content:\"\\f679\"}.fa-opencart.sc-igloo-calendar:before{content:\"\\f23d\"}.fa-openid.sc-igloo-calendar:before{content:\"\\f19b\"}.fa-opera.sc-igloo-calendar:before{content:\"\\f26a\"}.fa-optin-monster.sc-igloo-calendar:before{content:\"\\f23c\"}.fa-orcid.sc-igloo-calendar:before{content:\"\\f8d2\"}.fa-osi.sc-igloo-calendar:before{content:\"\\f41a\"}.fa-otter.sc-igloo-calendar:before{content:\"\\f700\"}.fa-outdent.sc-igloo-calendar:before{content:\"\\f03b\"}.fa-page4.sc-igloo-calendar:before{content:\"\\f3d7\"}.fa-pagelines.sc-igloo-calendar:before{content:\"\\f18c\"}.fa-pager.sc-igloo-calendar:before{content:\"\\f815\"}.fa-paint-brush.sc-igloo-calendar:before{content:\"\\f1fc\"}.fa-paint-roller.sc-igloo-calendar:before{content:\"\\f5aa\"}.fa-palette.sc-igloo-calendar:before{content:\"\\f53f\"}.fa-palfed.sc-igloo-calendar:before{content:\"\\f3d8\"}.fa-pallet.sc-igloo-calendar:before{content:\"\\f482\"}.fa-paper-plane.sc-igloo-calendar:before{content:\"\\f1d8\"}.fa-paperclip.sc-igloo-calendar:before{content:\"\\f0c6\"}.fa-parachute-box.sc-igloo-calendar:before{content:\"\\f4cd\"}.fa-paragraph.sc-igloo-calendar:before{content:\"\\f1dd\"}.fa-parking.sc-igloo-calendar:before{content:\"\\f540\"}.fa-passport.sc-igloo-calendar:before{content:\"\\f5ab\"}.fa-pastafarianism.sc-igloo-calendar:before{content:\"\\f67b\"}.fa-paste.sc-igloo-calendar:before{content:\"\\f0ea\"}.fa-patreon.sc-igloo-calendar:before{content:\"\\f3d9\"}.fa-pause.sc-igloo-calendar:before{content:\"\\f04c\"}.fa-pause-circle.sc-igloo-calendar:before{content:\"\\f28b\"}.fa-paw.sc-igloo-calendar:before{content:\"\\f1b0\"}.fa-paypal.sc-igloo-calendar:before{content:\"\\f1ed\"}.fa-peace.sc-igloo-calendar:before{content:\"\\f67c\"}.fa-pen.sc-igloo-calendar:before{content:\"\\f304\"}.fa-pen-alt.sc-igloo-calendar:before{content:\"\\f305\"}.fa-pen-fancy.sc-igloo-calendar:before{content:\"\\f5ac\"}.fa-pen-nib.sc-igloo-calendar:before{content:\"\\f5ad\"}.fa-pen-square.sc-igloo-calendar:before{content:\"\\f14b\"}.fa-pencil-alt.sc-igloo-calendar:before{content:\"\\f303\"}.fa-pencil-ruler.sc-igloo-calendar:before{content:\"\\f5ae\"}.fa-penny-arcade.sc-igloo-calendar:before{content:\"\\f704\"}.fa-people-carry.sc-igloo-calendar:before{content:\"\\f4ce\"}.fa-pepper-hot.sc-igloo-calendar:before{content:\"\\f816\"}.fa-percent.sc-igloo-calendar:before{content:\"\\f295\"}.fa-percentage.sc-igloo-calendar:before{content:\"\\f541\"}.fa-periscope.sc-igloo-calendar:before{content:\"\\f3da\"}.fa-person-booth.sc-igloo-calendar:before{content:\"\\f756\"}.fa-phabricator.sc-igloo-calendar:before{content:\"\\f3db\"}.fa-phoenix-framework.sc-igloo-calendar:before{content:\"\\f3dc\"}.fa-phoenix-squadron.sc-igloo-calendar:before{content:\"\\f511\"}.fa-phone.sc-igloo-calendar:before{content:\"\\f095\"}.fa-phone-alt.sc-igloo-calendar:before{content:\"\\f879\"}.fa-phone-slash.sc-igloo-calendar:before{content:\"\\f3dd\"}.fa-phone-square.sc-igloo-calendar:before{content:\"\\f098\"}.fa-phone-square-alt.sc-igloo-calendar:before{content:\"\\f87b\"}.fa-phone-volume.sc-igloo-calendar:before{content:\"\\f2a0\"}.fa-photo-video.sc-igloo-calendar:before{content:\"\\f87c\"}.fa-php.sc-igloo-calendar:before{content:\"\\f457\"}.fa-pied-piper.sc-igloo-calendar:before{content:\"\\f2ae\"}.fa-pied-piper-alt.sc-igloo-calendar:before{content:\"\\f1a8\"}.fa-pied-piper-hat.sc-igloo-calendar:before{content:\"\\f4e5\"}.fa-pied-piper-pp.sc-igloo-calendar:before{content:\"\\f1a7\"}.fa-pied-piper-square.sc-igloo-calendar:before{content:\"\\f91e\"}.fa-piggy-bank.sc-igloo-calendar:before{content:\"\\f4d3\"}.fa-pills.sc-igloo-calendar:before{content:\"\\f484\"}.fa-pinterest.sc-igloo-calendar:before{content:\"\\f0d2\"}.fa-pinterest-p.sc-igloo-calendar:before{content:\"\\f231\"}.fa-pinterest-square.sc-igloo-calendar:before{content:\"\\f0d3\"}.fa-pizza-slice.sc-igloo-calendar:before{content:\"\\f818\"}.fa-place-of-worship.sc-igloo-calendar:before{content:\"\\f67f\"}.fa-plane.sc-igloo-calendar:before{content:\"\\f072\"}.fa-plane-arrival.sc-igloo-calendar:before{content:\"\\f5af\"}.fa-plane-departure.sc-igloo-calendar:before{content:\"\\f5b0\"}.fa-play.sc-igloo-calendar:before{content:\"\\f04b\"}.fa-play-circle.sc-igloo-calendar:before{content:\"\\f144\"}.fa-playstation.sc-igloo-calendar:before{content:\"\\f3df\"}.fa-plug.sc-igloo-calendar:before{content:\"\\f1e6\"}.fa-plus.sc-igloo-calendar:before{content:\"\\f067\"}.fa-plus-circle.sc-igloo-calendar:before{content:\"\\f055\"}.fa-plus-square.sc-igloo-calendar:before{content:\"\\f0fe\"}.fa-podcast.sc-igloo-calendar:before{content:\"\\f2ce\"}.fa-poll.sc-igloo-calendar:before{content:\"\\f681\"}.fa-poll-h.sc-igloo-calendar:before{content:\"\\f682\"}.fa-poo.sc-igloo-calendar:before{content:\"\\f2fe\"}.fa-poo-storm.sc-igloo-calendar:before{content:\"\\f75a\"}.fa-poop.sc-igloo-calendar:before{content:\"\\f619\"}.fa-portrait.sc-igloo-calendar:before{content:\"\\f3e0\"}.fa-pound-sign.sc-igloo-calendar:before{content:\"\\f154\"}.fa-power-off.sc-igloo-calendar:before{content:\"\\f011\"}.fa-pray.sc-igloo-calendar:before{content:\"\\f683\"}.fa-praying-hands.sc-igloo-calendar:before{content:\"\\f684\"}.fa-prescription.sc-igloo-calendar:before{content:\"\\f5b1\"}.fa-prescription-bottle.sc-igloo-calendar:before{content:\"\\f485\"}.fa-prescription-bottle-alt.sc-igloo-calendar:before{content:\"\\f486\"}.fa-print.sc-igloo-calendar:before{content:\"\\f02f\"}.fa-procedures.sc-igloo-calendar:before{content:\"\\f487\"}.fa-product-hunt.sc-igloo-calendar:before{content:\"\\f288\"}.fa-project-diagram.sc-igloo-calendar:before{content:\"\\f542\"}.fa-pushed.sc-igloo-calendar:before{content:\"\\f3e1\"}.fa-puzzle-piece.sc-igloo-calendar:before{content:\"\\f12e\"}.fa-python.sc-igloo-calendar:before{content:\"\\f3e2\"}.fa-qq.sc-igloo-calendar:before{content:\"\\f1d6\"}.fa-qrcode.sc-igloo-calendar:before{content:\"\\f029\"}.fa-question.sc-igloo-calendar:before{content:\"\\f128\"}.fa-question-circle.sc-igloo-calendar:before{content:\"\\f059\"}.fa-quidditch.sc-igloo-calendar:before{content:\"\\f458\"}.fa-quinscape.sc-igloo-calendar:before{content:\"\\f459\"}.fa-quora.sc-igloo-calendar:before{content:\"\\f2c4\"}.fa-quote-left.sc-igloo-calendar:before{content:\"\\f10d\"}.fa-quote-right.sc-igloo-calendar:before{content:\"\\f10e\"}.fa-quran.sc-igloo-calendar:before{content:\"\\f687\"}.fa-r-project.sc-igloo-calendar:before{content:\"\\f4f7\"}.fa-radiation.sc-igloo-calendar:before{content:\"\\f7b9\"}.fa-radiation-alt.sc-igloo-calendar:before{content:\"\\f7ba\"}.fa-rainbow.sc-igloo-calendar:before{content:\"\\f75b\"}.fa-random.sc-igloo-calendar:before{content:\"\\f074\"}.fa-raspberry-pi.sc-igloo-calendar:before{content:\"\\f7bb\"}.fa-ravelry.sc-igloo-calendar:before{content:\"\\f2d9\"}.fa-react.sc-igloo-calendar:before{content:\"\\f41b\"}.fa-reacteurope.sc-igloo-calendar:before{content:\"\\f75d\"}.fa-readme.sc-igloo-calendar:before{content:\"\\f4d5\"}.fa-rebel.sc-igloo-calendar:before{content:\"\\f1d0\"}.fa-receipt.sc-igloo-calendar:before{content:\"\\f543\"}.fa-record-vinyl.sc-igloo-calendar:before{content:\"\\f8d9\"}.fa-recycle.sc-igloo-calendar:before{content:\"\\f1b8\"}.fa-red-river.sc-igloo-calendar:before{content:\"\\f3e3\"}.fa-reddit.sc-igloo-calendar:before{content:\"\\f1a1\"}.fa-reddit-alien.sc-igloo-calendar:before{content:\"\\f281\"}.fa-reddit-square.sc-igloo-calendar:before{content:\"\\f1a2\"}.fa-redhat.sc-igloo-calendar:before{content:\"\\f7bc\"}.fa-redo.sc-igloo-calendar:before{content:\"\\f01e\"}.fa-redo-alt.sc-igloo-calendar:before{content:\"\\f2f9\"}.fa-registered.sc-igloo-calendar:before{content:\"\\f25d\"}.fa-remove-format.sc-igloo-calendar:before{content:\"\\f87d\"}.fa-renren.sc-igloo-calendar:before{content:\"\\f18b\"}.fa-reply.sc-igloo-calendar:before{content:\"\\f3e5\"}.fa-reply-all.sc-igloo-calendar:before{content:\"\\f122\"}.fa-replyd.sc-igloo-calendar:before{content:\"\\f3e6\"}.fa-republican.sc-igloo-calendar:before{content:\"\\f75e\"}.fa-researchgate.sc-igloo-calendar:before{content:\"\\f4f8\"}.fa-resolving.sc-igloo-calendar:before{content:\"\\f3e7\"}.fa-restroom.sc-igloo-calendar:before{content:\"\\f7bd\"}.fa-retweet.sc-igloo-calendar:before{content:\"\\f079\"}.fa-rev.sc-igloo-calendar:before{content:\"\\f5b2\"}.fa-ribbon.sc-igloo-calendar:before{content:\"\\f4d6\"}.fa-ring.sc-igloo-calendar:before{content:\"\\f70b\"}.fa-road.sc-igloo-calendar:before{content:\"\\f018\"}.fa-robot.sc-igloo-calendar:before{content:\"\\f544\"}.fa-rocket.sc-igloo-calendar:before{content:\"\\f135\"}.fa-rocketchat.sc-igloo-calendar:before{content:\"\\f3e8\"}.fa-rockrms.sc-igloo-calendar:before{content:\"\\f3e9\"}.fa-route.sc-igloo-calendar:before{content:\"\\f4d7\"}.fa-rss.sc-igloo-calendar:before{content:\"\\f09e\"}.fa-rss-square.sc-igloo-calendar:before{content:\"\\f143\"}.fa-ruble-sign.sc-igloo-calendar:before{content:\"\\f158\"}.fa-ruler.sc-igloo-calendar:before{content:\"\\f545\"}.fa-ruler-combined.sc-igloo-calendar:before{content:\"\\f546\"}.fa-ruler-horizontal.sc-igloo-calendar:before{content:\"\\f547\"}.fa-ruler-vertical.sc-igloo-calendar:before{content:\"\\f548\"}.fa-running.sc-igloo-calendar:before{content:\"\\f70c\"}.fa-rupee-sign.sc-igloo-calendar:before{content:\"\\f156\"}.fa-sad-cry.sc-igloo-calendar:before{content:\"\\f5b3\"}.fa-sad-tear.sc-igloo-calendar:before{content:\"\\f5b4\"}.fa-safari.sc-igloo-calendar:before{content:\"\\f267\"}.fa-salesforce.sc-igloo-calendar:before{content:\"\\f83b\"}.fa-sass.sc-igloo-calendar:before{content:\"\\f41e\"}.fa-satellite.sc-igloo-calendar:before{content:\"\\f7bf\"}.fa-satellite-dish.sc-igloo-calendar:before{content:\"\\f7c0\"}.fa-save.sc-igloo-calendar:before{content:\"\\f0c7\"}.fa-schlix.sc-igloo-calendar:before{content:\"\\f3ea\"}.fa-school.sc-igloo-calendar:before{content:\"\\f549\"}.fa-screwdriver.sc-igloo-calendar:before{content:\"\\f54a\"}.fa-scribd.sc-igloo-calendar:before{content:\"\\f28a\"}.fa-scroll.sc-igloo-calendar:before{content:\"\\f70e\"}.fa-sd-card.sc-igloo-calendar:before{content:\"\\f7c2\"}.fa-search.sc-igloo-calendar:before{content:\"\\f002\"}.fa-search-dollar.sc-igloo-calendar:before{content:\"\\f688\"}.fa-search-location.sc-igloo-calendar:before{content:\"\\f689\"}.fa-search-minus.sc-igloo-calendar:before{content:\"\\f010\"}.fa-search-plus.sc-igloo-calendar:before{content:\"\\f00e\"}.fa-searchengin.sc-igloo-calendar:before{content:\"\\f3eb\"}.fa-seedling.sc-igloo-calendar:before{content:\"\\f4d8\"}.fa-sellcast.sc-igloo-calendar:before{content:\"\\f2da\"}.fa-sellsy.sc-igloo-calendar:before{content:\"\\f213\"}.fa-server.sc-igloo-calendar:before{content:\"\\f233\"}.fa-servicestack.sc-igloo-calendar:before{content:\"\\f3ec\"}.fa-shapes.sc-igloo-calendar:before{content:\"\\f61f\"}.fa-share.sc-igloo-calendar:before{content:\"\\f064\"}.fa-share-alt.sc-igloo-calendar:before{content:\"\\f1e0\"}.fa-share-alt-square.sc-igloo-calendar:before{content:\"\\f1e1\"}.fa-share-square.sc-igloo-calendar:before{content:\"\\f14d\"}.fa-shekel-sign.sc-igloo-calendar:before{content:\"\\f20b\"}.fa-shield-alt.sc-igloo-calendar:before{content:\"\\f3ed\"}.fa-ship.sc-igloo-calendar:before{content:\"\\f21a\"}.fa-shipping-fast.sc-igloo-calendar:before{content:\"\\f48b\"}.fa-shirtsinbulk.sc-igloo-calendar:before{content:\"\\f214\"}.fa-shoe-prints.sc-igloo-calendar:before{content:\"\\f54b\"}.fa-shopify.sc-igloo-calendar:before{content:\"\\f957\"}.fa-shopping-bag.sc-igloo-calendar:before{content:\"\\f290\"}.fa-shopping-basket.sc-igloo-calendar:before{content:\"\\f291\"}.fa-shopping-cart.sc-igloo-calendar:before{content:\"\\f07a\"}.fa-shopware.sc-igloo-calendar:before{content:\"\\f5b5\"}.fa-shower.sc-igloo-calendar:before{content:\"\\f2cc\"}.fa-shuttle-van.sc-igloo-calendar:before{content:\"\\f5b6\"}.fa-sign.sc-igloo-calendar:before{content:\"\\f4d9\"}.fa-sign-in-alt.sc-igloo-calendar:before{content:\"\\f2f6\"}.fa-sign-language.sc-igloo-calendar:before{content:\"\\f2a7\"}.fa-sign-out-alt.sc-igloo-calendar:before{content:\"\\f2f5\"}.fa-signal.sc-igloo-calendar:before{content:\"\\f012\"}.fa-signature.sc-igloo-calendar:before{content:\"\\f5b7\"}.fa-sim-card.sc-igloo-calendar:before{content:\"\\f7c4\"}.fa-simplybuilt.sc-igloo-calendar:before{content:\"\\f215\"}.fa-sistrix.sc-igloo-calendar:before{content:\"\\f3ee\"}.fa-sitemap.sc-igloo-calendar:before{content:\"\\f0e8\"}.fa-sith.sc-igloo-calendar:before{content:\"\\f512\"}.fa-skating.sc-igloo-calendar:before{content:\"\\f7c5\"}.fa-sketch.sc-igloo-calendar:before{content:\"\\f7c6\"}.fa-skiing.sc-igloo-calendar:before{content:\"\\f7c9\"}.fa-skiing-nordic.sc-igloo-calendar:before{content:\"\\f7ca\"}.fa-skull.sc-igloo-calendar:before{content:\"\\f54c\"}.fa-skull-crossbones.sc-igloo-calendar:before{content:\"\\f714\"}.fa-skyatlas.sc-igloo-calendar:before{content:\"\\f216\"}.fa-skype.sc-igloo-calendar:before{content:\"\\f17e\"}.fa-slack.sc-igloo-calendar:before{content:\"\\f198\"}.fa-slack-hash.sc-igloo-calendar:before{content:\"\\f3ef\"}.fa-slash.sc-igloo-calendar:before{content:\"\\f715\"}.fa-sleigh.sc-igloo-calendar:before{content:\"\\f7cc\"}.fa-sliders-h.sc-igloo-calendar:before{content:\"\\f1de\"}.fa-slideshare.sc-igloo-calendar:before{content:\"\\f1e7\"}.fa-smile.sc-igloo-calendar:before{content:\"\\f118\"}.fa-smile-beam.sc-igloo-calendar:before{content:\"\\f5b8\"}.fa-smile-wink.sc-igloo-calendar:before{content:\"\\f4da\"}.fa-smog.sc-igloo-calendar:before{content:\"\\f75f\"}.fa-smoking.sc-igloo-calendar:before{content:\"\\f48d\"}.fa-smoking-ban.sc-igloo-calendar:before{content:\"\\f54d\"}.fa-sms.sc-igloo-calendar:before{content:\"\\f7cd\"}.fa-snapchat.sc-igloo-calendar:before{content:\"\\f2ab\"}.fa-snapchat-ghost.sc-igloo-calendar:before{content:\"\\f2ac\"}.fa-snapchat-square.sc-igloo-calendar:before{content:\"\\f2ad\"}.fa-snowboarding.sc-igloo-calendar:before{content:\"\\f7ce\"}.fa-snowflake.sc-igloo-calendar:before{content:\"\\f2dc\"}.fa-snowman.sc-igloo-calendar:before{content:\"\\f7d0\"}.fa-snowplow.sc-igloo-calendar:before{content:\"\\f7d2\"}.fa-socks.sc-igloo-calendar:before{content:\"\\f696\"}.fa-solar-panel.sc-igloo-calendar:before{content:\"\\f5ba\"}.fa-sort.sc-igloo-calendar:before{content:\"\\f0dc\"}.fa-sort-alpha-down.sc-igloo-calendar:before{content:\"\\f15d\"}.fa-sort-alpha-down-alt.sc-igloo-calendar:before{content:\"\\f881\"}.fa-sort-alpha-up.sc-igloo-calendar:before{content:\"\\f15e\"}.fa-sort-alpha-up-alt.sc-igloo-calendar:before{content:\"\\f882\"}.fa-sort-amount-down.sc-igloo-calendar:before{content:\"\\f160\"}.fa-sort-amount-down-alt.sc-igloo-calendar:before{content:\"\\f884\"}.fa-sort-amount-up.sc-igloo-calendar:before{content:\"\\f161\"}.fa-sort-amount-up-alt.sc-igloo-calendar:before{content:\"\\f885\"}.fa-sort-down.sc-igloo-calendar:before{content:\"\\f0dd\"}.fa-sort-numeric-down.sc-igloo-calendar:before{content:\"\\f162\"}.fa-sort-numeric-down-alt.sc-igloo-calendar:before{content:\"\\f886\"}.fa-sort-numeric-up.sc-igloo-calendar:before{content:\"\\f163\"}.fa-sort-numeric-up-alt.sc-igloo-calendar:before{content:\"\\f887\"}.fa-sort-up.sc-igloo-calendar:before{content:\"\\f0de\"}.fa-soundcloud.sc-igloo-calendar:before{content:\"\\f1be\"}.fa-sourcetree.sc-igloo-calendar:before{content:\"\\f7d3\"}.fa-spa.sc-igloo-calendar:before{content:\"\\f5bb\"}.fa-space-shuttle.sc-igloo-calendar:before{content:\"\\f197\"}.fa-speakap.sc-igloo-calendar:before{content:\"\\f3f3\"}.fa-speaker-deck.sc-igloo-calendar:before{content:\"\\f83c\"}.fa-spell-check.sc-igloo-calendar:before{content:\"\\f891\"}.fa-spider.sc-igloo-calendar:before{content:\"\\f717\"}.fa-spinner.sc-igloo-calendar:before{content:\"\\f110\"}.fa-splotch.sc-igloo-calendar:before{content:\"\\f5bc\"}.fa-spotify.sc-igloo-calendar:before{content:\"\\f1bc\"}.fa-spray-can.sc-igloo-calendar:before{content:\"\\f5bd\"}.fa-square.sc-igloo-calendar:before{content:\"\\f0c8\"}.fa-square-full.sc-igloo-calendar:before{content:\"\\f45c\"}.fa-square-root-alt.sc-igloo-calendar:before{content:\"\\f698\"}.fa-squarespace.sc-igloo-calendar:before{content:\"\\f5be\"}.fa-stack-exchange.sc-igloo-calendar:before{content:\"\\f18d\"}.fa-stack-overflow.sc-igloo-calendar:before{content:\"\\f16c\"}.fa-stackpath.sc-igloo-calendar:before{content:\"\\f842\"}.fa-stamp.sc-igloo-calendar:before{content:\"\\f5bf\"}.fa-star.sc-igloo-calendar:before{content:\"\\f005\"}.fa-star-and-crescent.sc-igloo-calendar:before{content:\"\\f699\"}.fa-star-half.sc-igloo-calendar:before{content:\"\\f089\"}.fa-star-half-alt.sc-igloo-calendar:before{content:\"\\f5c0\"}.fa-star-of-david.sc-igloo-calendar:before{content:\"\\f69a\"}.fa-star-of-life.sc-igloo-calendar:before{content:\"\\f621\"}.fa-staylinked.sc-igloo-calendar:before{content:\"\\f3f5\"}.fa-steam.sc-igloo-calendar:before{content:\"\\f1b6\"}.fa-steam-square.sc-igloo-calendar:before{content:\"\\f1b7\"}.fa-steam-symbol.sc-igloo-calendar:before{content:\"\\f3f6\"}.fa-step-backward.sc-igloo-calendar:before{content:\"\\f048\"}.fa-step-forward.sc-igloo-calendar:before{content:\"\\f051\"}.fa-stethoscope.sc-igloo-calendar:before{content:\"\\f0f1\"}.fa-sticker-mule.sc-igloo-calendar:before{content:\"\\f3f7\"}.fa-sticky-note.sc-igloo-calendar:before{content:\"\\f249\"}.fa-stop.sc-igloo-calendar:before{content:\"\\f04d\"}.fa-stop-circle.sc-igloo-calendar:before{content:\"\\f28d\"}.fa-stopwatch.sc-igloo-calendar:before{content:\"\\f2f2\"}.fa-store.sc-igloo-calendar:before{content:\"\\f54e\"}.fa-store-alt.sc-igloo-calendar:before{content:\"\\f54f\"}.fa-strava.sc-igloo-calendar:before{content:\"\\f428\"}.fa-stream.sc-igloo-calendar:before{content:\"\\f550\"}.fa-street-view.sc-igloo-calendar:before{content:\"\\f21d\"}.fa-strikethrough.sc-igloo-calendar:before{content:\"\\f0cc\"}.fa-stripe.sc-igloo-calendar:before{content:\"\\f429\"}.fa-stripe-s.sc-igloo-calendar:before{content:\"\\f42a\"}.fa-stroopwafel.sc-igloo-calendar:before{content:\"\\f551\"}.fa-studiovinari.sc-igloo-calendar:before{content:\"\\f3f8\"}.fa-stumbleupon.sc-igloo-calendar:before{content:\"\\f1a4\"}.fa-stumbleupon-circle.sc-igloo-calendar:before{content:\"\\f1a3\"}.fa-subscript.sc-igloo-calendar:before{content:\"\\f12c\"}.fa-subway.sc-igloo-calendar:before{content:\"\\f239\"}.fa-suitcase.sc-igloo-calendar:before{content:\"\\f0f2\"}.fa-suitcase-rolling.sc-igloo-calendar:before{content:\"\\f5c1\"}.fa-sun.sc-igloo-calendar:before{content:\"\\f185\"}.fa-superpowers.sc-igloo-calendar:before{content:\"\\f2dd\"}.fa-superscript.sc-igloo-calendar:before{content:\"\\f12b\"}.fa-supple.sc-igloo-calendar:before{content:\"\\f3f9\"}.fa-surprise.sc-igloo-calendar:before{content:\"\\f5c2\"}.fa-suse.sc-igloo-calendar:before{content:\"\\f7d6\"}.fa-swatchbook.sc-igloo-calendar:before{content:\"\\f5c3\"}.fa-swift.sc-igloo-calendar:before{content:\"\\f8e1\"}.fa-swimmer.sc-igloo-calendar:before{content:\"\\f5c4\"}.fa-swimming-pool.sc-igloo-calendar:before{content:\"\\f5c5\"}.fa-symfony.sc-igloo-calendar:before{content:\"\\f83d\"}.fa-synagogue.sc-igloo-calendar:before{content:\"\\f69b\"}.fa-sync.sc-igloo-calendar:before{content:\"\\f021\"}.fa-sync-alt.sc-igloo-calendar:before{content:\"\\f2f1\"}.fa-syringe.sc-igloo-calendar:before{content:\"\\f48e\"}.fa-table.sc-igloo-calendar:before{content:\"\\f0ce\"}.fa-table-tennis.sc-igloo-calendar:before{content:\"\\f45d\"}.fa-tablet.sc-igloo-calendar:before{content:\"\\f10a\"}.fa-tablet-alt.sc-igloo-calendar:before{content:\"\\f3fa\"}.fa-tablets.sc-igloo-calendar:before{content:\"\\f490\"}.fa-tachometer-alt.sc-igloo-calendar:before{content:\"\\f3fd\"}.fa-tag.sc-igloo-calendar:before{content:\"\\f02b\"}.fa-tags.sc-igloo-calendar:before{content:\"\\f02c\"}.fa-tape.sc-igloo-calendar:before{content:\"\\f4db\"}.fa-tasks.sc-igloo-calendar:before{content:\"\\f0ae\"}.fa-taxi.sc-igloo-calendar:before{content:\"\\f1ba\"}.fa-teamspeak.sc-igloo-calendar:before{content:\"\\f4f9\"}.fa-teeth.sc-igloo-calendar:before{content:\"\\f62e\"}.fa-teeth-open.sc-igloo-calendar:before{content:\"\\f62f\"}.fa-telegram.sc-igloo-calendar:before{content:\"\\f2c6\"}.fa-telegram-plane.sc-igloo-calendar:before{content:\"\\f3fe\"}.fa-temperature-high.sc-igloo-calendar:before{content:\"\\f769\"}.fa-temperature-low.sc-igloo-calendar:before{content:\"\\f76b\"}.fa-tencent-weibo.sc-igloo-calendar:before{content:\"\\f1d5\"}.fa-tenge.sc-igloo-calendar:before{content:\"\\f7d7\"}.fa-terminal.sc-igloo-calendar:before{content:\"\\f120\"}.fa-text-height.sc-igloo-calendar:before{content:\"\\f034\"}.fa-text-width.sc-igloo-calendar:before{content:\"\\f035\"}.fa-th.sc-igloo-calendar:before{content:\"\\f00a\"}.fa-th-large.sc-igloo-calendar:before{content:\"\\f009\"}.fa-th-list.sc-igloo-calendar:before{content:\"\\f00b\"}.fa-the-red-yeti.sc-igloo-calendar:before{content:\"\\f69d\"}.fa-theater-masks.sc-igloo-calendar:before{content:\"\\f630\"}.fa-themeco.sc-igloo-calendar:before{content:\"\\f5c6\"}.fa-themeisle.sc-igloo-calendar:before{content:\"\\f2b2\"}.fa-thermometer.sc-igloo-calendar:before{content:\"\\f491\"}.fa-thermometer-empty.sc-igloo-calendar:before{content:\"\\f2cb\"}.fa-thermometer-full.sc-igloo-calendar:before{content:\"\\f2c7\"}.fa-thermometer-half.sc-igloo-calendar:before{content:\"\\f2c9\"}.fa-thermometer-quarter.sc-igloo-calendar:before{content:\"\\f2ca\"}.fa-thermometer-three-quarters.sc-igloo-calendar:before{content:\"\\f2c8\"}.fa-think-peaks.sc-igloo-calendar:before{content:\"\\f731\"}.fa-thumbs-down.sc-igloo-calendar:before{content:\"\\f165\"}.fa-thumbs-up.sc-igloo-calendar:before{content:\"\\f164\"}.fa-thumbtack.sc-igloo-calendar:before{content:\"\\f08d\"}.fa-ticket-alt.sc-igloo-calendar:before{content:\"\\f3ff\"}.fa-times.sc-igloo-calendar:before{content:\"\\f00d\"}.fa-times-circle.sc-igloo-calendar:before{content:\"\\f057\"}.fa-tint.sc-igloo-calendar:before{content:\"\\f043\"}.fa-tint-slash.sc-igloo-calendar:before{content:\"\\f5c7\"}.fa-tired.sc-igloo-calendar:before{content:\"\\f5c8\"}.fa-toggle-off.sc-igloo-calendar:before{content:\"\\f204\"}.fa-toggle-on.sc-igloo-calendar:before{content:\"\\f205\"}.fa-toilet.sc-igloo-calendar:before{content:\"\\f7d8\"}.fa-toilet-paper.sc-igloo-calendar:before{content:\"\\f71e\"}.fa-toolbox.sc-igloo-calendar:before{content:\"\\f552\"}.fa-tools.sc-igloo-calendar:before{content:\"\\f7d9\"}.fa-tooth.sc-igloo-calendar:before{content:\"\\f5c9\"}.fa-torah.sc-igloo-calendar:before{content:\"\\f6a0\"}.fa-torii-gate.sc-igloo-calendar:before{content:\"\\f6a1\"}.fa-tractor.sc-igloo-calendar:before{content:\"\\f722\"}.fa-trade-federation.sc-igloo-calendar:before{content:\"\\f513\"}.fa-trademark.sc-igloo-calendar:before{content:\"\\f25c\"}.fa-traffic-light.sc-igloo-calendar:before{content:\"\\f637\"}.fa-trailer.sc-igloo-calendar:before{content:\"\\f941\"}.fa-train.sc-igloo-calendar:before{content:\"\\f238\"}.fa-tram.sc-igloo-calendar:before{content:\"\\f7da\"}.fa-transgender.sc-igloo-calendar:before{content:\"\\f224\"}.fa-transgender-alt.sc-igloo-calendar:before{content:\"\\f225\"}.fa-trash.sc-igloo-calendar:before{content:\"\\f1f8\"}.fa-trash-alt.sc-igloo-calendar:before{content:\"\\f2ed\"}.fa-trash-restore.sc-igloo-calendar:before{content:\"\\f829\"}.fa-trash-restore-alt.sc-igloo-calendar:before{content:\"\\f82a\"}.fa-tree.sc-igloo-calendar:before{content:\"\\f1bb\"}.fa-trello.sc-igloo-calendar:before{content:\"\\f181\"}.fa-tripadvisor.sc-igloo-calendar:before{content:\"\\f262\"}.fa-trophy.sc-igloo-calendar:before{content:\"\\f091\"}.fa-truck.sc-igloo-calendar:before{content:\"\\f0d1\"}.fa-truck-loading.sc-igloo-calendar:before{content:\"\\f4de\"}.fa-truck-monster.sc-igloo-calendar:before{content:\"\\f63b\"}.fa-truck-moving.sc-igloo-calendar:before{content:\"\\f4df\"}.fa-truck-pickup.sc-igloo-calendar:before{content:\"\\f63c\"}.fa-tshirt.sc-igloo-calendar:before{content:\"\\f553\"}.fa-tty.sc-igloo-calendar:before{content:\"\\f1e4\"}.fa-tumblr.sc-igloo-calendar:before{content:\"\\f173\"}.fa-tumblr-square.sc-igloo-calendar:before{content:\"\\f174\"}.fa-tv.sc-igloo-calendar:before{content:\"\\f26c\"}.fa-twitch.sc-igloo-calendar:before{content:\"\\f1e8\"}.fa-twitter.sc-igloo-calendar:before{content:\"\\f099\"}.fa-twitter-square.sc-igloo-calendar:before{content:\"\\f081\"}.fa-typo3.sc-igloo-calendar:before{content:\"\\f42b\"}.fa-uber.sc-igloo-calendar:before{content:\"\\f402\"}.fa-ubuntu.sc-igloo-calendar:before{content:\"\\f7df\"}.fa-uikit.sc-igloo-calendar:before{content:\"\\f403\"}.fa-umbraco.sc-igloo-calendar:before{content:\"\\f8e8\"}.fa-umbrella.sc-igloo-calendar:before{content:\"\\f0e9\"}.fa-umbrella-beach.sc-igloo-calendar:before{content:\"\\f5ca\"}.fa-underline.sc-igloo-calendar:before{content:\"\\f0cd\"}.fa-undo.sc-igloo-calendar:before{content:\"\\f0e2\"}.fa-undo-alt.sc-igloo-calendar:before{content:\"\\f2ea\"}.fa-uniregistry.sc-igloo-calendar:before{content:\"\\f404\"}.fa-unity.sc-igloo-calendar:before{content:\"\\f949\"}.fa-universal-access.sc-igloo-calendar:before{content:\"\\f29a\"}.fa-university.sc-igloo-calendar:before{content:\"\\f19c\"}.fa-unlink.sc-igloo-calendar:before{content:\"\\f127\"}.fa-unlock.sc-igloo-calendar:before{content:\"\\f09c\"}.fa-unlock-alt.sc-igloo-calendar:before{content:\"\\f13e\"}.fa-untappd.sc-igloo-calendar:before{content:\"\\f405\"}.fa-upload.sc-igloo-calendar:before{content:\"\\f093\"}.fa-ups.sc-igloo-calendar:before{content:\"\\f7e0\"}.fa-usb.sc-igloo-calendar:before{content:\"\\f287\"}.fa-user.sc-igloo-calendar:before{content:\"\\f007\"}.fa-user-alt.sc-igloo-calendar:before{content:\"\\f406\"}.fa-user-alt-slash.sc-igloo-calendar:before{content:\"\\f4fa\"}.fa-user-astronaut.sc-igloo-calendar:before{content:\"\\f4fb\"}.fa-user-check.sc-igloo-calendar:before{content:\"\\f4fc\"}.fa-user-circle.sc-igloo-calendar:before{content:\"\\f2bd\"}.fa-user-clock.sc-igloo-calendar:before{content:\"\\f4fd\"}.fa-user-cog.sc-igloo-calendar:before{content:\"\\f4fe\"}.fa-user-edit.sc-igloo-calendar:before{content:\"\\f4ff\"}.fa-user-friends.sc-igloo-calendar:before{content:\"\\f500\"}.fa-user-graduate.sc-igloo-calendar:before{content:\"\\f501\"}.fa-user-injured.sc-igloo-calendar:before{content:\"\\f728\"}.fa-user-lock.sc-igloo-calendar:before{content:\"\\f502\"}.fa-user-md.sc-igloo-calendar:before{content:\"\\f0f0\"}.fa-user-minus.sc-igloo-calendar:before{content:\"\\f503\"}.fa-user-ninja.sc-igloo-calendar:before{content:\"\\f504\"}.fa-user-nurse.sc-igloo-calendar:before{content:\"\\f82f\"}.fa-user-plus.sc-igloo-calendar:before{content:\"\\f234\"}.fa-user-secret.sc-igloo-calendar:before{content:\"\\f21b\"}.fa-user-shield.sc-igloo-calendar:before{content:\"\\f505\"}.fa-user-slash.sc-igloo-calendar:before{content:\"\\f506\"}.fa-user-tag.sc-igloo-calendar:before{content:\"\\f507\"}.fa-user-tie.sc-igloo-calendar:before{content:\"\\f508\"}.fa-user-times.sc-igloo-calendar:before{content:\"\\f235\"}.fa-users.sc-igloo-calendar:before{content:\"\\f0c0\"}.fa-users-cog.sc-igloo-calendar:before{content:\"\\f509\"}.fa-usps.sc-igloo-calendar:before{content:\"\\f7e1\"}.fa-ussunnah.sc-igloo-calendar:before{content:\"\\f407\"}.fa-utensil-spoon.sc-igloo-calendar:before{content:\"\\f2e5\"}.fa-utensils.sc-igloo-calendar:before{content:\"\\f2e7\"}.fa-vaadin.sc-igloo-calendar:before{content:\"\\f408\"}.fa-vector-square.sc-igloo-calendar:before{content:\"\\f5cb\"}.fa-venus.sc-igloo-calendar:before{content:\"\\f221\"}.fa-venus-double.sc-igloo-calendar:before{content:\"\\f226\"}.fa-venus-mars.sc-igloo-calendar:before{content:\"\\f228\"}.fa-viacoin.sc-igloo-calendar:before{content:\"\\f237\"}.fa-viadeo.sc-igloo-calendar:before{content:\"\\f2a9\"}.fa-viadeo-square.sc-igloo-calendar:before{content:\"\\f2aa\"}.fa-vial.sc-igloo-calendar:before{content:\"\\f492\"}.fa-vials.sc-igloo-calendar:before{content:\"\\f493\"}.fa-viber.sc-igloo-calendar:before{content:\"\\f409\"}.fa-video.sc-igloo-calendar:before{content:\"\\f03d\"}.fa-video-slash.sc-igloo-calendar:before{content:\"\\f4e2\"}.fa-vihara.sc-igloo-calendar:before{content:\"\\f6a7\"}.fa-vimeo.sc-igloo-calendar:before{content:\"\\f40a\"}.fa-vimeo-square.sc-igloo-calendar:before{content:\"\\f194\"}.fa-vimeo-v.sc-igloo-calendar:before{content:\"\\f27d\"}.fa-vine.sc-igloo-calendar:before{content:\"\\f1ca\"}.fa-vk.sc-igloo-calendar:before{content:\"\\f189\"}.fa-vnv.sc-igloo-calendar:before{content:\"\\f40b\"}.fa-voicemail.sc-igloo-calendar:before{content:\"\\f897\"}.fa-volleyball-ball.sc-igloo-calendar:before{content:\"\\f45f\"}.fa-volume-down.sc-igloo-calendar:before{content:\"\\f027\"}.fa-volume-mute.sc-igloo-calendar:before{content:\"\\f6a9\"}.fa-volume-off.sc-igloo-calendar:before{content:\"\\f026\"}.fa-volume-up.sc-igloo-calendar:before{content:\"\\f028\"}.fa-vote-yea.sc-igloo-calendar:before{content:\"\\f772\"}.fa-vr-cardboard.sc-igloo-calendar:before{content:\"\\f729\"}.fa-vuejs.sc-igloo-calendar:before{content:\"\\f41f\"}.fa-walking.sc-igloo-calendar:before{content:\"\\f554\"}.fa-wallet.sc-igloo-calendar:before{content:\"\\f555\"}.fa-warehouse.sc-igloo-calendar:before{content:\"\\f494\"}.fa-water.sc-igloo-calendar:before{content:\"\\f773\"}.fa-wave-square.sc-igloo-calendar:before{content:\"\\f83e\"}.fa-waze.sc-igloo-calendar:before{content:\"\\f83f\"}.fa-weebly.sc-igloo-calendar:before{content:\"\\f5cc\"}.fa-weibo.sc-igloo-calendar:before{content:\"\\f18a\"}.fa-weight.sc-igloo-calendar:before{content:\"\\f496\"}.fa-weight-hanging.sc-igloo-calendar:before{content:\"\\f5cd\"}.fa-weixin.sc-igloo-calendar:before{content:\"\\f1d7\"}.fa-whatsapp.sc-igloo-calendar:before{content:\"\\f232\"}.fa-whatsapp-square.sc-igloo-calendar:before{content:\"\\f40c\"}.fa-wheelchair.sc-igloo-calendar:before{content:\"\\f193\"}.fa-whmcs.sc-igloo-calendar:before{content:\"\\f40d\"}.fa-wifi.sc-igloo-calendar:before{content:\"\\f1eb\"}.fa-wikipedia-w.sc-igloo-calendar:before{content:\"\\f266\"}.fa-wind.sc-igloo-calendar:before{content:\"\\f72e\"}.fa-window-close.sc-igloo-calendar:before{content:\"\\f410\"}.fa-window-maximize.sc-igloo-calendar:before{content:\"\\f2d0\"}.fa-window-minimize.sc-igloo-calendar:before{content:\"\\f2d1\"}.fa-window-restore.sc-igloo-calendar:before{content:\"\\f2d2\"}.fa-windows.sc-igloo-calendar:before{content:\"\\f17a\"}.fa-wine-bottle.sc-igloo-calendar:before{content:\"\\f72f\"}.fa-wine-glass.sc-igloo-calendar:before{content:\"\\f4e3\"}.fa-wine-glass-alt.sc-igloo-calendar:before{content:\"\\f5ce\"}.fa-wix.sc-igloo-calendar:before{content:\"\\f5cf\"}.fa-wizards-of-the-coast.sc-igloo-calendar:before{content:\"\\f730\"}.fa-wolf-pack-battalion.sc-igloo-calendar:before{content:\"\\f514\"}.fa-won-sign.sc-igloo-calendar:before{content:\"\\f159\"}.fa-wordpress.sc-igloo-calendar:before{content:\"\\f19a\"}.fa-wordpress-simple.sc-igloo-calendar:before{content:\"\\f411\"}.fa-wpbeginner.sc-igloo-calendar:before{content:\"\\f297\"}.fa-wpexplorer.sc-igloo-calendar:before{content:\"\\f2de\"}.fa-wpforms.sc-igloo-calendar:before{content:\"\\f298\"}.fa-wpressr.sc-igloo-calendar:before{content:\"\\f3e4\"}.fa-wrench.sc-igloo-calendar:before{content:\"\\f0ad\"}.fa-x-ray.sc-igloo-calendar:before{content:\"\\f497\"}.fa-xbox.sc-igloo-calendar:before{content:\"\\f412\"}.fa-xing.sc-igloo-calendar:before{content:\"\\f168\"}.fa-xing-square.sc-igloo-calendar:before{content:\"\\f169\"}.fa-y-combinator.sc-igloo-calendar:before{content:\"\\f23b\"}.fa-yahoo.sc-igloo-calendar:before{content:\"\\f19e\"}.fa-yammer.sc-igloo-calendar:before{content:\"\\f840\"}.fa-yandex.sc-igloo-calendar:before{content:\"\\f413\"}.fa-yandex-international.sc-igloo-calendar:before{content:\"\\f414\"}.fa-yarn.sc-igloo-calendar:before{content:\"\\f7e3\"}.fa-yelp.sc-igloo-calendar:before{content:\"\\f1e9\"}.fa-yen-sign.sc-igloo-calendar:before{content:\"\\f157\"}.fa-yin-yang.sc-igloo-calendar:before{content:\"\\f6ad\"}.fa-yoast.sc-igloo-calendar:before{content:\"\\f2b1\"}.fa-youtube.sc-igloo-calendar:before{content:\"\\f167\"}.fa-youtube-square.sc-igloo-calendar:before{content:\"\\f431\"}.fa-zhihu.sc-igloo-calendar:before{content:\"\\f63f\"}.sr-only.sc-igloo-calendar{border:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable.sc-igloo-calendar:active,.sr-only-focusable.sc-igloo-calendar:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}@font-face{font-family:'Font Awesome 5 Brands';font-style:normal;font-weight:400;font-display:auto;src:url(\"../webfonts/fa-brands-400.eot\");src:url(\"../webfonts/fa-brands-400.eot?#iefix\") format(\"embedded-opentype\"), url(\"../webfonts/fa-brands-400.woff2\") format(\"woff2\"), url(\"../webfonts/fa-brands-400.woff\") format(\"woff\"), url(\"../webfonts/fa-brands-400.ttf\") format(\"truetype\"), url(\"../webfonts/fa-brands-400.svg#fontawesome\") format(\"svg\")}.fab.sc-igloo-calendar{font-family:'Font Awesome 5 Brands';font-weight:400}@font-face{font-family:'Font Awesome 5 Free';font-style:normal;font-weight:400;font-display:auto;src:url(\"../webfonts/fa-regular-400.eot\");src:url(\"../webfonts/fa-regular-400.eot?#iefix\") format(\"embedded-opentype\"), url(\"../webfonts/fa-regular-400.woff2\") format(\"woff2\"), url(\"../webfonts/fa-regular-400.woff\") format(\"woff\"), url(\"../webfonts/fa-regular-400.ttf\") format(\"truetype\"), url(\"../webfonts/fa-regular-400.svg#fontawesome\") format(\"svg\")}.far.sc-igloo-calendar{font-family:'Font Awesome 5 Free';font-weight:400}@font-face{font-family:'Font Awesome 5 Free';font-style:normal;font-weight:900;font-display:auto;src:url(\"../webfonts/fa-solid-900.eot\");src:url(\"../webfonts/fa-solid-900.eot?#iefix\") format(\"embedded-opentype\"), url(\"../webfonts/fa-solid-900.woff2\") format(\"woff2\"), url(\"../webfonts/fa-solid-900.woff\") format(\"woff\"), url(\"../webfonts/fa-solid-900.ttf\") format(\"truetype\"), url(\"../webfonts/fa-solid-900.svg#fontawesome\") format(\"svg\")}.fa.sc-igloo-calendar,.fas.sc-igloo-calendar{font-family:'Font Awesome 5 Free';font-weight:900}.la.sc-igloo-calendar,.la-stack.sc-igloo-calendar{display:inline-block}.la-fw.sc-igloo-calendar,.la-li.sc-igloo-calendar{text-align:center}@font-face{font-family:LineAwesome;src:url(../fonts/line-awesome.eot?v=1.1.);src:url(../fonts/line-awesome.eot??v=1.1.#iefix) format(\"embedded-opentype\"),url(../fonts/line-awesome.woff2?v=1.1.) format(\"woff2\"),url(../fonts/line-awesome.woff?v=1.1.) format(\"woff\"),url(../fonts/line-awesome.ttf?v=1.1.) format(\"truetype\"),url(../fonts/line-awesome.svg?v=1.1.#fa) format(\"svg\");font-weight:400;font-style:normal}@media screen and (-webkit-min-device-pixel-ratio:0){@font-face{font-family:LineAwesome;src:url(../fonts/line-awesome.svg?v=1.1.#fa) format(\"svg\")}}.la.sc-igloo-calendar{font:normal normal normal 16px/1 LineAwesome;font-size:inherit;text-decoration:inherit;text-rendering:optimizeLegibility;text-transform:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-smoothing:antialiased}.la-lg.sc-igloo-calendar{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.la-2x.sc-igloo-calendar{font-size:2em}.la-3x.sc-igloo-calendar{font-size:3em}.la-4x.sc-igloo-calendar{font-size:4em}.la-5x.sc-igloo-calendar{font-size:5em}.la-fw.sc-igloo-calendar{width:1.28571429em}.la-ul.sc-igloo-calendar{padding-left:0;margin-left:2.14285714em;list-style-type:none}.la-ul.sc-igloo-calendar>li.sc-igloo-calendar{position:relative}.la-li.sc-igloo-calendar{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em}.la-li.la-lg.sc-igloo-calendar{left:-1.85714286em}.la-border.sc-igloo-calendar{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.pull-right.sc-igloo-calendar{float:right}.pull-left.sc-igloo-calendar{float:left}.li.pull-left.sc-igloo-calendar{margin-right:.3em}.li.pull-right.sc-igloo-calendar{margin-left:.3em}.la-spin.sc-igloo-calendar{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.la-rotate-90.sc-igloo-calendar{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.la-rotate-180.sc-igloo-calendar{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.la-rotate-270.sc-igloo-calendar{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.la-flip-horizontal.sc-igloo-calendar{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);-webkit-transform:scale(-1,1);-ms-transform:scale(-1,1);transform:scale(-1,1)}.la-flip-vertical.sc-igloo-calendar{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);-webkit-transform:scale(1,-1);-ms-transform:scale(1,-1);transform:scale(1,-1)}.sc-igloo-calendar:root .la-flip-horizontal.sc-igloo-calendar,.sc-igloo-calendar:root .la-flip-vertical.sc-igloo-calendar,.sc-igloo-calendar:root .la-rotate-180.sc-igloo-calendar,.sc-igloo-calendar:root .la-rotate-270.sc-igloo-calendar,.sc-igloo-calendar:root .la-rotate-90.sc-igloo-calendar{filter:none}.la-stack.sc-igloo-calendar{position:relative;width:2em;height:2em;line-height:2em;vertical-align:middle}.la-stack-1x.sc-igloo-calendar,.la-stack-2x.sc-igloo-calendar{position:absolute;left:0;width:100%;text-align:center}.la-stack-1x.sc-igloo-calendar{line-height:inherit}.la-stack-2x.sc-igloo-calendar{font-size:2em}.la-inverse.sc-igloo-calendar{color:#fff}.la-500px.sc-igloo-calendar:before{content:\"\\f100\"}.la-adjust.sc-igloo-calendar:before{content:\"\\f101\"}.la-adn.sc-igloo-calendar:before{content:\"\\f102\"}.la-align-center.sc-igloo-calendar:before{content:\"\\f103\"}.la-align-justify.sc-igloo-calendar:before{content:\"\\f104\"}.la-align-left.sc-igloo-calendar:before{content:\"\\f105\"}.la-align-right.sc-igloo-calendar:before{content:\"\\f106\"}.la-amazon.sc-igloo-calendar:before{content:\"\\f107\"}.la-ambulance.sc-igloo-calendar:before{content:\"\\f108\"}.la-anchor.sc-igloo-calendar:before{content:\"\\f109\"}.la-android.sc-igloo-calendar:before{content:\"\\f10a\"}.la-angellist.sc-igloo-calendar:before{content:\"\\f10b\"}.la-angle-double-down.sc-igloo-calendar:before{content:\"\\f10c\"}.la-angle-double-left.sc-igloo-calendar:before{content:\"\\f10d\"}.la-angle-double-right.sc-igloo-calendar:before{content:\"\\f10e\"}.la-angle-double-up.sc-igloo-calendar:before{content:\"\\f10f\"}.la-angle-down.sc-igloo-calendar:before{content:\"\\f110\"}.la-angle-left.sc-igloo-calendar:before{content:\"\\f111\"}.la-angle-right.sc-igloo-calendar:before{content:\"\\f112\"}.la-angle-up.sc-igloo-calendar:before{content:\"\\f113\"}.la-apple.sc-igloo-calendar:before{content:\"\\f114\"}.la-archive.sc-igloo-calendar:before{content:\"\\f115\"}.la-area-chart.sc-igloo-calendar:before{content:\"\\f116\"}.la-arrow-circle-down.sc-igloo-calendar:before{content:\"\\f117\"}.la-arrow-circle-left.sc-igloo-calendar:before{content:\"\\f118\"}.la-arrow-circle-o-down.sc-igloo-calendar:before{content:\"\\f119\"}.la-arrow-circle-o-left.sc-igloo-calendar:before{content:\"\\f11a\"}.la-arrow-circle-o-right.sc-igloo-calendar:before{content:\"\\f11b\"}.la-arrow-circle-o-up.sc-igloo-calendar:before{content:\"\\f11c\"}.la-arrow-circle-right.sc-igloo-calendar:before{content:\"\\f11d\"}.la-arrow-circle-up.sc-igloo-calendar:before{content:\"\\f11e\"}.la-arrow-down.sc-igloo-calendar:before{content:\"\\f11f\"}.la-arrow-left.sc-igloo-calendar:before{content:\"\\f120\"}.la-arrow-right.sc-igloo-calendar:before{content:\"\\f121\"}.la-arrow-up.sc-igloo-calendar:before{content:\"\\f122\"}.la-arrows.sc-igloo-calendar:before{content:\"\\f123\"}.la-arrows-alt.sc-igloo-calendar:before{content:\"\\f124\"}.la-arrows-h.sc-igloo-calendar:before{content:\"\\f125\"}.la-arrows-v.sc-igloo-calendar:before{content:\"\\f126\"}.la-asterisk.sc-igloo-calendar:before{content:\"\\f127\"}.la-at.sc-igloo-calendar:before{content:\"\\f128\"}.la-automobile.sc-igloo-calendar:before{content:\"\\f129\"}.la-backward.sc-igloo-calendar:before{content:\"\\f12a\"}.la-balance-scale.sc-igloo-calendar:before{content:\"\\f12b\"}.la-ban.sc-igloo-calendar:before{content:\"\\f12c\"}.la-bank.sc-igloo-calendar:before{content:\"\\f12d\"}.la-bar-chart.sc-igloo-calendar:before{content:\"\\f12e\"}.la-bar-chart-o.sc-igloo-calendar:before{content:\"\\f12f\"}.la-barcode.sc-igloo-calendar:before{content:\"\\f130\"}.la-bars.sc-igloo-calendar:before{content:\"\\f131\"}.la-battery-0.sc-igloo-calendar:before{content:\"\\f132\"}.la-battery-1.sc-igloo-calendar:before{content:\"\\f133\"}.la-battery-2.sc-igloo-calendar:before{content:\"\\f134\"}.la-battery-3.sc-igloo-calendar:before{content:\"\\f135\"}.la-battery-4.sc-igloo-calendar:before{content:\"\\f136\"}.la-battery-empty.sc-igloo-calendar:before{content:\"\\f137\"}.la-battery-full.sc-igloo-calendar:before{content:\"\\f138\"}.la-battery-half.sc-igloo-calendar:before{content:\"\\f139\"}.la-battery-quarter.sc-igloo-calendar:before{content:\"\\f13a\"}.la-battery-three-quarters.sc-igloo-calendar:before{content:\"\\f13b\"}.la-bed.sc-igloo-calendar:before{content:\"\\f13c\"}.la-beer.sc-igloo-calendar:before{content:\"\\f13d\"}.la-behance.sc-igloo-calendar:before{content:\"\\f13e\"}.la-behance-square.sc-igloo-calendar:before{content:\"\\f13f\"}.la-bell.sc-igloo-calendar:before{content:\"\\f140\"}.la-bell-o.sc-igloo-calendar:before{content:\"\\f141\"}.la-bell-slash.sc-igloo-calendar:before{content:\"\\f142\"}.la-bell-slash-o.sc-igloo-calendar:before{content:\"\\f143\"}.la-bicycle.sc-igloo-calendar:before{content:\"\\f144\"}.la-binoculars.sc-igloo-calendar:before{content:\"\\f145\"}.la-birthday-cake.sc-igloo-calendar:before{content:\"\\f146\"}.la-bitbucket.sc-igloo-calendar:before{content:\"\\f147\"}.la-bitbucket-square.sc-igloo-calendar:before{content:\"\\f148\"}.la-bitcoin.sc-igloo-calendar:before{content:\"\\f149\"}.la-black-tie.sc-igloo-calendar:before{content:\"\\f14a\"}.la-bold.sc-igloo-calendar:before{content:\"\\f14b\"}.la-bolt.sc-igloo-calendar:before{content:\"\\f14c\"}.la-bomb.sc-igloo-calendar:before{content:\"\\f14d\"}.la-book.sc-igloo-calendar:before{content:\"\\f14e\"}.la-bookmark.sc-igloo-calendar:before{content:\"\\f14f\"}.la-bookmark-o.sc-igloo-calendar:before{content:\"\\f150\"}.la-briefcase.sc-igloo-calendar:before{content:\"\\f151\"}.la-btc.sc-igloo-calendar:before{content:\"\\f152\"}.la-bug.sc-igloo-calendar:before{content:\"\\f153\"}.la-building.sc-igloo-calendar:before{content:\"\\f154\"}.la-building-o.sc-igloo-calendar:before{content:\"\\f155\"}.la-bullhorn.sc-igloo-calendar:before{content:\"\\f156\"}.la-bullseye.sc-igloo-calendar:before{content:\"\\f157\"}.la-bus.sc-igloo-calendar:before{content:\"\\f158\"}.la-buysellads.sc-igloo-calendar:before{content:\"\\f159\"}.la-cab.sc-igloo-calendar:before{content:\"\\f15a\"}.la-calculator.sc-igloo-calendar:before{content:\"\\f15b\"}.la-calendar.sc-igloo-calendar:before{content:\"\\f15c\"}.la-calendar-check-o.sc-igloo-calendar:before{content:\"\\f15d\"}.la-calendar-minus-o.sc-igloo-calendar:before{content:\"\\f15e\"}.la-calendar-o.sc-igloo-calendar:before{content:\"\\f15f\"}.la-calendar-plus-o.sc-igloo-calendar:before{content:\"\\f160\"}.la-calendar-times-o.sc-igloo-calendar:before{content:\"\\f161\"}.la-camera.sc-igloo-calendar:before{content:\"\\f162\"}.la-camera-retro.sc-igloo-calendar:before{content:\"\\f163\"}.la-car.sc-igloo-calendar:before{content:\"\\f164\"}.la-caret-down.sc-igloo-calendar:before{content:\"\\f165\"}.la-caret-left.sc-igloo-calendar:before{content:\"\\f166\"}.la-caret-right.sc-igloo-calendar:before{content:\"\\f167\"}.la-caret-square-o-down.sc-igloo-calendar:before,.la-toggle-down.sc-igloo-calendar:before{content:\"\\f168\"}.la-caret-square-o-left.sc-igloo-calendar:before,.la-toggle-left.sc-igloo-calendar:before{content:\"\\f169\"}.la-caret-square-o-right.sc-igloo-calendar:before,.la-toggle-right.sc-igloo-calendar:before{content:\"\\f16a\"}.la-caret-square-o-up.sc-igloo-calendar:before,.la-toggle-up.sc-igloo-calendar:before{content:\"\\f16b\"}.la-caret-up.sc-igloo-calendar:before{content:\"\\f16c\"}.la-cart-arrow-down.sc-igloo-calendar:before{content:\"\\f16d\"}.la-cart-plus.sc-igloo-calendar:before{content:\"\\f16e\"}.la-cc.sc-igloo-calendar:before{content:\"\\f16f\"}.la-cc-amex.sc-igloo-calendar:before{content:\"\\f170\"}.la-cc-diners-club.sc-igloo-calendar:before{content:\"\\f171\"}.la-cc-discover.sc-igloo-calendar:before{content:\"\\f172\"}.la-cc-jcb.sc-igloo-calendar:before{content:\"\\f173\"}.la-cc-mastercard.sc-igloo-calendar:before{content:\"\\f174\"}.la-cc-paypal.sc-igloo-calendar:before{content:\"\\f175\"}.la-cc-stripe.sc-igloo-calendar:before{content:\"\\f176\"}.la-cc-visa.sc-igloo-calendar:before{content:\"\\f177\"}.la-certificate.sc-igloo-calendar:before{content:\"\\f178\"}.la-chain.sc-igloo-calendar:before{content:\"\\f179\"}.la-chain-broken.sc-igloo-calendar:before{content:\"\\f17a\"}.la-check.sc-igloo-calendar:before{content:\"\\f17b\"}.la-check-circle.sc-igloo-calendar:before{content:\"\\f17c\"}.la-check-circle-o.sc-igloo-calendar:before{content:\"\\f17d\"}.la-check-square.sc-igloo-calendar:before{content:\"\\f17e\"}.la-check-square-o.sc-igloo-calendar:before{content:\"\\f17f\"}.la-chevron-circle-down.sc-igloo-calendar:before{content:\"\\f180\"}.la-chevron-circle-left.sc-igloo-calendar:before{content:\"\\f181\"}.la-chevron-circle-right.sc-igloo-calendar:before{content:\"\\f182\"}.la-chevron-circle-up.sc-igloo-calendar:before{content:\"\\f183\"}.la-chevron-down.sc-igloo-calendar:before{content:\"\\f184\"}.la-chevron-left.sc-igloo-calendar:before{content:\"\\f185\"}.la-chevron-right.sc-igloo-calendar:before{content:\"\\f186\"}.la-chevron-up.sc-igloo-calendar:before{content:\"\\f187\"}.la-child.sc-igloo-calendar:before{content:\"\\f188\"}.la-chrome.sc-igloo-calendar:before{content:\"\\f189\"}.la-circle.sc-igloo-calendar:before{content:\"\\f18a\"}.la-circle-o.sc-igloo-calendar:before{content:\"\\f18b\"}.la-circle-o-notch.sc-igloo-calendar:before{content:\"\\f18c\"}.la-circle-thin.sc-igloo-calendar:before{content:\"\\f18d\"}.la-clipboard.sc-igloo-calendar:before{content:\"\\f18e\"}.la-clock-o.sc-igloo-calendar:before{content:\"\\f18f\"}.la-clone.sc-igloo-calendar:before{content:\"\\f190\"}.la-close.sc-igloo-calendar:before{content:\"\\f191\"}.la-cloud.sc-igloo-calendar:before{content:\"\\f192\"}.la-cloud-download.sc-igloo-calendar:before{content:\"\\f193\"}.la-cloud-upload.sc-igloo-calendar:before{content:\"\\f194\"}.la-cny.sc-igloo-calendar:before{content:\"\\f195\"}.la-code.sc-igloo-calendar:before{content:\"\\f196\"}.la-code-fork.sc-igloo-calendar:before{content:\"\\f197\"}.la-codepen.sc-igloo-calendar:before{content:\"\\f198\"}.la-coffee.sc-igloo-calendar:before{content:\"\\f199\"}.la-cog.sc-igloo-calendar:before{content:\"\\f19a\"}.la-cogs.sc-igloo-calendar:before{content:\"\\f19b\"}.la-columns.sc-igloo-calendar:before{content:\"\\f19c\"}.la-comment.sc-igloo-calendar:before{content:\"\\f19d\"}.la-comment-o.sc-igloo-calendar:before{content:\"\\f19e\"}.la-commenting.sc-igloo-calendar:before{content:\"\\f19f\"}.la-commenting-o.sc-igloo-calendar:before{content:\"\\f1a0\"}.la-comments.sc-igloo-calendar:before{content:\"\\f1a1\"}.la-comments-o.sc-igloo-calendar:before{content:\"\\f1a2\"}.la-compass.sc-igloo-calendar:before{content:\"\\f1a3\"}.la-compress.sc-igloo-calendar:before{content:\"\\f1a4\"}.la-connectdevelop.sc-igloo-calendar:before{content:\"\\f1a5\"}.la-contao.sc-igloo-calendar:before{content:\"\\f1a6\"}.la-copy.sc-igloo-calendar:before{content:\"\\f1a7\"}.la-copyright.sc-igloo-calendar:before{content:\"\\f1a8\"}.la-creative-commons.sc-igloo-calendar:before{content:\"\\f1a9\"}.la-credit-card.sc-igloo-calendar:before{content:\"\\f1aa\"}.la-crop.sc-igloo-calendar:before{content:\"\\f1ab\"}.la-crosshairs.sc-igloo-calendar:before{content:\"\\f1ac\"}.la-css3.sc-igloo-calendar:before{content:\"\\f1ad\"}.la-cube.sc-igloo-calendar:before{content:\"\\f1ae\"}.la-cubes.sc-igloo-calendar:before{content:\"\\f1af\"}.la-cut.sc-igloo-calendar:before{content:\"\\f1b0\"}.la-cutlery.sc-igloo-calendar:before{content:\"\\f1b1\"}.la-dashboard.sc-igloo-calendar:before{content:\"\\f1b2\"}.la-dashcube.sc-igloo-calendar:before{content:\"\\f1b3\"}.la-database.sc-igloo-calendar:before{content:\"\\f1b4\"}.la-dedent.sc-igloo-calendar:before{content:\"\\f1b5\"}.la-delicious.sc-igloo-calendar:before{content:\"\\f1b6\"}.la-desktop.sc-igloo-calendar:before{content:\"\\f1b7\"}.la-deviantart.sc-igloo-calendar:before{content:\"\\f1b8\"}.la-diamond.sc-igloo-calendar:before{content:\"\\f1b9\"}.la-digg.sc-igloo-calendar:before{content:\"\\f1ba\"}.la-dollar.sc-igloo-calendar:before{content:\"\\f1bb\"}.la-dot-circle-o.sc-igloo-calendar:before{content:\"\\f1bc\"}.la-download.sc-igloo-calendar:before{content:\"\\f1bd\"}.la-dribbble.sc-igloo-calendar:before{content:\"\\f1be\"}.la-dropbox.sc-igloo-calendar:before{content:\"\\f1bf\"}.la-drupal.sc-igloo-calendar:before{content:\"\\f1c0\"}.la-edit.sc-igloo-calendar:before{content:\"\\f1c1\"}.la-eject.sc-igloo-calendar:before{content:\"\\f1c2\"}.la-ellipsis-h.sc-igloo-calendar:before{content:\"\\f1c3\"}.la-ellipsis-v.sc-igloo-calendar:before{content:\"\\f1c4\"}.la-empire.sc-igloo-calendar:before,.la-ge.sc-igloo-calendar:before{content:\"\\f1c5\"}.la-envelope.sc-igloo-calendar:before{content:\"\\f1c6\"}.la-envelope-o.sc-igloo-calendar:before{content:\"\\f1c7\"}.la-envelope-square.sc-igloo-calendar:before{content:\"\\f1c8\"}.la-eraser.sc-igloo-calendar:before{content:\"\\f1c9\"}.la-eur.sc-igloo-calendar:before{content:\"\\f1ca\"}.la-euro.sc-igloo-calendar:before{content:\"\\f1cb\"}.la-exchange.sc-igloo-calendar:before{content:\"\\f1cc\"}.la-exclamation.sc-igloo-calendar:before{content:\"\\f1cd\"}.la-exclamation-circle.sc-igloo-calendar:before{content:\"\\f1ce\"}.la-exclamation-triangle.sc-igloo-calendar:before{content:\"\\f1cf\"}.la-expand.sc-igloo-calendar:before{content:\"\\f1d0\"}.la-expeditedssl.sc-igloo-calendar:before{content:\"\\f1d1\"}.la-external-link.sc-igloo-calendar:before{content:\"\\f1d2\"}.la-external-link-square.sc-igloo-calendar:before{content:\"\\f1d3\"}.la-eye.sc-igloo-calendar:before{content:\"\\f1d4\"}.la-eye-slash.sc-igloo-calendar:before{content:\"\\f1d5\"}.la-eyedropper.sc-igloo-calendar:before{content:\"\\f1d6\"}.la-facebook-f.sc-igloo-calendar:before,.la-facebook.sc-igloo-calendar:before{content:\"\\f1d7\"}.la-facebook-official.sc-igloo-calendar:before{content:\"\\f1d8\"}.la-facebook-square.sc-igloo-calendar:before{content:\"\\f1d9\"}.la-fast-backward.sc-igloo-calendar:before{content:\"\\f1da\"}.la-fast-forward.sc-igloo-calendar:before{content:\"\\f1db\"}.la-fax.sc-igloo-calendar:before{content:\"\\f1dc\"}.la-female.sc-igloo-calendar:before{content:\"\\f1dd\"}.la-fighter-jet.sc-igloo-calendar:before{content:\"\\f1de\"}.la-file.sc-igloo-calendar:before{content:\"\\f1df\"}.la-file-archive-o.sc-igloo-calendar:before{content:\"\\f1e0\"}.la-file-audio-o.sc-igloo-calendar:before{content:\"\\f1e1\"}.la-file-code-o.sc-igloo-calendar:before{content:\"\\f1e2\"}.la-file-excel-o.sc-igloo-calendar:before{content:\"\\f1e3\"}.la-file-image-o.sc-igloo-calendar:before{content:\"\\f1e4\"}.la-file-movie-o.sc-igloo-calendar:before{content:\"\\f1e5\"}.la-file-o.sc-igloo-calendar:before{content:\"\\f1e6\"}.la-file-pdf-o.sc-igloo-calendar:before{content:\"\\f1e7\"}.la-file-photo-o.sc-igloo-calendar:before{content:\"\\f1e8\"}.la-file-picture-o.sc-igloo-calendar:before{content:\"\\f1e9\"}.la-file-powerpoint-o.sc-igloo-calendar:before{content:\"\\f1ea\"}.la-file-sound-o.sc-igloo-calendar:before{content:\"\\f1eb\"}.la-file-text.sc-igloo-calendar:before{content:\"\\f1ec\"}.la-file-text-o.sc-igloo-calendar:before{content:\"\\f1ed\"}.la-file-video-o.sc-igloo-calendar:before{content:\"\\f1ee\"}.la-file-word-o.sc-igloo-calendar:before{content:\"\\f1ef\"}.la-file-zip-o.sc-igloo-calendar:before{content:\"\\f1f0\"}.la-files-o.sc-igloo-calendar:before{content:\"\\f1f1\"}.la-film.sc-igloo-calendar:before{content:\"\\f1f2\"}.la-filter.sc-igloo-calendar:before{content:\"\\f1f3\"}.la-fire.sc-igloo-calendar:before{content:\"\\f1f4\"}.la-fire-extinguisher.sc-igloo-calendar:before{content:\"\\f1f5\"}.la-firefox.sc-igloo-calendar:before{content:\"\\f1f6\"}.la-flag.sc-igloo-calendar:before{content:\"\\f1f7\"}.la-flag-checkered.sc-igloo-calendar:before{content:\"\\f1f8\"}.la-flag-o.sc-igloo-calendar:before{content:\"\\f1f9\"}.la-flash.sc-igloo-calendar:before{content:\"\\f1fa\"}.la-flask.sc-igloo-calendar:before{content:\"\\f1fb\"}.la-flickr.sc-igloo-calendar:before{content:\"\\f1fc\"}.la-floppy-o.sc-igloo-calendar:before{content:\"\\f1fd\"}.la-folder.sc-igloo-calendar:before{content:\"\\f1fe\"}.la-folder-o.sc-igloo-calendar:before{content:\"\\f1ff\"}.la-folder-open.sc-igloo-calendar:before{content:\"\\f200\"}.la-folder-open-o.sc-igloo-calendar:before{content:\"\\f201\"}.la-font.sc-igloo-calendar:before{content:\"\\f202\"}.la-fonticons.sc-igloo-calendar:before{content:\"\\f203\"}.la-forumbee.sc-igloo-calendar:before{content:\"\\f204\"}.la-forward.sc-igloo-calendar:before{content:\"\\f205\"}.la-foursquare.sc-igloo-calendar:before{content:\"\\f206\"}.la-frown-o.sc-igloo-calendar:before{content:\"\\f207\"}.la-futbol-o.sc-igloo-calendar:before,.la-soccer-ball-o.sc-igloo-calendar:before{content:\"\\f208\"}.la-gamepad.sc-igloo-calendar:before{content:\"\\f209\"}.la-gavel.sc-igloo-calendar:before{content:\"\\f20a\"}.la-gbp.sc-igloo-calendar:before{content:\"\\f20b\"}.la-gear.sc-igloo-calendar:before{content:\"\\f20c\"}.la-gears.sc-igloo-calendar:before{content:\"\\f20d\"}.la-genderless.sc-igloo-calendar:before{content:\"\\f20e\"}.la-get-pocket.sc-igloo-calendar:before{content:\"\\f20f\"}.la-gg.sc-igloo-calendar:before{content:\"\\f210\"}.la-gg-circle.sc-igloo-calendar:before{content:\"\\f211\"}.la-gift.sc-igloo-calendar:before{content:\"\\f212\"}.la-git.sc-igloo-calendar:before{content:\"\\f213\"}.la-git-square.sc-igloo-calendar:before{content:\"\\f214\"}.la-github.sc-igloo-calendar:before{content:\"\\f215\"}.la-github-alt.sc-igloo-calendar:before{content:\"\\f216\"}.la-github-square.sc-igloo-calendar:before{content:\"\\f217\"}.la-glass.sc-igloo-calendar:before{content:\"\\f218\"}.la-globe.sc-igloo-calendar:before{content:\"\\f219\"}.la-google.sc-igloo-calendar:before{content:\"\\f21a\"}.la-google-plus.sc-igloo-calendar:before{content:\"\\f21b\"}.la-google-plus-square.sc-igloo-calendar:before{content:\"\\f21c\"}.la-google-wallet.sc-igloo-calendar:before{content:\"\\f21d\"}.la-graduation-cap.sc-igloo-calendar:before{content:\"\\f21e\"}.la-gittip.sc-igloo-calendar:before,.la-gratipay.sc-igloo-calendar:before{content:\"\\f21f\"}.la-group.sc-igloo-calendar:before{content:\"\\f220\"}.la-h-square.sc-igloo-calendar:before{content:\"\\f221\"}.la-hacker-news.sc-igloo-calendar:before{content:\"\\f222\"}.la-hand-grab-o.sc-igloo-calendar:before{content:\"\\f223\"}.la-hand-lizard-o.sc-igloo-calendar:before{content:\"\\f224\"}.la-hand-o-down.sc-igloo-calendar:before{content:\"\\f225\"}.la-hand-o-left.sc-igloo-calendar:before{content:\"\\f226\"}.la-hand-o-right.sc-igloo-calendar:before{content:\"\\f227\"}.la-hand-o-up.sc-igloo-calendar:before{content:\"\\f228\"}.la-hand-paper-o.sc-igloo-calendar:before{content:\"\\f229\"}.la-hand-peace-o.sc-igloo-calendar:before{content:\"\\f22a\"}.la-hand-pointer-o.sc-igloo-calendar:before{content:\"\\f22b\"}.la-hand-rock-o.sc-igloo-calendar:before{content:\"\\f22c\"}.la-hand-scissors-o.sc-igloo-calendar:before{content:\"\\f22d\"}.la-hand-spock-o.sc-igloo-calendar:before{content:\"\\f22e\"}.la-hand-stop-o.sc-igloo-calendar:before{content:\"\\f22f\"}.la-hdd-o.sc-igloo-calendar:before{content:\"\\f230\"}.la-header.sc-igloo-calendar:before{content:\"\\f231\"}.la-headphones.sc-igloo-calendar:before{content:\"\\f232\"}.la-heart.sc-igloo-calendar:before{content:\"\\f233\"}.la-heart-o.sc-igloo-calendar:before{content:\"\\f234\"}.la-heartbeat.sc-igloo-calendar:before{content:\"\\f235\"}.la-history.sc-igloo-calendar:before{content:\"\\f236\"}.la-home.sc-igloo-calendar:before{content:\"\\f237\"}.la-hospital-o.sc-igloo-calendar:before{content:\"\\f238\"}.la-hotel.sc-igloo-calendar:before{content:\"\\f239\"}.la-hourglass.sc-igloo-calendar:before{content:\"\\f23a\"}.la-hourglass-1.sc-igloo-calendar:before{content:\"\\f23b\"}.la-hourglass-2.sc-igloo-calendar:before{content:\"\\f23c\"}.la-hourglass-3.sc-igloo-calendar:before{content:\"\\f23d\"}.la-hourglass-end.sc-igloo-calendar:before{content:\"\\f23e\"}.la-hourglass-half.sc-igloo-calendar:before{content:\"\\f23f\"}.la-hourglass-o.sc-igloo-calendar:before{content:\"\\f240\"}.la-hourglass-start.sc-igloo-calendar:before{content:\"\\f241\"}.la-houzz.sc-igloo-calendar:before{content:\"\\f242\"}.la-html5.sc-igloo-calendar:before{content:\"\\f243\"}.la-i-cursor.sc-igloo-calendar:before{content:\"\\f244\"}.la-ils.sc-igloo-calendar:before{content:\"\\f245\"}.la-image.sc-igloo-calendar:before{content:\"\\f246\"}.la-inbox.sc-igloo-calendar:before{content:\"\\f247\"}.la-indent.sc-igloo-calendar:before{content:\"\\f248\"}.la-industry.sc-igloo-calendar:before{content:\"\\f249\"}.la-info.sc-igloo-calendar:before{content:\"\\f24a\"}.la-info-circle.sc-igloo-calendar:before{content:\"\\f24b\"}.la-inr.sc-igloo-calendar:before{content:\"\\f24c\"}.la-instagram.sc-igloo-calendar:before{content:\"\\f24d\"}.la-institution.sc-igloo-calendar:before{content:\"\\f24e\"}.la-internet-explorer.sc-igloo-calendar:before{content:\"\\f24f\"}.la-ioxhost.sc-igloo-calendar:before{content:\"\\f250\"}.la-italic.sc-igloo-calendar:before{content:\"\\f251\"}.la-joomla.sc-igloo-calendar:before{content:\"\\f252\"}.la-jpy.sc-igloo-calendar:before{content:\"\\f253\"}.la-jsfiddle.sc-igloo-calendar:before{content:\"\\f254\"}.la-key.sc-igloo-calendar:before{content:\"\\f255\"}.la-keyboard-o.sc-igloo-calendar:before{content:\"\\f256\"}.la-krw.sc-igloo-calendar:before{content:\"\\f257\"}.la-language.sc-igloo-calendar:before{content:\"\\f258\"}.la-laptop.sc-igloo-calendar:before{content:\"\\f259\"}.la-lastfm.sc-igloo-calendar:before{content:\"\\f25a\"}.la-lastfm-square.sc-igloo-calendar:before{content:\"\\f25b\"}.la-leaf.sc-igloo-calendar:before{content:\"\\f25c\"}.la-leanpub.sc-igloo-calendar:before{content:\"\\f25d\"}.la-legal.sc-igloo-calendar:before{content:\"\\f25e\"}.la-lemon-o.sc-igloo-calendar:before{content:\"\\f25f\"}.la-level-down.sc-igloo-calendar:before{content:\"\\f260\"}.la-level-up.sc-igloo-calendar:before{content:\"\\f261\"}.la-life-bouy.sc-igloo-calendar:before{content:\"\\f262\"}.la-life-buoy.sc-igloo-calendar:before{content:\"\\f263\"}.la-life-ring.sc-igloo-calendar:before,.la-support.sc-igloo-calendar:before{content:\"\\f264\"}.la-life-saver.sc-igloo-calendar:before{content:\"\\f265\"}.la-lightbulb-o.sc-igloo-calendar:before{content:\"\\f266\"}.la-line-chart.sc-igloo-calendar:before{content:\"\\f267\"}.la-link.sc-igloo-calendar:before{content:\"\\f268\"}.la-linkedin.sc-igloo-calendar:before{content:\"\\f269\"}.la-linkedin-square.sc-igloo-calendar:before{content:\"\\f26a\"}.la-linux.sc-igloo-calendar:before{content:\"\\f26b\"}.la-list.sc-igloo-calendar:before{content:\"\\f26c\"}.la-list-alt.sc-igloo-calendar:before{content:\"\\f26d\"}.la-list-ol.sc-igloo-calendar:before{content:\"\\f26e\"}.la-list-ul.sc-igloo-calendar:before{content:\"\\f26f\"}.la-location-arrow.sc-igloo-calendar:before{content:\"\\f270\"}.la-lock.sc-igloo-calendar:before{content:\"\\f271\"}.la-long-arrow-down.sc-igloo-calendar:before{content:\"\\f272\"}.la-long-arrow-left.sc-igloo-calendar:before{content:\"\\f273\"}.la-long-arrow-right.sc-igloo-calendar:before{content:\"\\f274\"}.la-long-arrow-up.sc-igloo-calendar:before{content:\"\\f275\"}.la-magic.sc-igloo-calendar:before{content:\"\\f276\"}.la-magnet.sc-igloo-calendar:before{content:\"\\f277\"}.la-mail-forward.sc-igloo-calendar:before{content:\"\\f278\"}.la-mail-reply.sc-igloo-calendar:before{content:\"\\f279\"}.la-mail-reply-all.sc-igloo-calendar:before{content:\"\\f27a\"}.la-male.sc-igloo-calendar:before{content:\"\\f27b\"}.la-map.sc-igloo-calendar:before{content:\"\\f27c\"}.la-map-marker.sc-igloo-calendar:before{content:\"\\f27d\"}.la-map-o.sc-igloo-calendar:before{content:\"\\f27e\"}.la-map-pin.sc-igloo-calendar:before{content:\"\\f27f\"}.la-map-signs.sc-igloo-calendar:before{content:\"\\f280\"}.la-mars.sc-igloo-calendar:before{content:\"\\f281\"}.la-mars-double.sc-igloo-calendar:before{content:\"\\f282\"}.la-mars-stroke.sc-igloo-calendar:before{content:\"\\f283\"}.la-mars-stroke-h.sc-igloo-calendar:before{content:\"\\f284\"}.la-mars-stroke-v.sc-igloo-calendar:before{content:\"\\f285\"}.la-maxcdn.sc-igloo-calendar:before{content:\"\\f286\"}.la-meanpath.sc-igloo-calendar:before{content:\"\\f287\"}.la-medium.sc-igloo-calendar:before{content:\"\\f288\"}.la-medkit.sc-igloo-calendar:before{content:\"\\f289\"}.la-meh-o.sc-igloo-calendar:before{content:\"\\f28a\"}.la-mercury.sc-igloo-calendar:before{content:\"\\f28b\"}.la-microphone.sc-igloo-calendar:before{content:\"\\f28c\"}.la-microphone-slash.sc-igloo-calendar:before{content:\"\\f28d\"}.la-minus.sc-igloo-calendar:before{content:\"\\f28e\"}.la-minus-circle.sc-igloo-calendar:before{content:\"\\f28f\"}.la-minus-square.sc-igloo-calendar:before{content:\"\\f290\"}.la-minus-square-o.sc-igloo-calendar:before{content:\"\\f291\"}.la-mobile.sc-igloo-calendar:before{content:\"\\f292\"}.la-mobile-phone.sc-igloo-calendar:before{content:\"\\f293\"}.la-money.sc-igloo-calendar:before{content:\"\\f294\"}.la-moon-o.sc-igloo-calendar:before{content:\"\\f295\"}.la-mortar-board.sc-igloo-calendar:before{content:\"\\f296\"}.la-motorcycle.sc-igloo-calendar:before{content:\"\\f297\"}.la-mouse-pointer.sc-igloo-calendar:before{content:\"\\f298\"}.la-music.sc-igloo-calendar:before{content:\"\\f299\"}.la-navicon.sc-igloo-calendar:before{content:\"\\f29a\"}.la-neuter.sc-igloo-calendar:before{content:\"\\f29b\"}.la-newspaper-o.sc-igloo-calendar:before{content:\"\\f29c\"}.la-object-group.sc-igloo-calendar:before{content:\"\\f29d\"}.la-object-ungroup.sc-igloo-calendar:before{content:\"\\f29e\"}.la-odnoklassniki.sc-igloo-calendar:before{content:\"\\f29f\"}.la-odnoklassniki-square.sc-igloo-calendar:before{content:\"\\f2a0\"}.la-opencart.sc-igloo-calendar:before{content:\"\\f2a1\"}.la-openid.sc-igloo-calendar:before{content:\"\\f2a2\"}.la-opera.sc-igloo-calendar:before{content:\"\\f2a3\"}.la-optin-monster.sc-igloo-calendar:before{content:\"\\f2a4\"}.la-outdent.sc-igloo-calendar:before{content:\"\\f2a5\"}.la-pagelines.sc-igloo-calendar:before{content:\"\\f2a6\"}.la-paint-brush.sc-igloo-calendar:before{content:\"\\f2a7\"}.la-paper-plane.sc-igloo-calendar:before,.la-send.sc-igloo-calendar:before{content:\"\\f2a8\"}.la-paper-plane-o.sc-igloo-calendar:before,.la-send-o.sc-igloo-calendar:before{content:\"\\f2a9\"}.la-paperclip.sc-igloo-calendar:before{content:\"\\f2aa\"}.la-paragraph.sc-igloo-calendar:before{content:\"\\f2ab\"}.la-paste.sc-igloo-calendar:before{content:\"\\f2ac\"}.la-pause.sc-igloo-calendar:before{content:\"\\f2ad\"}.la-paw.sc-igloo-calendar:before{content:\"\\f2ae\"}.la-paypal.sc-igloo-calendar:before{content:\"\\f2af\"}.la-pencil.sc-igloo-calendar:before{content:\"\\f2b0\"}.la-pencil-square.sc-igloo-calendar:before{content:\"\\f2b1\"}.la-pencil-square-o.sc-igloo-calendar:before{content:\"\\f2b2\"}.la-phone.sc-igloo-calendar:before{content:\"\\f2b3\"}.la-phone-square.sc-igloo-calendar:before{content:\"\\f2b4\"}.la-photo.sc-igloo-calendar:before{content:\"\\f2b5\"}.la-picture-o.sc-igloo-calendar:before{content:\"\\f2b6\"}.la-pie-chart.sc-igloo-calendar:before{content:\"\\f2b7\"}.la-pied-piper.sc-igloo-calendar:before{content:\"\\f2b8\"}.la-pied-piper-alt.sc-igloo-calendar:before{content:\"\\f2b9\"}.la-pinterest.sc-igloo-calendar:before{content:\"\\f2ba\"}.la-pinterest-p.sc-igloo-calendar:before{content:\"\\f2bb\"}.la-pinterest-square.sc-igloo-calendar:before{content:\"\\f2bc\"}.la-plane.sc-igloo-calendar:before{content:\"\\f2bd\"}.la-play.sc-igloo-calendar:before{content:\"\\f2be\"}.la-play-circle.sc-igloo-calendar:before{content:\"\\f2bf\"}.la-play-circle-o.sc-igloo-calendar:before{content:\"\\f2c0\"}.la-plug.sc-igloo-calendar:before{content:\"\\f2c1\"}.la-plus.sc-igloo-calendar:before{content:\"\\f2c2\"}.la-plus-circle.sc-igloo-calendar:before{content:\"\\f2c3\"}.la-plus-square.sc-igloo-calendar:before{content:\"\\f2c4\"}.la-plus-square-o.sc-igloo-calendar:before{content:\"\\f2c5\"}.la-power-off.sc-igloo-calendar:before{content:\"\\f2c6\"}.la-print.sc-igloo-calendar:before{content:\"\\f2c7\"}.la-puzzle-piece.sc-igloo-calendar:before{content:\"\\f2c8\"}.la-qq.sc-igloo-calendar:before{content:\"\\f2c9\"}.la-qrcode.sc-igloo-calendar:before{content:\"\\f2ca\"}.la-question.sc-igloo-calendar:before{content:\"\\f2cb\"}.la-question-circle.sc-igloo-calendar:before{content:\"\\f2cc\"}.la-quote-left.sc-igloo-calendar:before{content:\"\\f2cd\"}.la-quote-right.sc-igloo-calendar:before{content:\"\\f2ce\"}.la-ra.sc-igloo-calendar:before{content:\"\\f2cf\"}.la-random.sc-igloo-calendar:before{content:\"\\f2d0\"}.la-rebel.sc-igloo-calendar:before{content:\"\\f2d1\"}.la-recycle.sc-igloo-calendar:before{content:\"\\f2d2\"}.la-reddit.sc-igloo-calendar:before{content:\"\\f2d3\"}.la-reddit-square.sc-igloo-calendar:before{content:\"\\f2d4\"}.la-refresh.sc-igloo-calendar:before{content:\"\\f2d5\"}.la-registered.sc-igloo-calendar:before{content:\"\\f2d6\"}.la-renren.sc-igloo-calendar:before{content:\"\\f2d7\"}.la-reorder.sc-igloo-calendar:before{content:\"\\f2d8\"}.la-repeat.sc-igloo-calendar:before{content:\"\\f2d9\"}.la-reply.sc-igloo-calendar:before{content:\"\\f2da\"}.la-reply-all.sc-igloo-calendar:before{content:\"\\f2db\"}.la-retweet.sc-igloo-calendar:before{content:\"\\f2dc\"}.la-rmb.sc-igloo-calendar:before{content:\"\\f2dd\"}.la-road.sc-igloo-calendar:before{content:\"\\f2de\"}.la-rocket.sc-igloo-calendar:before{content:\"\\f2df\"}.la-rotate-left.sc-igloo-calendar:before{content:\"\\f2e0\"}.la-rotate-right.sc-igloo-calendar:before{content:\"\\f2e1\"}.la-rouble.sc-igloo-calendar:before{content:\"\\f2e2\"}.la-feed.sc-igloo-calendar:before,.la-rss.sc-igloo-calendar:before{content:\"\\f2e3\"}.la-rss-square.sc-igloo-calendar:before{content:\"\\f2e4\"}.la-rub.sc-igloo-calendar:before{content:\"\\f2e5\"}.la-ruble.sc-igloo-calendar:before{content:\"\\f2e6\"}.la-rupee.sc-igloo-calendar:before{content:\"\\f2e7\"}.la-safari.sc-igloo-calendar:before{content:\"\\f2e8\"}.la-save.sc-igloo-calendar:before{content:\"\\f2e9\"}.la-scissors.sc-igloo-calendar:before{content:\"\\f2ea\"}.la-search.sc-igloo-calendar:before{content:\"\\f2eb\"}.la-search-minus.sc-igloo-calendar:before{content:\"\\f2ec\"}.la-search-plus.sc-igloo-calendar:before{content:\"\\f2ed\"}.la-sellsy.sc-igloo-calendar:before{content:\"\\f2ee\"}.la-server.sc-igloo-calendar:before{content:\"\\f2ef\"}.la-share.sc-igloo-calendar:before{content:\"\\f2f0\"}.la-share-alt.sc-igloo-calendar:before{content:\"\\f2f1\"}.la-share-alt-square.sc-igloo-calendar:before{content:\"\\f2f2\"}.la-share-square.sc-igloo-calendar:before{content:\"\\f2f3\"}.la-share-square-o.sc-igloo-calendar:before{content:\"\\f2f4\"}.la-shekel.sc-igloo-calendar:before{content:\"\\f2f5\"}.la-sheqel.sc-igloo-calendar:before{content:\"\\f2f6\"}.la-shield.sc-igloo-calendar:before{content:\"\\f2f7\"}.la-ship.sc-igloo-calendar:before{content:\"\\f2f8\"}.la-shirtsinbulk.sc-igloo-calendar:before{content:\"\\f2f9\"}.la-shopping-cart.sc-igloo-calendar:before{content:\"\\f2fa\"}.la-sign-in.sc-igloo-calendar:before{content:\"\\f2fb\"}.la-sign-out.sc-igloo-calendar:before{content:\"\\f2fc\"}.la-signal.sc-igloo-calendar:before{content:\"\\f2fd\"}.la-simplybuilt.sc-igloo-calendar:before{content:\"\\f2fe\"}.la-sitemap.sc-igloo-calendar:before{content:\"\\f2ff\"}.la-skyatlas.sc-igloo-calendar:before{content:\"\\f300\"}.la-skype.sc-igloo-calendar:before{content:\"\\f301\"}.la-slack.sc-igloo-calendar:before{content:\"\\f302\"}.la-sliders.sc-igloo-calendar:before{content:\"\\f303\"}.la-slideshare.sc-igloo-calendar:before{content:\"\\f304\"}.la-smile-o.sc-igloo-calendar:before{content:\"\\f305\"}.la-sort.sc-igloo-calendar:before,.la-unsorted.sc-igloo-calendar:before{content:\"\\f306\"}.la-sort-alpha-asc.sc-igloo-calendar:before{content:\"\\f307\"}.la-sort-alpha-desc.sc-igloo-calendar:before{content:\"\\f308\"}.la-sort-amount-asc.sc-igloo-calendar:before{content:\"\\f309\"}.la-sort-amount-desc.sc-igloo-calendar:before{content:\"\\f30a\"}.la-sort-asc.sc-igloo-calendar:before,.la-sort-up.sc-igloo-calendar:before{content:\"\\f30b\"}.la-sort-desc.sc-igloo-calendar:before,.la-sort-down.sc-igloo-calendar:before{content:\"\\f30c\"}.la-sort-numeric-asc.sc-igloo-calendar:before{content:\"\\f30d\"}.la-sort-numeric-desc.sc-igloo-calendar:before{content:\"\\f30e\"}.la-soundcloud.sc-igloo-calendar:before{content:\"\\f30f\"}.la-space-shuttle.sc-igloo-calendar:before{content:\"\\f310\"}.la-spinner.sc-igloo-calendar:before{content:\"\\f311\"}.la-spoon.sc-igloo-calendar:before{content:\"\\f312\"}.la-spotify.sc-igloo-calendar:before{content:\"\\f313\"}.la-square.sc-igloo-calendar:before{content:\"\\f314\"}.la-square-o.sc-igloo-calendar:before{content:\"\\f315\"}.la-stack-exchange.sc-igloo-calendar:before{content:\"\\f316\"}.la-stack-overflow.sc-igloo-calendar:before{content:\"\\f317\"}.la-star.sc-igloo-calendar:before{content:\"\\f318\"}.la-star-half.sc-igloo-calendar:before{content:\"\\f319\"}.la-star-half-empty.sc-igloo-calendar:before,.la-star-half-full.sc-igloo-calendar:before,.la-star-half-o.sc-igloo-calendar:before{content:\"\\f31a\"}.la-star-o.sc-igloo-calendar:before{content:\"\\f31b\"}.la-steam.sc-igloo-calendar:before{content:\"\\f31c\"}.la-steam-square.sc-igloo-calendar:before{content:\"\\f31d\"}.la-step-backward.sc-igloo-calendar:before{content:\"\\f31e\"}.la-step-forward.sc-igloo-calendar:before{content:\"\\f31f\"}.la-stethoscope.sc-igloo-calendar:before{content:\"\\f320\"}.la-sticky-note.sc-igloo-calendar:before{content:\"\\f321\"}.la-sticky-note-o.sc-igloo-calendar:before{content:\"\\f322\"}.la-stop.sc-igloo-calendar:before{content:\"\\f323\"}.la-street-view.sc-igloo-calendar:before{content:\"\\f324\"}.la-strikethrough.sc-igloo-calendar:before{content:\"\\f325\"}.la-stumbleupon.sc-igloo-calendar:before{content:\"\\f326\"}.la-stumbleupon-circle.sc-igloo-calendar:before{content:\"\\f327\"}.la-subscript.sc-igloo-calendar:before{content:\"\\f328\"}.la-subway.sc-igloo-calendar:before{content:\"\\f329\"}.la-suitcase.sc-igloo-calendar:before{content:\"\\f32a\"}.la-sun-o.sc-igloo-calendar:before{content:\"\\f32b\"}.la-superscript.sc-igloo-calendar:before{content:\"\\f32c\"}.la-table.sc-igloo-calendar:before{content:\"\\f32d\"}.la-tablet.sc-igloo-calendar:before{content:\"\\f32e\"}.la-tachometer.sc-igloo-calendar:before{content:\"\\f32f\"}.la-tag.sc-igloo-calendar:before{content:\"\\f330\"}.la-tags.sc-igloo-calendar:before{content:\"\\f331\"}.la-tasks.sc-igloo-calendar:before{content:\"\\f332\"}.la-taxi.sc-igloo-calendar:before{content:\"\\f333\"}.la-television.sc-igloo-calendar:before,.la-tv.sc-igloo-calendar:before{content:\"\\f334\"}.la-tencent-weibo.sc-igloo-calendar:before{content:\"\\f335\"}.la-terminal.sc-igloo-calendar:before{content:\"\\f336\"}.la-text-height.sc-igloo-calendar:before{content:\"\\f337\"}.la-text-width.sc-igloo-calendar:before{content:\"\\f338\"}.la-th.sc-igloo-calendar:before{content:\"\\f339\"}.la-th-large.sc-igloo-calendar:before{content:\"\\f33a\"}.la-th-list.sc-igloo-calendar:before{content:\"\\f33b\"}.la-thumb-tack.sc-igloo-calendar:before{content:\"\\f33c\"}.la-thumbs-down.sc-igloo-calendar:before{content:\"\\f33d\"}.la-thumbs-o-down.sc-igloo-calendar:before{content:\"\\f33e\"}.la-thumbs-o-up.sc-igloo-calendar:before{content:\"\\f33f\"}.la-thumbs-up.sc-igloo-calendar:before{content:\"\\f340\"}.la-ticket.sc-igloo-calendar:before{content:\"\\f341\"}.la-remove.sc-igloo-calendar:before,.la-times.sc-igloo-calendar:before{content:\"\\f342\"}.la-times-circle.sc-igloo-calendar:before{content:\"\\f343\"}.la-times-circle-o.sc-igloo-calendar:before{content:\"\\f344\"}.la-tint.sc-igloo-calendar:before{content:\"\\f345\"}.la-toggle-off.sc-igloo-calendar:before{content:\"\\f346\"}.la-toggle-on.sc-igloo-calendar:before{content:\"\\f347\"}.la-trademark.sc-igloo-calendar:before{content:\"\\f348\"}.la-train.sc-igloo-calendar:before{content:\"\\f349\"}.la-intersex.sc-igloo-calendar:before,.la-transgender.sc-igloo-calendar:before{content:\"\\f34a\"}.la-transgender-alt.sc-igloo-calendar:before{content:\"\\f34b\"}.la-trash.sc-igloo-calendar:before{content:\"\\f34c\"}.la-trash-o.sc-igloo-calendar:before{content:\"\\f34d\"}.la-tree.sc-igloo-calendar:before{content:\"\\f34e\"}.la-trello.sc-igloo-calendar:before{content:\"\\f34f\"}.la-tripadvisor.sc-igloo-calendar:before{content:\"\\f350\"}.la-trophy.sc-igloo-calendar:before{content:\"\\f351\"}.la-truck.sc-igloo-calendar:before{content:\"\\f352\"}.la-try.sc-igloo-calendar:before{content:\"\\f353\"}.la-tty.sc-igloo-calendar:before{content:\"\\f354\"}.la-tumblr.sc-igloo-calendar:before{content:\"\\f355\"}.la-tumblr-square.sc-igloo-calendar:before{content:\"\\f356\"}.la-turkish-lira.sc-igloo-calendar:before{content:\"\\f357\"}.la-twitch.sc-igloo-calendar:before{content:\"\\f358\"}.la-twitter.sc-igloo-calendar:before{content:\"\\f359\"}.la-twitter-square.sc-igloo-calendar:before{content:\"\\f35a\"}.la-umbrella.sc-igloo-calendar:before{content:\"\\f35b\"}.la-underline.sc-igloo-calendar:before{content:\"\\f35c\"}.la-undo.sc-igloo-calendar:before{content:\"\\f35d\"}.la-university.sc-igloo-calendar:before{content:\"\\f35e\"}.la-unlink.sc-igloo-calendar:before{content:\"\\f35f\"}.la-unlock.sc-igloo-calendar:before{content:\"\\f360\"}.la-unlock-alt.sc-igloo-calendar:before{content:\"\\f361\"}.la-upload.sc-igloo-calendar:before{content:\"\\f362\"}.la-usd.sc-igloo-calendar:before{content:\"\\f363\"}.la-user.sc-igloo-calendar:before{content:\"\\f364\"}.la-user-md.sc-igloo-calendar:before{content:\"\\f365\"}.la-user-plus.sc-igloo-calendar:before{content:\"\\f366\"}.la-user-secret.sc-igloo-calendar:before{content:\"\\f367\"}.la-user-times.sc-igloo-calendar:before{content:\"\\f368\"}.la-users.sc-igloo-calendar:before{content:\"\\f369\"}.la-venus.sc-igloo-calendar:before{content:\"\\f36a\"}.la-venus-double.sc-igloo-calendar:before{content:\"\\f36b\"}.la-venus-mars.sc-igloo-calendar:before{content:\"\\f36c\"}.la-viacoin.sc-igloo-calendar:before{content:\"\\f36d\"}.la-video-camera.sc-igloo-calendar:before{content:\"\\f36e\"}.la-vimeo.sc-igloo-calendar:before{content:\"\\f36f\"}.la-vimeo-square.sc-igloo-calendar:before{content:\"\\f370\"}.la-vine.sc-igloo-calendar:before{content:\"\\f371\"}.la-vk.sc-igloo-calendar:before{content:\"\\f372\"}.la-volume-down.sc-igloo-calendar:before{content:\"\\f373\"}.la-volume-off.sc-igloo-calendar:before{content:\"\\f374\"}.la-volume-up.sc-igloo-calendar:before{content:\"\\f375\"}.la-warning.sc-igloo-calendar:before{content:\"\\f376\"}.la-wechat.sc-igloo-calendar:before{content:\"\\f377\"}.la-weibo.sc-igloo-calendar:before{content:\"\\f378\"}.la-weixin.sc-igloo-calendar:before{content:\"\\f379\"}.la-whatsapp.sc-igloo-calendar:before{content:\"\\f37a\"}.la-wheelchair.sc-igloo-calendar:before{content:\"\\f37b\"}.la-wifi.sc-igloo-calendar:before{content:\"\\f37c\"}.la-wikipedia-w.sc-igloo-calendar:before{content:\"\\f37d\"}.la-windows.sc-igloo-calendar:before{content:\"\\f37e\"}.la-won.sc-igloo-calendar:before{content:\"\\f37f\"}.la-wordpress.sc-igloo-calendar:before{content:\"\\f380\"}.la-wrench.sc-igloo-calendar:before{content:\"\\f381\"}.la-xing.sc-igloo-calendar:before{content:\"\\f382\"}.la-xing-square.sc-igloo-calendar:before{content:\"\\f383\"}.la-y-combinator.sc-igloo-calendar:before{content:\"\\f384\"}.la-y-combinator-square.sc-igloo-calendar:before{content:\"\\f385\"}.la-yahoo.sc-igloo-calendar:before{content:\"\\f386\"}.la-yc.sc-igloo-calendar:before{content:\"\\f387\"}.la-yc-square.sc-igloo-calendar:before{content:\"\\f388\"}.la-yelp.sc-igloo-calendar:before{content:\"\\f389\"}.la-yen.sc-igloo-calendar:before{content:\"\\f38a\"}.la-youtube.sc-igloo-calendar:before{content:\"\\f38b\"}.la-youtube-play.sc-igloo-calendar:before{content:\"\\f38c\"}.la-youtube-square.sc-igloo-calendar:before{content:\"\\f38d\"}.sc-igloo-calendar-h{display:block;position:relative;background-color:#ffffff;height:100%;text-align:center}.igl-calendar.sc-igloo-calendar{display:grid;grid-template-columns:1fr;height:100%}.calendarScrollContainer.sc-igloo-calendar div.sc-igloo-calendar{position:relative}.calendarScrollContainer.sc-igloo-calendar{width:100%;height:100%;overflow:auto;position:relative;white-space:nowrap;border-left:2px solid grey}.showToBeAssigned.sc-igloo-calendar,.showLegend.sc-igloo-calendar{grid-template-columns:330px 1fr}#calendarContainer.sc-igloo-calendar{position:absolute}div.sc-igloo-calendar{position:relative}.legendContainer.sc-igloo-calendar,.tobeAssignedContainer.sc-igloo-calendar{display:none;height:100%;overflow-y:auto;padding-left:0.5em !important;padding-right:0.5em !important}.showToBeAssigned.sc-igloo-calendar .tobeAssignedContainer.sc-igloo-calendar{display:block}.showLegend.sc-igloo-calendar .legendContainer.sc-igloo-calendar{display:block}.tobeBooked.sc-igloo-calendar{padding-top:8px;padding-bottom:8px;text-align:left}";

const IglooCalendar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dragOverHighlightElement = createEvent(this, "dragOverHighlightElement", 7);
    this.moveBookingTo = createEvent(this, "moveBookingTo", 7);
    this.calculateUnassignedDates = createEvent(this, "calculateUnassignedDates", 7);
    this.reduceAvailableUnitEvent = createEvent(this, "reduceAvailableUnitEvent", 7);
    this.revertBooking = createEvent(this, "revertBooking", 7);
    this.bookingService = new BookingService();
    this.countryNodeList = [];
    this.visibleCalendarCells = { x: [], y: [] };
    this.today = '';
    this.roomService = new RoomService();
    this.eventsService = new EventsService();
    this.toBeAssignedService = new ToBeAssignedService();
    this.reachedEndOfCalendar = false;
    this.scrollViewDragPos = { top: 0, left: 0, x: 0, y: 0 };
    this.onScrollContentMoveHandler = (event) => {
      // How far the mouse has been moved
      const dx = event.clientX - this.scrollViewDragPos.x;
      const dy = event.clientY - this.scrollViewDragPos.y;
      // Scroll the element
      this.scrollContainer.scrollTop = this.scrollViewDragPos.top - dy;
      this.scrollContainer.scrollLeft = this.scrollViewDragPos.left - dx;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        this.scrollViewDragging = true;
      }
    };
    this.onScrollContentMoveEndHandler = () => {
      document.removeEventListener('mousemove', this.onScrollContentMoveHandler);
      document.removeEventListener('mouseup', this.onScrollContentMoveEndHandler);
    };
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.loadingMessage = undefined;
    this.currencyName = undefined;
    this.ticket = '';
    this.calendarData = new Object();
    this.days = new Array();
    this.scrollViewDragging = false;
    this.dialogData = null;
    this.bookingItem = null;
    this.editBookingItem = null;
    this.showLegend = false;
    this.showPaymentDetails = false;
    this.showToBeAssigned = false;
    this.unassignedDates = {};
    this.roomNightsData = null;
    this.renderAgain = false;
    this.showBookProperty = false;
    this.totalAvailabilityQueue = [];
  }
  ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  setUpCalendarData(roomResp, bookingResp) {
    this.calendarData.currency = roomResp['My_Result'].currency;
    this.calendarData.allowedBookingSources = roomResp['My_Result'].allowed_booking_sources;
    this.calendarData.adultChildConstraints = roomResp['My_Result'].adult_child_constraints;
    this.calendarData.legendData = this.getLegendData(roomResp);
    this.calendarData.is_vacation_rental = roomResp['My_Result'].is_vacation_rental;
    this.calendarData.startingDate = new Date(bookingResp.My_Params_Get_Rooming_Data.FROM).getTime();
    this.calendarData.endingDate = new Date(bookingResp.My_Params_Get_Rooming_Data.TO).getTime();
    this.calendarData.formattedLegendData = formatLegendColors(this.calendarData.legendData);
    let bookings = bookingResp.myBookings || [];
    bookings = bookings.filter(bookingEvent => {
      const toDate = hooks(bookingEvent.TO_DATE, 'YYYY-MM-DD');
      const fromDate = hooks(bookingEvent.FROM_DATE, 'YYYY-MM-DD');
      return !toDate.isSame(fromDate);
    });
    this.calendarData.bookingEvents = bookings;
    this.calendarData.toBeAssignedEvents = [];
  }
  async initializeApp() {
    try {
      const [_, roomResp, bookingResp, countryNodeList] = await Promise.all([
        this.roomService.fetchLanguage(this.language),
        this.roomService.fetchData(this.propertyid, this.language),
        this.bookingService.getCalendarData(this.propertyid, this.from_date, this.to_date),
        this.bookingService.getCountries(this.language),
      ]);
      calendar_dates.days = bookingResp.days;
      calendar_dates.months = bookingResp.months;
      this.setRoomsData(roomResp);
      this.countryNodeList = countryNodeList;
      this.setUpCalendarData(roomResp, bookingResp);
      let paymentMethods = roomResp['My_Result']['allowed_payment_methods'];
      this.showPaymentDetails = paymentMethods.some(item => item.code === '001' || item.code === '004');
      this.updateBookingEventsDateRange(this.calendarData.bookingEvents);
      this.updateBookingEventsDateRange(this.calendarData.toBeAssignedEvents);
      this.today = this.transformDateForScroll(new Date());
      let startingDay = new Date(this.calendarData.startingDate);
      startingDay.setHours(0, 0, 0, 0);
      this.days = bookingResp.days;
      this.calendarData.days = this.days;
      this.calendarData.monthsInfo = bookingResp.months;
      setTimeout(() => {
        this.scrollToElement(this.today);
      }, 200);
      if (!this.calendarData.is_vacation_rental) {
        const data = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date()), this.to_date);
        this.unassignedDates = { fromDate: this.from_date, toDate: this.to_date, data: Object.assign(Object.assign({}, this.unassignedDates), data) };
        this.calendarData = Object.assign(Object.assign({}, this.calendarData), { unassignedDates: data });
      }
      this.socket = lookup('https://realtime.igloorooms.com/');
      this.socket.on('MSG', async (msg) => {
        let msgAsObject = JSON.parse(msg);
        if (msgAsObject) {
          const { REASON, KEY, PAYLOAD } = msgAsObject;
          if (KEY.toString() === this.propertyid.toString()) {
            let result;
            if (REASON === 'DELETE_CALENDAR_POOL' || REASON === 'GET_UNASSIGNED_DATES') {
              result = PAYLOAD;
            }
            else {
              result = JSON.parse(PAYLOAD);
            }
            console.log(result, REASON);
            const resasons = ['DORESERVATION', 'BLOCK_EXPOSED_UNIT', 'ASSIGN_EXPOSED_ROOM', 'REALLOCATE_EXPOSED_ROOM_BLOCK'];
            if (resasons.includes(REASON)) {
              let transformedBooking;
              if (REASON === 'BLOCK_EXPOSED_UNIT' || REASON === 'REALLOCATE_EXPOSED_ROOM_BLOCK') {
                transformedBooking = [await transformNewBLockedRooms(result)];
              }
              else {
                transformedBooking = transformNewBooking(result);
              }
              this.AddOrUpdateRoomBookings(transformedBooking, undefined);
            }
            else if (REASON === 'DELETE_CALENDAR_POOL') {
              this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: this.calendarData.bookingEvents.filter(e => e.POOL !== result) });
            }
            else if (REASON === 'GET_UNASSIGNED_DATES') {
              function parseDateRange(str) {
                const result = {};
                const pairs = str.split('|');
                pairs.forEach(pair => {
                  const res = pair.split(':');
                  result[res[0]] = res[1];
                });
                return result;
              }
              const parsedResult = parseDateRange(result);
              if (!this.calendarData.is_vacation_rental &&
                new Date(parsedResult.FROM_DATE).getTime() >= this.calendarData.startingDate &&
                new Date(parsedResult.TO_DATE).getTime() <= this.calendarData.endingDate) {
                const data = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date(parsedResult.FROM_DATE)), dateToFormattedString(new Date(parsedResult.TO_DATE)));
                this.calendarData.unassignedDates = Object.assign(Object.assign({}, this.calendarData.unassignedDates), data);
                this.unassignedDates = {
                  fromDate: dateToFormattedString(new Date(parsedResult.FROM_DATE)),
                  toDate: dateToFormattedString(new Date(parsedResult.TO_DATE)),
                  data,
                };
                if (Object.keys(data).length === 0) {
                  this.reduceAvailableUnitEvent.emit({
                    fromDate: dateToFormattedString(new Date(parsedResult.FROM_DATE)),
                    toDate: dateToFormattedString(new Date(parsedResult.TO_DATE)),
                  });
                }
              }
            }
            else if (REASON === 'UPDATE_CALENDAR_AVAILABILITY') {
              this.totalAvailabilityQueue.push(result);
              if (this.totalAvailabilityQueue.length > 0) {
                clearTimeout(this.availabilityTimeout);
              }
              this.availabilityTimeout = setTimeout(() => {
                this.updateTotalAvailability();
              }, 1000);
              console.log(result);
            }
            else if (REASON === 'CHANGE_IN_DUE_AMOUNT') {
              this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: [
                  ...this.calendarData.bookingEvents.map(event => {
                    if (result.pools.includes(event.ID)) {
                      return Object.assign(Object.assign({}, event), { BALANCE: result.due_amount });
                    }
                    return event;
                  }),
                ] });
            }
            else if (REASON === 'CHANGE_IN_BOOK_STATUS') {
              this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: [
                  ...this.calendarData.bookingEvents.map(event => {
                    if (result.pools.includes(event.ID)) {
                      return Object.assign(Object.assign({}, event), { STATUS: event.STATUS !== 'IN-HOUSE' ? bookingStatus[result.status_code] : result.status_code === '001' ? bookingStatus[result.status_code] : 'IN-HOUSE' });
                    }
                    return event;
                  }),
                ] });
            }
            else {
              return;
            }
          }
        }
      });
    }
    catch (error) {
      console.log('Initializing Calendar Error', error);
    }
  }
  updateTotalAvailability() {
    let days = [...calendar_dates.days];
    this.totalAvailabilityQueue.forEach(queue => {
      let selectedDate = new Date(queue.date);
      selectedDate.setMilliseconds(0);
      selectedDate.setSeconds(0);
      selectedDate.setMinutes(0);
      selectedDate.setHours(0);
      //find the selected day
      const index = days.findIndex(day => day.currentDate === selectedDate.getTime());
      if (index > 0) {
        //find room_type_id
        const room_type_index = days[index].rate.findIndex(room => room.id === queue.room_type_id);
        if (room_type_index > 0) {
          days[index].rate[room_type_index].exposed_inventory.rts = queue.availability;
        }
      }
    });
    calendar_dates.days = [...days];
  }
  componentDidLoad() {
    this.scrollToElement(this.today);
  }
  async handleDeleteEvent(ev) {
    try {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      await this.eventsService.deleteEvent(ev.detail);
    }
    catch (error) {
      //toastr.error(error);
    }
  }
  checkBookingAvailability(data) {
    return this.calendarData.bookingEvents.some(booking => booking.ID === data.ID || (booking.FROM_DATE === data.FROM_DATE && booking.TO_DATE === data.TO_DATE && booking.PR_ID === data.PR_ID));
  }
  updateBookingEventsDateRange(eventData) {
    const now = hooks();
    eventData.forEach(bookingEvent => {
      bookingEvent.legendData = this.calendarData.formattedLegendData;
      bookingEvent.defaultDateRange = {};
      bookingEvent.defaultDateRange.fromDate = new Date(bookingEvent.FROM_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.fromDateStr = this.getDateStr(bookingEvent.defaultDateRange.fromDate);
      bookingEvent.defaultDateRange.fromDateTimeStamp = bookingEvent.defaultDateRange.fromDate.getTime();
      bookingEvent.defaultDateRange.toDate = new Date(bookingEvent.TO_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.toDateStr = this.getDateStr(bookingEvent.defaultDateRange.toDate);
      bookingEvent.defaultDateRange.toDateTimeStamp = bookingEvent.defaultDateRange.toDate.getTime();
      bookingEvent.defaultDateRange.dateDifference = bookingEvent.NO_OF_DAYS;
      bookingEvent.roomsInfo = [...this.calendarData.roomsInfo];
      if (!isBlockUnit(bookingEvent.STATUS_CODE)) {
        const toDate = hooks(bookingEvent.TO_DATE, 'YYYY-MM-DD');
        const fromDate = hooks(bookingEvent.FROM_DATE, 'YYYY-MM-DD');
        if (bookingEvent.STATUS !== 'PENDING') {
          if (fromDate.isSame(now, 'day') && now.hour() >= 12) {
            bookingEvent.STATUS = bookingStatus['000'];
          }
          else if (now.isAfter(fromDate, 'day') && now.isBefore(toDate, 'day')) {
            bookingEvent.STATUS = bookingStatus['000'];
          }
          else if (toDate.isSame(now, 'day') && now.hour() < 12) {
            bookingEvent.STATUS = bookingStatus['000'];
          }
          else if ((toDate.isSame(now, 'day') && now.hour() >= 12) || toDate.isBefore(now, 'day')) {
            bookingEvent.STATUS = bookingStatus['003'];
          }
        }
      }
    });
  }
  setRoomsData(roomServiceResp) {
    var _a, _b;
    let roomsData = new Array();
    if ((_b = (_a = roomServiceResp.My_Result) === null || _a === void 0 ? void 0 : _a.roomtypes) === null || _b === void 0 ? void 0 : _b.length) {
      roomsData = roomServiceResp.My_Result.roomtypes;
      roomServiceResp.My_Result.roomtypes.forEach(roomCategory => {
        roomCategory.expanded = true;
      });
    }
    calendar_data.roomsInfo = roomsData;
    this.calendarData.roomsInfo = roomsData;
  }
  getLegendData(aData) {
    return aData['My_Result'].calendar_legends;
  }
  getDateStr(date, locale = 'default') {
    return date.getDate() + ' ' + date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  scrollToElement(goToDate) {
    this.scrollContainer = this.scrollContainer || this.element.querySelector('.calendarScrollContainer');
    const topLeftCell = this.element.querySelector('.topLeftCell');
    const gotoDay = this.element.querySelector('.day-' + goToDate);
    if (gotoDay) {
      this.scrollContainer.scrollTo({ left: 0 });
      const gotoRect = gotoDay.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const topLeftCellRect = topLeftCell.getBoundingClientRect();
      this.scrollContainer.scrollTo({
        left: gotoRect.left - containerRect.left - topLeftCellRect.width - gotoRect.width,
      });
    }
  }
  AddOrUpdateRoomBookings(data, pool) {
    let bookings = [...this.calendarData.bookingEvents];
    data.forEach(d => {
      if (!this.checkBookingAvailability(d)) {
        bookings = bookings.filter(booking => booking.ID !== d.ID);
      }
    });
    this.updateBookingEventsDateRange(data);
    if (pool) {
      bookings = bookings.filter(booking => booking.POOL === pool);
    }
    data.forEach(d => {
      if (!bookings.some(booking => booking.ID === d.ID)) {
        bookings.push(d);
      }
    });
    this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: bookings });
  }
  transformDateForScroll(date) {
    return hooks(date).format('D_M_YYYY');
  }
  scrollPageToRoom(event) {
    let targetScrollClass = event.detail.refClass;
    this.scrollContainer = this.scrollContainer || this.element.querySelector('.calendarScrollContainer');
    const topLeftCell = this.element.querySelector('.topLeftCell');
    const gotoRoom = this.element.querySelector('.' + targetScrollClass);
    if (gotoRoom) {
      this.scrollContainer.scrollTo({ top: 0 });
      const gotoRect = gotoRoom.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const topLeftCellRect = topLeftCell.getBoundingClientRect();
      this.scrollContainer.scrollTo({
        top: gotoRect.top - containerRect.top - topLeftCellRect.height - gotoRect.height,
      });
    }
  }
  handleShowDialog(event) {
    this.dialogData = event.detail;
    let modal = this.element.querySelector('ir-modal');
    if (modal) {
      modal.openModal();
    }
  }
  handleShowRoomNightsDialog(event) {
    this.roomNightsData = event.detail;
  }
  handleBookingDatasChange(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    let bookings = [...this.calendarData.bookingEvents];
    bookings = bookings.filter(bookingEvent => bookingEvent.ID !== 'NEW_TEMP_EVENT');
    bookings.push(...event.detail.filter(ev => ev.STATUS === 'PENDING-CONFIRMATION'));
    this.updateBookingEventsDateRange(event.detail);
    this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: bookings });
  }
  shouldRenderCalendarView() {
    // console.log("rendering...")
    return this.calendarData && this.calendarData.days && this.calendarData.days.length;
  }
  onOptionSelect(event) {
    const opt = event.detail;
    const calendarElement = this.element.querySelector('#iglooCalendar');
    switch (opt.key) {
      case 'showAssigned':
        calendarElement.classList.remove('showLegend');
        calendarElement.classList.remove('showToBeAssigned');
        calendarElement.classList.toggle('showToBeAssigned');
        this.showLegend = false;
        this.showToBeAssigned = true;
        break;
      case 'showLegend':
        calendarElement.classList.remove('showToBeAssigned');
        calendarElement.classList.remove('showLegend');
        calendarElement.classList.toggle('showLegend');
        this.showLegend = true;
        this.showToBeAssigned = false;
        break;
      case 'calendar':
        if (opt.data.start !== undefined && opt.data.end !== undefined) {
          this.handleDateSearch(opt.data);
        }
        else {
          let dt = new Date(opt.data);
          this.scrollToElement(dt.getDate() + '_' + (dt.getMonth() + 1) + '_' + dt.getFullYear());
        }
        break;
      case 'search':
        break;
      case 'add':
        //console.log('data:', opt.data);
        if (opt.data.event_type !== 'EDIT_BOOKING') {
          this.bookingItem = opt.data;
        }
        else {
          this.editBookingItem = opt.data;
        }
        break;
      case 'gotoToday':
        this.scrollToElement(this.today);
        break;
      case 'closeSideMenu':
        this.closeSideMenu();
        this.showBookProperty = false;
        break;
    }
  }
  async addDatesToCalendar(fromDate, toDate) {
    const results = await this.bookingService.getCalendarData(this.propertyid, fromDate, toDate);
    const newBookings = results.myBookings || [];
    this.updateBookingEventsDateRange(newBookings);
    if (new Date(fromDate).getTime() < new Date(this.calendarData.startingDate).getTime()) {
      this.calendarData.startingDate = new Date(fromDate).getTime();
      this.days = [...results.days, ...this.days];
      let newMonths = [...results.months];
      if (this.calendarData.monthsInfo[0].monthName === results.months[results.months.length - 1].monthName) {
        this.calendarData.monthsInfo[0].daysCount = this.calendarData.monthsInfo[0].daysCount + results.months[results.months.length - 1].daysCount;
        newMonths.pop();
      }
      let bookings = JSON.parse(JSON.stringify(newBookings));
      bookings = bookings.filter(newBooking => {
        const existingBookingIndex = this.calendarData.bookingEvents.findIndex(event => event.ID === newBooking.ID);
        if (existingBookingIndex !== -1) {
          this.calendarData.bookingEvents[existingBookingIndex].FROM_DATE = newBooking.FROM_DATE;
          this.calendarData.bookingEvents[existingBookingIndex].NO_OF_DAYS = calculateDaysBetweenDates(newBooking.FROM_DATE, this.calendarData.bookingEvents[existingBookingIndex].TO_DATE);
          return false;
        }
        return true;
      });
      calendar_dates.days = this.days;
      this.calendarData = Object.assign(Object.assign({}, this.calendarData), { days: this.days, monthsInfo: [...newMonths, ...this.calendarData.monthsInfo], bookingEvents: [...this.calendarData.bookingEvents, ...bookings] });
    }
    else {
      this.calendarData.endingDate = new Date(toDate).getTime();
      let newMonths = [...results.months];
      this.days = [...this.days, ...results.days];
      if (this.calendarData.monthsInfo[this.calendarData.monthsInfo.length - 1].monthName === results.months[0].monthName) {
        this.calendarData.monthsInfo[this.calendarData.monthsInfo.length - 1].daysCount =
          this.calendarData.monthsInfo[this.calendarData.monthsInfo.length - 1].daysCount + results.months[0].daysCount;
        newMonths.shift();
      }
      let bookings = JSON.parse(JSON.stringify(newBookings));
      bookings = bookings.filter(newBooking => {
        const existingBookingIndex = this.calendarData.bookingEvents.findIndex(event => event.ID === newBooking.ID);
        if (existingBookingIndex !== -1) {
          this.calendarData.bookingEvents[existingBookingIndex].TO_DATE = newBooking.TO_DATE;
          this.calendarData.bookingEvents[existingBookingIndex].NO_OF_DAYS = calculateDaysBetweenDates(this.calendarData.bookingEvents[existingBookingIndex].FROM_DATE, newBooking.TO_DATE);
          return false;
        }
        return true;
      });
      calendar_dates.days = this.days;
      //calendar_dates.months = bookingResp.months;
      this.calendarData = Object.assign(Object.assign({}, this.calendarData), { days: this.days, monthsInfo: [...this.calendarData.monthsInfo, ...newMonths], bookingEvents: [...this.calendarData.bookingEvents, ...newBookings] });
    }
    const data = await this.toBeAssignedService.getUnassignedDates(this.propertyid, fromDate, toDate);
    this.calendarData.unassignedDates = Object.assign(Object.assign({}, this.calendarData.unassignedDates), data);
    this.unassignedDates = {
      fromDate,
      toDate,
      data,
    };
  }
  async handleDateSearch(dates) {
    const startDate = hooks(dates.start).toDate();
    const defaultFromDate = hooks(this.from_date).toDate();
    const endDate = dates.end.toDate();
    const defaultToDate = this.calendarData.endingDate;
    if (startDate.getTime() < new Date(this.from_date).getTime()) {
      await this.addDatesToCalendar(hooks(startDate).add(-1, 'days').format('YYYY-MM-DD'), hooks(this.from_date).add(-1, 'days').format('YYYY-MM-DD'));
      this.scrollToElement(this.transformDateForScroll(startDate));
    }
    else if (startDate.getTime() > defaultFromDate.getTime() && startDate.getTime() < defaultToDate && endDate.getTime() < defaultToDate) {
      this.scrollToElement(this.transformDateForScroll(startDate));
    }
    else if (startDate.getTime() > defaultToDate) {
      const nextDay = getNextDay(new Date(this.calendarData.endingDate));
      await this.addDatesToCalendar(nextDay, hooks(endDate).add(2, 'months').format('YYYY-MM-DD'));
      this.scrollToElement(this.transformDateForScroll(startDate));
    }
  }
  closeSideMenu() {
    const calendarElement = this.element.querySelector('#iglooCalendar');
    calendarElement.classList.remove('showToBeAssigned');
    calendarElement.classList.remove('showLegend');
    this.showLegend = false;
    this.showToBeAssigned = false;
  }
  dragScrollContent(event) {
    this.scrollViewDragging = false;
    let isPreventPageScroll = event && event.target ? this.hasAncestorWithClass(event.target, 'preventPageScroll') : false;
    if (!isPreventPageScroll) {
      this.scrollViewDragPos = {
        // The current scroll
        left: this.scrollContainer.scrollLeft,
        top: this.scrollContainer.scrollTop,
        // Get the current mouse position
        x: event.clientX,
        y: event.clientY,
      };
      document.addEventListener('mousemove', this.onScrollContentMoveHandler);
      document.addEventListener('mouseup', this.onScrollContentMoveEndHandler);
    }
  }
  calendarScrolling() {
    if (this.scrollContainer) {
      const containerRect = this.scrollContainer.getBoundingClientRect();
      let leftSideMenuSize = 170;
      let maxWidth = containerRect.width - leftSideMenuSize;
      let leftX = containerRect.x + leftSideMenuSize;
      let rightX = containerRect.x + containerRect.width;
      let cells = Array.from(this.element.querySelectorAll('.monthCell'));
      if (cells.length) {
        cells.map(async (monthContainer) => {
          let monthRect = monthContainer.getBoundingClientRect();
          if (cells.indexOf(monthContainer) === cells.length - 1) {
            if (monthRect.x + monthRect.width <= rightX && !this.reachedEndOfCalendar) {
              this.reachedEndOfCalendar = true;
              //await this.addNextTwoMonthsToCalendar();
              const nextTwoMonths = addTwoMonthToDate(new Date(this.calendarData.endingDate));
              const nextDay = getNextDay(new Date(this.calendarData.endingDate));
              await this.addDatesToCalendar(nextDay, nextTwoMonths);
              this.reachedEndOfCalendar = false;
            }
          }
          if (monthRect.x + monthRect.width < leftX) {
            // item end is scrolled outside view, in -x
          }
          else if (monthRect.x > rightX) {
            // item is outside scrollview, in +x
          }
          else {
            let titleElement = monthContainer.querySelector('.monthTitle');
            let marginLeft = 0;
            let monthWidth = monthRect.width;
            if (monthRect.x < leftX) {
              marginLeft = Math.abs(monthRect.x) - leftX;
              marginLeft = monthRect.x < 0 ? Math.abs(monthRect.x) + leftX : Math.abs(marginLeft);
              monthWidth = monthRect.x + monthRect.width > rightX ? maxWidth : monthRect.x + monthRect.width - leftX;
            }
            else {
              monthWidth = maxWidth - monthWidth > monthWidth ? monthWidth : maxWidth - monthRect.x + leftX;
            }
            titleElement.style.marginLeft = marginLeft + 'px';
            titleElement.style.width = monthWidth + 'px';
          }
        });
      }
    }
  }
  hasAncestorWithClass(element, className) {
    let currentElement = element;
    while (currentElement !== null) {
      if (currentElement.matches(`.${className}`)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  showBookingPopupEventDataHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.onOptionSelect(event);
    //console.log("show booking event", event);
  }
  updateEventDataHandler(event) {
    let bookedData = this.calendarData.bookingEvents.find(bookedEvent => bookedEvent.id === event.detail.id);
    if (bookedData && event.detail && event.detail.data) {
      Object.entries(event.detail.data).forEach(([key, value]) => {
        bookedData[key] = value;
      });
    }
  }
  dragOverEventDataHandler(event) {
    if (event.detail.id === 'CALCULATE_DRAG_OVER_BOUNDS') {
      let topLeftCell = document.querySelector('igl-cal-header .topLeftCell');
      let containerDays = document.querySelectorAll('.headersContainer .headerCell');
      let containerRooms = document.querySelectorAll('.bodyContainer .roomRow .roomTitle');
      this.visibleCalendarCells = { x: [], y: [] };
      containerDays.forEach(element => {
        const htmlElement = element;
        this.visibleCalendarCells.x.push({
          left: htmlElement.offsetLeft + topLeftCell.offsetWidth,
          width: htmlElement.offsetWidth,
          id: htmlElement.getAttribute('data-day'),
        });
      });
      containerRooms.forEach(element => {
        const htmlElement = element;
        this.visibleCalendarCells.y.push({
          top: htmlElement.offsetTop,
          height: htmlElement.offsetHeight,
          id: htmlElement.getAttribute('data-room'),
        });
      });
      this.highlightDragOver(true, event.detail.data);
    }
    else if (event.detail.id === 'DRAG_OVER') {
      this.highlightDragOver(true, event.detail.data);
    }
    else if (event.detail.id === 'DRAG_OVER_END') {
      this.highlightDragOver(false, event.detail.data);
    }
    else if (event.detail.id === 'STRETCH_OVER_END') {
      this.highlightDragOver(false, event.detail.data);
    }
  }
  async highlightDragOver(hightLightElement, currentPosition) {
    let xElement, yElement;
    if (currentPosition) {
      xElement = this.visibleCalendarCells.x.find(pos => pos.left < currentPosition.x && currentPosition.x <= pos.left + pos.width);
      yElement = this.visibleCalendarCells.y.find(pos => pos.top < currentPosition.y && currentPosition.y <= pos.top + pos.height);
    }
    // console.log(hightLightElement+":::"+yElement.id+"_"+xElement.id);
    if (hightLightElement && xElement && yElement) {
      this.dragOverHighlightElement.emit({
        dragOverElement: yElement.id + '_' + xElement.id,
      });
    }
    else {
      this.dragOverHighlightElement.emit({ dragOverElement: '' });
    }
    if (!hightLightElement) {
      this.moveBookingTo.emit({
        bookingId: currentPosition.id,
        fromRoomId: currentPosition.fromRoomId,
        toRoomId: (yElement && yElement.id) || 'revert',
        moveToDay: (xElement && xElement.id) || 'revert',
        pool: currentPosition.pool,
        from_date: convertDMYToISO(xElement && xElement.id),
        to_date: computeEndDate(xElement && xElement.id, currentPosition.nbOfDays),
      });
    }
  }
  handleModalConfirm() {
    const { pool, toRoomId, from_date, to_date } = this.dialogData;
    this.eventsService
      .reallocateEvent(pool, toRoomId, from_date, to_date)
      .then(() => {
      this.dialogData = null;
    })
      .catch(() => {
      this.revertBooking.emit(pool);
    });
  }
  handleModalCancel() {
    this.revertBooking.emit(this.dialogData.pool);
    this.dialogData = null;
  }
  handleRoomNightsDialogClose(e) {
    if (e.detail.type === 'cancel') {
      this.revertBooking.emit(this.roomNightsData.pool);
    }
    this.roomNightsData = null;
  }
  handleSideBarToggle(e) {
    if (e.detail) {
      if (this.editBookingItem) {
        this.editBookingItem = null;
      }
      if (this.roomNightsData) {
        this.revertBooking.emit(this.roomNightsData.pool);
        this.roomNightsData = null;
      }
      if (this.dialogData) {
        this.revertBooking.emit(this.dialogData.pool);
        this.dialogData = null;
      }
    }
  }
  handleCloseBookingWindow() {
    this.bookingItem = null;
  }
  render() {
    var _a, _b;
    return (h(Host, null, h("ir-toast", null), h("ir-interceptor", null), h("div", { id: "iglooCalendar", class: "igl-calendar" }, this.shouldRenderCalendarView() ? ([
      this.showToBeAssigned ? (h("igl-to-be-assigned", { unassignedDatesProp: this.unassignedDates, to_date: this.to_date, from_date: this.from_date, propertyid: this.propertyid, class: "tobeAssignedContainer", calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) })) : null,
      this.showLegend ? (h("igl-legends", { class: "legendContainer", legendData: this.calendarData.legendData, onOptionEvent: evt => this.onOptionSelect(evt) })) : null,
      h("div", { class: "calendarScrollContainer", onMouseDown: event => this.dragScrollContent(event), onScroll: () => this.calendarScrolling() }, h("div", { id: "calendarContainer" }, h("igl-cal-header", { unassignedDates: this.unassignedDates, to_date: this.to_date, propertyid: this.propertyid, today: this.today, calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) }), h("igl-cal-body", { language: this.language, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, today: this.today, isScrollViewDragging: this.scrollViewDragging, calendarData: this.calendarData }), h("igl-cal-footer", { today: this.today, calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) }))),
    ]) : (h("ir-loading-screen", { message: "Preparing Calendar Data" }))), this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowedBookingSources, adultChildConstraints: this.calendarData.adultChildConstraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() })), h("ir-sidebar", { onIrSidebarToggle: this.handleSideBarToggle.bind(this), open: this.roomNightsData !== null || (this.editBookingItem && this.editBookingItem.event_type === 'EDIT_BOOKING'), showCloseButton: this.editBookingItem !== null, sidebarStyles: { width: this.editBookingItem ? '80rem' : 'var(--sidebar-width,40rem)', background: this.roomNightsData ? 'white' : '#F2F3F8' } }, this.roomNightsData && (h("ir-room-nights", { pool: this.roomNightsData.pool, onCloseRoomNightsDialog: this.handleRoomNightsDialogClose.bind(this), language: this.language, bookingNumber: this.roomNightsData.bookingNumber, identifier: this.roomNightsData.identifier, toDate: this.roomNightsData.to_date, fromDate: this.roomNightsData.from_date, ticket: this.ticket, propertyId: this.propertyid })), this.editBookingItem && this.editBookingItem.event_type === 'EDIT_BOOKING' && (h("ir-booking-details", { hasPrint: true, hasReceipt: true, propertyid: this.propertyid, hasRoomEdit: true, hasRoomDelete: true, bookingNumber: this.editBookingItem.BOOKING_NUMBER, ticket: this.ticket, baseurl: this.baseurl, language: this.language, hasRoomAdd: true }))), h("ir-modal", { modalTitle: '', rightBtnActive: this.dialogData ? !this.dialogData.hideConfirmButton : true, leftBtnText: (_a = locales === null || locales === void 0 ? void 0 : locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Cancel, rightBtnText: (_b = locales === null || locales === void 0 ? void 0 : locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Confirm, modalBody: this.dialogData ? this.dialogData.description : '', onConfirmModal: this.handleModalConfirm.bind(this), onCancelModal: this.handleModalCancel.bind(this) })));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IglooCalendar.style = iglooCalendarCss;

export { IglooCalendar as igloo_calendar };

//# sourceMappingURL=igloo-calendar.entry.js.map