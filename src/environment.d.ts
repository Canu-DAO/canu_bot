declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      MONGO_CONN_STRING: string;
      DB_NAME: string;
      SERVER_COLLECTION_NAME: string;
      INFURA_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
