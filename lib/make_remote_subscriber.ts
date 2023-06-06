import ws from "ws";
import { createClient, Client } from "graphql-ws";
import { print, DocumentNode } from "graphql";
import Crypto from "crypto";

interface RemoteSubscriberOptions {
  url: string;
  document: DocumentNode;
  variables: Record<string, any>;
}

interface Deferred<T> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

function makeRemoteSubscriber(url: string) {
  console.log(`Petición a la url:  ${url}`);
  const client: Client = createClient({
    url,
    webSocketImpl: ws,
  });

  return async ({ document, variables }: RemoteSubscriberOptions) => {
    const pending: any[] = [];
    let deferred: Deferred<boolean> | null = null;
    let error: any = null;
    let done = false;

    const query = print(document);
    console.log(`query ${query}`);

    const dispose = client.subscribe(
      {
        query,
        variables,
      },
      {
        next: (data) => {
          console.log("data");
          pending.push(data);
          deferred && deferred.resolve(false);
        },
        error: (err) => {
          console.log("err");
          error = err;
          deferred && deferred.reject(error);
        },
        complete: () => {
          console.log("complete");
          done = true;
          deferred && deferred.resolve(true);
        },
      }
    );

    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next() {
        if (done) return { done: true, value: undefined as any };
        if (error) throw error;
        if (pending.length) return { value: pending.shift() };
        return (await new Promise(
          (resolve, reject) => (deferred = { resolve, reject })
        ))
          ? { done: true, value: undefined }
          : { value: pending.shift() };
      },
      async throw(err) {
        console.log(`err ${err}`);
        throw err;
      },
      async return() {
        dispose();
        return { done: true, value: undefined as any };
      },
    };
  };
}

export default makeRemoteSubscriber;
