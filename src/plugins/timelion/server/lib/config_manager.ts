/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PluginInitializerContext } from 'kibana/server';
import { TypeOf } from '@kbn/config-schema';
import { ConfigSchema } from '../config';

export class ConfigManager {
  private esShardTimeout: number = 0;
  private graphiteUrls: string[] = [];

  constructor(config: PluginInitializerContext['config']) {
    config.create<TypeOf<typeof ConfigSchema>>().subscribe(configUpdate => {
      this.graphiteUrls = configUpdate.graphiteUrls || [];
    });

    config.legacy.globalConfig$.subscribe(configUpdate => {
      this.esShardTimeout = configUpdate.elasticsearch.shardTimeout.asMilliseconds();
    });
  }

  getEsShardTimeout() {
    return this.esShardTimeout;
  }

  getGraphiteUrls() {
    return this.graphiteUrls;
  }
}