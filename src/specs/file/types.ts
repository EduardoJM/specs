import { SupportedExamsDataMap } from '../data';
import { SupportedContentItems } from '../content';

export interface QuestionFileAlternativeData {
    body: SupportedContentItems[];
    isCorrect: boolean;
}

export interface QuestionFileData<K extends keyof SupportedExamsDataMap> {
    id: string | number;
    exam: K;
    examData: SupportedExamsDataMap[K];
    questionNumber: number;
    tags: string[];
    questionBody: SupportedContentItems[];
    alternatives: QuestionFileAlternativeData[];
    textResolution: SupportedContentItems[];
}

export type SupportedQuestionFilesData = QuestionFileData<'ENEM'>;

export type QuestionCollectionFileData = SupportedQuestionFilesData[];

export interface QuestionFileTypeMap {
    'question': SupportedQuestionFilesData;
    'collection': QuestionCollectionFileData;
}

export interface SpecFile<K extends keyof QuestionFileTypeMap> {
    type: K;
    data: QuestionFileTypeMap[K];
}

export type SupportedSpecFiles = SpecFile<'question'> | SpecFile<'collection'>;
