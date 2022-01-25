import "reflect-metadata";
import * as dotenv from "dotenv";
import { Container } from "typedi";
import { Client } from "./Client";
import JuiceboxReader from "./juicebox_reader";

dotenv.config();

// Initialize the Client using the IoC.
Container.get<Client>(Client);
