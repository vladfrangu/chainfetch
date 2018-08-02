declare module 'chainfetch' {

	import { METHODS as NativeHTTPMethods, Agent as HTTPAgent } from 'http';
	import { Agent as HTTPSAgent } from  'https';
	import { Stream } from 'stream';
	import { Headers, Response as FetchResponse } from 'node-fetch';

	export default class Chainfetch {
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
		public then(onfulfilled?: ((value: Response) => Response | PromiseLike<Response>) | undefined | null, onrejected?: ((error: ResponseError) => ResponseError | PromiseLike<ResponseError>) | undefined | null): Promise<Response | ResponseError>;
		public catch(onrejected?: ((error: ResponseError) => ResponseError | PromiseLike<ResponseError>) | undefined | null): Promise<ResponseError>;

		public static acl(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static bind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static checkout(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static connect(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static copy(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static delete(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static get(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static head(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static link(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static lock(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static merge(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static mkactivity(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static mkcalendar(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static mkcol(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static move(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static notify(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static options(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static patch(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static post(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static propfind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static proppatch(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static purge(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static put(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static rebind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static report(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static search(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static source(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static subscribe(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static trace(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static unbind(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static unlink(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static unlock(url: string, optinos?: ChainfetchOptions): Chainfetch;
		public static unsubscribe(url: string, optinos?: ChainfetchOptions): Chainfetch;

		public static METHODS: NativeHTTPMethods;

		private options: ChainfetchOptions;
		private customHandler: string;
		private error: Error;
	}

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
