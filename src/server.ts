import express, { Request, Response } from 'express';
import axios from 'axios';
import { recommendJobs } from './recommend';
import { Member, Job } from './data';

const app = express();
const port = 3000;

const membersApi = 'https://bn-hiring-challenge.fly.dev/members.json';
const jobsApi = 'https://bn-hiring-challenge.fly.dev/jobs.json';

// Endpoint to get job recommendations for a member by name
app.get('/recommendations/:memberName', async (req: Request, res: Response) => {
    const memberName = req.params.memberName?.toLowerCase();

    try {
        // Fetch members and jobs data from APIs
        const [membersResponse, jobsResponse] = await Promise.all([
            axios.get<Member[]>(membersApi),
            axios.get<Job[]>(jobsApi),
        ]);

        const members = membersResponse.data;
        const jobs = jobsResponse.data;

        // Find member by name
        const member = members.find((m) => m.name.toLowerCase() === memberName);

        if (!member) {
            res.status(404).json({ message: 'Member not found' });
            return;
        }

        // Get job recommendations
        const recommendations = recommendJobs(member, jobs);

        if (recommendations.length === 0) {
            res.status(404).json({ message: 'No job recommendations found' });
            return;
        }

        res.json({
            member_name: memberName,
            recommendations,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data from APIs' });
    }
});

// Endpoint to get job recommendations for all members
app.get('/recommendations', async (req: Request, res: Response) => {
    try {
        // Fetch members and jobs data from APIs
        const [membersResponse, jobsResponse] = await Promise.all([
            axios.get<Member[]>(membersApi),
            axios.get<Job[]>(jobsApi),
        ]);

        const members = membersResponse.data;
        const jobs = jobsResponse.data;

        // Map over all members and get recommendations for each
        const allRecommendations = members.map((member) => {
            const recommendations = recommendJobs(member, jobs);
            return {
                member_name: member.name,
                recommendations,
            };
        });

        if (allRecommendations.length === 0) {
            res.status(404).json({ message: 'No job recommendations found' });
            return;
        }

        res.json(allRecommendations);
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data from APIs' });
        return;
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
