const sonarqubeScanner = require('sonarqube-scanner');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.config();

exec('git branch --show-current', (err, stdout, stderr) => {
  let branch;

  if (err) {
      branch = 'master';
  } else {
    branch = stdout;
  }

  sonarqubeScanner(
    {
      serverUrl: 'https://sonarcloud.io',
      token: process.env.SONARCLOUD_TOKEN,
      options: {
        'sonar.projectKey': 'jpmoura_discord-nfl-news-bot',
        'sonar.organization': 'jpmoura-github',
        'sonar.sources': 'src',
        'sonar.branch.name': branch,
      }
    },
    () => {
      console.log('>> Sonar analysis is done!');
    }
  );
});
