import { JobId } from "../define/job";

type JobName = {
  [key in JobId]: string
};

export const JOB_NAME: JobName = {
  [JobId.Adventurer]: "冒険者",
  [JobId.TestJob]: "テスト"
}