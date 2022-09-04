import costumerSchema from "@/server/mongoSchema/costumerSchema";
import stream from "stream";

/**
 * Close the given change stream after the given amount of time
 * @param {*} timeInMs The amount of time in ms to monitor listings
 * @param {*} changeStream The open change stream that should be closed
 */
function closeChangeStream(timeInMs = 60000, changeStream) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      changeStream.close();
      resolve();
    }, timeInMs);
  });
}

async function monitorListingsUsingEventEmitter(
  timeInMs = 60000,
  pipeline = [],
  collection
) {
  let result;
  const changeStream = collection.watch();
  changeStream.on("change", (next) => {
    console.log(next);
  });
  // Wait the given amount of time and then close the change stream
  closeChangeStream(timeInMs, changeStream);
}

async function monitorListingsUsingHasNext(
  timeInMs = 60000,
  pipeline = [],
  collection
) {
  const changeStream = collection.watch(pipeline);

  closeChangeStream(timeInMs, changeStream);

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
  collection,
  timeInMs = 60000,
  pipeline = []
) {
  const changeStream = await collection.watch();
  changeStream.pipe(
    new stream.Writable({
      objectMode: true,
      write: function (doc, _, cb) {
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
