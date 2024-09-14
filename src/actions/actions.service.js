import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

export class ActionsService {
  constructor() {
    this.packageDefinition = protoLoader.loadSync(
      "src/protos/actionsHistory.proto",
      {},
    );

    this.actionsHistoryPackage = grpc.loadPackageDefinition(
      this.packageDefinition,
    ).actionsHistory;

    this.client = new this.actionsHistoryPackage.AddHistoryService(
      "localhost:3000",
      grpc.credentials.createInsecure(),
    );
  }

  async addAction(action) {
    try {
      this.client.addAction(action, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Action added");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
