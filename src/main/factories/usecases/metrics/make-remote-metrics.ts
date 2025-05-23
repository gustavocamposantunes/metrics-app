import { RemoteLoadMetrics } from "@/data/usecases/load-metrics";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { LoadMetrics } from "@/domain/usecases";

export const makeRemoteMetrics = (): LoadMetrics => new RemoteLoadMetrics(makeApiUrl("/metrics"), makeAxiosHttpClient());