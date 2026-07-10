import log from "loglevel";

log.setLevel(import.meta.env.PROD ? "warn" : "debug");

export const logger = log;

