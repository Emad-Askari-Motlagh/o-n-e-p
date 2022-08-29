import { ApolloLink, Observable } from "@apollo/client/core";
import { print } from "graphql";

class SSELink extends ApolloLink {
  constructor(options) {
    super();
    this.options = options;
  }

  request(operation) {
    const url = new URL(this.options.uri);
    url.searchParams.append("query", print(operation.query));
    url.searchParams.append(
      "extensions",
      JSON.stringify(operation.operationName)
    );
    url.searchParams.append("variables", JSON.stringify(operation.variables));
    if (operation.extensions) {
      url.searchParams.append(
        "extensions",
        JSON.stringify(operation.extensions)
      );
    }

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), {
        withCredentials: true,
      });

      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = function (error) {
        sink.error(error);
      };

      return () => eventsource.close();
    });
  }
}
export default SSELink;
