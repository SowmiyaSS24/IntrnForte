const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');

// Post Job (Employer)
router.get('/post', (req, res) => {
    res.sendFile(__dirname + '/../views/post-job.html');
});

router.post('/post', async (req, res) => {
    const { title, description, requirements, location, deadline } = req.body;
    const job = new Job({
        title, description, requirements, location,
        deadline, employer: req.session.userId
    });
    await job.save();
    res.redirect('/dashboard');
});

// View Jobs
router.get('/all', async (req, res) => {
    const jobs = await Job.find();
    let html = '<h1>Job Listings</h1>';
    jobs.forEach(job => {
        html += `<h2>${job.title}</h2><p>${job.description}</p><form method="POST" action="/jobs/apply"><input type="hidden" name="jobId" value="${job._id}"><button type="submit">Apply</button></form><hr>`;
    });
    res.send(html);
});

// Apply
router.post('/apply', async (req, res) => {
    const application = new Application({
        seeker: req.session.userId,
        job: req.body.jobId
    });
    await application.save();
    res.send('Applied successfully!');
});

module.exports = router;
