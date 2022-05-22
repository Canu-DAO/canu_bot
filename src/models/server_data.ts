import mongoose from "mongoose";
import mongooseLong from "mongoose-long";
mongooseLong(mongoose);
var Long = mongoose.Schema.Types.Long;
const serverSchema: mongoose.Schema = new mongoose.Schema(
  {
    server_id: Long,
    project_id: Number,
    project_name: String,
    alerts_channel: Long,
    latest_block: Long,
    cycle_warning: String,
  },
  { collection: "server_data" }
);

export const serverData: mongoose.Model<any> = mongoose.model(
  "server_data",
  serverSchema
);
