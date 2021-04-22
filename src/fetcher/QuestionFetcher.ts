import path from 'path';
import axios from 'axios';

import { default as DEFAULT_DATASET } from './datasets';
import { SupportedQuestionFilesData, parseJson, SupportedSpecFiles } from '../specs';

const DEFAULT_REMOTE_URL = `https://raw.githubusercontent.com/EduardoJM/database/main/`;

export interface QuestionFetcherOptions {
    datasets?: string[][];
    parseFrom?: 'local' | 'remote';
    basePath?: string;
}

export class QuestionFetcher {
    private datasets: string[][];
    private parseFrom: 'local' | 'remote';
    private basePath: string;

    public questions: SupportedQuestionFilesData[];

    constructor(opts?: QuestionFetcherOptions) {
        this.questions = [];
        if (!opts) {
            this.datasets = DEFAULT_DATASET;
            this.parseFrom = 'remote';
            this.basePath = DEFAULT_REMOTE_URL;
            return;
        }
        const {
            datasets = DEFAULT_DATASET,
            basePath = DEFAULT_REMOTE_URL,
            parseFrom = 'remote',
        } = opts;
        this.datasets = datasets;
        this.parseFrom = parseFrom;
        this.basePath = basePath;
    }

    async readDataSets() {
        const queue = this.datasets.map((paths) => {
            let pathStr = this.basePath;
            if (this.parseFrom == 'remote') {
                if (pathStr.charAt(pathStr.length - 1) != '/') {
                    pathStr = `${path}/`
                }
                const outPath = paths.reduce((previous, current) => `${previous}/${current}`);
                pathStr = `${pathStr}${outPath}`;
            } else {
                pathStr = path.resolve(pathStr, ...paths);
            }
            return pathStr;
        });
        for (let i = 0; i < queue.length; i += 1) {
            // no async functions here for now
            await this.readSingleDataSet(queue[i]);
        }
    }

    private async readSingleDataSet(path: string) {
        if (this.parseFrom === 'remote') {
            try {
                const response = await axios.get(path)
                if (response.status === 200) {
                    const questionItem = parseJson(response.data);
                    if (!questionItem) {
                        console.log('## ERROR PARSING FILE');
                        return;
                    }
                    if (questionItem.type === 'question') {
                        this.questions.push(questionItem.data);
                    } else {
                        this.questions.push(...questionItem.data);
                    }
                } else {
                    console.log('## ERROR');
                }
            } catch(error) {
                console.log('## ERROR\r\n');
                console.log(JSON.stringify(error, null, 2));
            }
        }
    }
}
