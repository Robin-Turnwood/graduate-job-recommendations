export interface Job {
    title: string;
    location: string;
}

export interface Member {
    name: string;
    bio: string;
}

export interface Recommend {
    job: Job;
    score: number;
}
