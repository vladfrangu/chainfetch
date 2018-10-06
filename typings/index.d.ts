declare module 'chainfetch' {

	import { METHODS as NativeHTTPMethods, Agent as HTTPAgent } from 'http';
	import { Agent as HTTPSAgent } from  'https';
	import { Stream } from 'stream';
	import { Headers, Response as FetchResponse } from 'node-fetch';
	import { URL } from 'url';

	export default class Chainfetch {
		private options: ChainfetchOptions;
		private customHandler: string;
		private error: Error;
		public constructor(method: HTTPMethod, url: URL, options?: ChainfetchOptions);
		public query(name: Array<string[]> | { [key: string]: string } | string, value?: string): Chainfetch;
		public set(name: Array<string[]> | { [key: string]: string } | string, value?: string): Chainfetch;
		public attach(name: { [key: string]: GenericValue } | string, value?: GenericValue, filename?: string): Chainfetch;
		public send(data: FormData | Buffer | Stream | object): Chainfetch;
		public setRedirect(redirect: boolean): Chainfetch;
		public setFollowCount(count?: number): Chainfetch;
		public setTimeout(timeout: number): Chainfetch;
		public setAgent(agent: HTTPAgent | HTTPSAgent): Chainfetch;
		public toBuffer(): Chainfetch;
		public toJSON(): Chainfetch;
		public toText(): Chainfetch;
		public toString(): Chainfetch;
		public onlyBody<T = any>(): Promise<T>;
		public then(onfulfilled?: ((value: Response) => any | PromiseLike<any>) | undefined | null, onrejected?: ((error: ResponseError) => any | PromiseLike<any>) | undefined | null): Promise<Response | ResponseError>;
		public catch(onrejected?: ((error: ResponseError) => any | PromiseLike<any>) | undefined | null): Promise<ResponseError>;
	}

	export function acl(url: string, options?: ChainfetchOptions): Chainfetch;
	export function bind(url: string, options?: ChainfetchOptions): Chainfetch;
	export function checkout(url: string, options?: ChainfetchOptions): Chainfetch;
	export function connect(url: string, options?: ChainfetchOptions): Chainfetch;
	export function copy(url: string, options?: ChainfetchOptions): Chainfetch;
	function _delete(url: string, options?: ChainfetchOptions): Chainfetch;
	export { _delete as delete };
	export function get(url: string, options?: ChainfetchOptions): Chainfetch;
	export function head(url: string, options?: ChainfetchOptions): Chainfetch;
	export function link(url: string, options?: ChainfetchOptions): Chainfetch;
	export function lock(url: string, options?: ChainfetchOptions): Chainfetch;
	export function merge(url: string, options?: ChainfetchOptions): Chainfetch;
	export function mkactivity(url: string, options?: ChainfetchOptions): Chainfetch;
	export function mkcalendar(url: string, options?: ChainfetchOptions): Chainfetch;
	export function mkcol(url: string, options?: ChainfetchOptions): Chainfetch;
	export function move(url: string, options?: ChainfetchOptions): Chainfetch;
	export function notify(url: string, options?: ChainfetchOptions): Chainfetch;
	export function options(url: string, options?: ChainfetchOptions): Chainfetch;
	export function patch(url: string, options?: ChainfetchOptions): Chainfetch;
	export function post(url: string, options?: ChainfetchOptions): Chainfetch;
	export function propfind(url: string, options?: ChainfetchOptions): Chainfetch;
	export function proppatch(url: string, options?: ChainfetchOptions): Chainfetch;
	export function purge(url: string, options?: ChainfetchOptions): Chainfetch;
	export function put(url: string, options?: ChainfetchOptions): Chainfetch;
	export function rebind(url: string, options?: ChainfetchOptions): Chainfetch;
	export function report(url: string, options?: ChainfetchOptions): Chainfetch;
	export function search(url: string, options?: ChainfetchOptions): Chainfetch;
	export function source(url: string, options?: ChainfetchOptions): Chainfetch;
	export function subscribe(url: string, options?: ChainfetchOptions): Chainfetch;
	export function trace(url: string, options?: ChainfetchOptions): Chainfetch;
	export function unbind(url: string, options?: ChainfetchOptions): Chainfetch;
	export function unlink(url: string, options?: ChainfetchOptions): Chainfetch;
	export function unlock(url: string, options?: ChainfetchOptions): Chainfetch;
	export function unsubscribe(url: string, options?: ChainfetchOptions): Chainfetch;

	export { NativeHTTPMethods as METHODS };

	class FormData {
		public constructor();
		public boundary: string;
		public buffers: Array<Buffer>;
		public readonly length: number;

		public appent(name: string, data: GenericValue, filename?: string): FormData;
		public getBoundary(): string;
		public end(): Buffer;
	}

	type ChainfetchOptions = {
		method: HTTPMethod;
		url: URL,
		headers: Headers,
		body: FormData | Buffer | Stream | string;
		redirect: 'follow' | 'manual' | 'off';
		follow: number;
		timeout: number;
		compress: boolean;
		agent: HTTPAgent | HTTPSAgent;
	};

	type Response = {
		headers: Headers;
		status: number;
		statusText: string;
		ok: boolean;
		url: string;
		body: GenericValue;
		raw: Buffer;
	};

	type ResponseError = Error & Response;

	type GenericValue = Buffer | string | object | any;

	type HTTPMethod = 'acl'
		| 'bind'
		| 'checkout'
		| 'connect'
		| 'copy'
		| 'delete'
		| 'get'
		| 'head'
		| 'link'
		| 'lock'
		| 'merge'
		| 'mkactivity'
		| 'mkcalendar'
		| 'mkcol'
		| 'move'
		| 'notify'
		| 'options'
		| 'patch'
		| 'post'
		| 'propfind'
		| 'proppatch'
		| 'purge'
		| 'put'
		| 'rebind'
		| 'report'
		| 'search'
		| 'source'
		| 'subscribe'
		| 'trace'
		| 'unbind'
		| 'unlink'
		| 'unlock'
		| 'unsubscribe';

}
