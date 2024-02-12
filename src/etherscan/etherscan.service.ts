import {HttpService} from '@nestjs/axios';
import {Injectable, Logger} from '@nestjs/common';
import * as process from "process";
import {
    ClusterProtocolEnum, InstanceCreationConfig, InstanceResponse,
    MarketplaceInstanceCreationConfig, MarketplaceInstanceResponse,
    PersistentStorageClassEnum,
    SpheronClient
} from "@spheron/compute";
import {Cron, CronExpression} from "@nestjs/schedule";
import {ComputeTypeEnum} from "@spheron/core";


@Injectable()
export class EtherscanService {
    private readonly logger = new Logger(EtherscanService.name);

    constructor(
        private readonly httpService: HttpService
    ) {
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async pollForEvent() {

        let res = await this.httpService.axiosRef.get(`https://api-sepolia.etherscan.io/api
   ?module=logs
   &action=getLogs
   &address=0x03eF051Bf8BAc9646744aBf0612D8Cd139740aCa
   &fromBlock=5271035
   &toBlock=5271045
   &page=1
   &offset=1000
   &apikey=${process.env.ETHERSCAN_API_TOKEN}`)
            .then(response => response);

        this.logger.debug('Event found: ' + res.data);

        if(res.data) {
            let instanceRes = await this.createSpheronResource();

            this.logger.debug('Instance created: ' + instanceRes.instanceId);
            this.logger.debug('Instance created: ' + instanceRes.instanceDeploymentId);
        }
    }

    async createSpheronResource(): Promise<InstanceResponse> {


        const client = new SpheronClient({
            token: process.env.SPHERON_ACCESS_TOKEN,
        });

        let config : InstanceCreationConfig  = {
            clusterName: "test123",
            type: ComputeTypeEnum.DEMAND,
            healthCheckConfig: {path: "", port: 0},
            configuration: {
                image: "ghcr.io/dragonflydb/dragonfly",
                tag: "latest",
                storage: 10,
                ports: [{
                    containerPort: 8000,
                    exposedPort: 8000 }],
                environmentVariables: [],
                secretEnvironmentVariables: [],
                commands: [],
                args: [],
                region: "any",
                replicas: 1,
                // machineImageId: ventusSmallId
                persistentStorage: {
                    size: 10,
                    class: PersistentStorageClassEnum.HDD,
                    mountPoint: "/etc/data"
                },
                customSpecs: {
                    cpu: 1,
                    memory: 2,
                }
            },
        };

        return client.instance.create(config)
    }
}
