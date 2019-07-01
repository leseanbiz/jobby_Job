var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github');
fetchGithub();
new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
//0 0 * * 0-6 - once a day