import util from "util";
import Multer, { StorageEngine } from "multer";

const maxSize = 2 * 1024 * 1024;

const processFile = Multer({
  storage: Multer.memoryStorage() as StorageEngine,
  limits: { fileSize: maxSize },
}).single("file");

const processFileMiddleware = util.promisify(processFile);
export default processFileMiddleware;
