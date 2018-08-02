declare module 'fetchain' {

	import { METHODS as HTTPMethods, Agent as HTTPAgent } from 'http';
	import { Agent as HTTPSAgent } from  'https';
	import { Stream } from 'stream';
	import { Headers, Response as FetchResponse } from 'node-fetch';

	export class Fetchain {
		public constructor(method: HTTPMethod, url: URL, options?: FetchainOptions);
		public query(name: Array<string[]> | { [key: string]: value } | string, value?: string): Fetchain;
		public set(name: Array<string[]> | { [key: string]: value } | string, value?: string): Fetchain;
		public attach(name: { [key: string]: GenericValue } | string, value?: GenericValue, filename?: string): Fetchain;
		public send(data: FormData | Buffer | Stream | object): Fetchain;
		public setRedirect(redirect: boolean): Fetchain;
		public setFollowCount(count?: number): Fetchain;
		public setTimeout(timeout: number): Fetchain;
		public setAgent(agent: HTTPAgent | HTTPSAgent): Fetchain;
		public toBuffer(): Fetchain;
		public toJSON(): Fetchain;
		public toText(): Fetchain;
		public toString(): Fetchain;
		public then(resolver: Function, rejecter: Function): Promise<Rsponse>;
		public catch(rejecter: Function): Promise<ResponseError>;

		public acl(url: string, optinos?: FetchainOptions): Fetchain;
		public bind(url: string, optinos?: FetchainOptions): Fetchain;
		public checkout(url: string, optinos?: FetchainOptions): Fetchain;
		public connect(url: string, optinos?: FetchainOptions): Fetchain;
		public copy(url: string, optinos?: FetchainOptions): Fetchain;
		public delete(url: string, optinos?: FetchainOptions): Fetchain;
		public get(url: string, optinos?: FetchainOptions): Fetchain;
		public head(url: string, optinos?: FetchainOptions): Fetchain;
		public link(url: string, optinos?: FetchainOptions): Fetchain;
		public lock(url: string, optinos?: FetchainOptions): Fetchain;
		public merge(url: string, optinos?: FetchainOptions): Fetchain;
		public mkactivity(url: string, optinos?: FetchainOptions): Fetchain;
		public mkcalendar(url: string, optinos?: FetchainOptions): Fetchain;
		public mkcol(url: string, optinos?: FetchainOptions): Fetchain;
		public move(url: string, optinos?: FetchainOptions): Fetchain;
		public notify(url: string, optinos?: FetchainOptions): Fetchain;
		public options(url: string, optinos?: FetchainOptions): Fetchain;
		public patch(url: string, optinos?: FetchainOptions): Fetchain;
		public post(url: string, optinos?: FetchainOptions): Fetchain;
		public propfind(url: string, optinos?: FetchainOptions): Fetchain;
		public proppatch(url: string, optinos?: FetchainOptions): Fetchain;
		public purge(url: string, optinos?: FetchainOptions): Fetchain;
		public put(url: string, optinos?: FetchainOptions): Fetchain;
		public rebind(url: string, optinos?: FetchainOptions): Fetchain;
		public report(url: string, optinos?: FetchainOptions): Fetchain;
		public search(url: string, optinos?: FetchainOptions): Fetchain;
		public source(url: string, optinos?: FetchainOptions): Fetchain;
		public subscribe(url: string, optinos?: FetchainOptions): Fetchain;
		public trace(url: string, optinos?: FetchainOptions): Fetchain;
		public unbind(url: string, optinos?: FetchainOptions): Fetchain;
		public unlink(url: string, optinos?: FetchainOptions): Fetchain;
		public unlock(url: string, optinos?: FetchainOptions): Fetchain;
		public unsubscribe(url: string, optinos?: FetchainOptions): Fetchain;

		public static METHODS: HTTPMethods;

		private options: FetchainOptions;
		private customHandler: string;
		private error: Error;
	};

	class FormData {
		public constructor();
		public boundary: string;
		public buffers: Array<Buffer>;
		public readonly length: number;

		public appent(name: string, data: GenericValue, filename?: string): FormData;
		public getBoundary(): Array<Buffer>;
		public end(): Buffer;
	}

	type FetchainOptions = {
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
		rawBody: FetchResponse;
	};

	type ResponseError = Error & Response;

	type GenericValue = Buffer | string | object;

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
