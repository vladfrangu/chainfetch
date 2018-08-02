declare module 'chainfetch' {

	import { METHODS as HTTPMethods, Agent as HTTPAgent } from 'http';
	import { Agent as HTTPSAgent } from  'https';
	import { Stream } from 'stream';
	import { Headers, Response as FetchResponse } from 'node-fetch';

	export class Chainfetch {
		public constructor(method: HTTPMethod, url: URL, options?: ChainfetchOptions);
		public query(name: Array<string[]> | { [key: string]: value } | string, value?: string): Chainfetch;
		public set(name: Array<string[]> | { [key: string]: value } | string, value?: string): Chainfetch;
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
		public then(resolver: Function, rejecter: Function): Promise<Rsponse>;
		public catch(rejecter: Function): Promise<ResponseError>;

		public acl(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public bind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public checkout(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public connect(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public copy(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public delete(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public get(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public head(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public link(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public lock(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public merge(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public mkactivity(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public mkcalendar(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public mkcol(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public move(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public notify(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public options(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public patch(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public post(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public propfind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public proppatch(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public purge(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public put(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public rebind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public report(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public search(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public source(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public subscribe(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public trace(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public unbind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public unlink(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public unlock(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public unsubscribe(url: string, optinos?: ChainfetchOptions): Chainfetch;

		public static METHODS: HTTPMethods;

		private options: ChainfetchOptions;
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
