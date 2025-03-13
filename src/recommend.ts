import { Member, Job } from './data';

export interface Recommend {
    job: Job;
    score: number;
}

// const locations = ['london', 'edinburgh', 'york', 'manchester'];
const keywords = [
    'developer',
    'designer',
    'marketing',
    'data scientist',
    'legal',
    'project manager',
    'sales',
];

// todo alternate naming: designer === design
// todo negative keywords for location like outside of London

// Simple recommendation based on job title keywords and location
export function recommendJobs(member: Member, jobs: Job[]): Recommend[] {
    const recommendations: Recommend[] = [];

    const bio = member.bio.toLowerCase();

    for (const job of jobs) {
        let score = 0;

        // Match location - If member is looking for a job in the job's location or is open to relocation
        const location = job.location.toLowerCase();
        if (bio.includes(location)) {
            score += 2;
        } else if (bio.includes('relocate')) {
            score += 1; // Open to relocating, so give some weight to other locations
        }

        // Match job type based on keywords in bio
        const keyword = keywords.find((keyword) => job.title.toLowerCase().includes(keyword));
        if (keyword && bio.includes(keyword)) {
            score += 3;
        }

        if (bio.includes('internship') && job.title.toLowerCase().includes('internship')) {
            score += 1; // For internship roles
        }

        if (score > 0) {
            recommendations.push({ job, score });
        }
    }

    // Sort recommendations by score in descending order
    return recommendations.sort((a, b) => b.score - a.score);
}
