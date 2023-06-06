import costumerSchema from "@/server/mongoSchema/costumerSchema";
import stream from "stream";

/**
 * Close the given change stream after the given amount of time
 * @param timeInMs The amount of time in ms to monitor listings
 * @param changeStream The open change stream that should be closed
 */
function closeChangeStream(
  timeInMs: number = 60000,
  changeStream: any
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      changeStream.close();
      resolve();
    }, timeInMs);
  });
}

async function monitorListingsUsingEventEmitter(
  timeInMs: number = 60000,
  pipeline: any[] = [],
  collection: any
): Promise<void> {
  const changeStream = collection.watch();
  changeStream.on("change", (next: any) => {
    console.log(next);
  });
  // Wait the given amount of time and then close the change stream
  await closeChangeStream(timeInMs, changeStream);
}

async function monitorListingsUsingHasNext(
  timeInMs: number = 60000,
  pipeline: any[] = [],
  collection: any
): Promise<void> {
  const changeStream = collection.watch(pipeline);

  await closeChangeStream(timeInMs, changeStream);

  try {
    while (await changeStream.hasNext()) {
      console.log(await changeStream.next());
    }
  } catch (error) {
    if (changeStream.isClosed()) {
      console.log(
        "The change stream is closed. Will not wait on any more changes."
      );
    } else {
      throw error;
    }
  }
}

async function monitorListingsUsingStreamAPI(
  collection: any,
  timeInMs: number = 60000,
  pipeline: any[] = []
): Promise<void> {
  const changeStream = await collection.watch();
  changeStream.pipe(
    new stream.Writable({
      objectMode: true,
      write: function (doc: any, _, cb: any) {
        console.log(doc);
        cb();
      },
    })
  );
}

export {
  monitorListingsUsingEventEmitter,
  monitorListingsUsingHasNext,
  monitorListingsUsingStreamAPI,
};
