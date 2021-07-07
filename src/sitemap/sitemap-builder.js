/* eslint-disable @typescript-eslint/no-var-requires */
require('babel-register')({
  presets: ['es2015', 'react'],
});

const fetch = require('node-fetch');
const sort = require('fast-sort');
const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

/* eslint-enable */
async function search() {
  const response = await fetch(
    'https://api.g1.gg/search?take=3000',
  ).then((response) => response.json());

  return response;
}

function filterResults(type, data, excludeData) {
  const filteredResults = data
    .filter(
      (record) => record.type === type && !excludeData.includes(record.slug),
    )
    .map((record) => record.slug);

  sort(filteredResults).asc();

  return filteredResults;
}

function generateUsernameMap(data) {
  const exclude = [
    'DemiGod',
    'alpha',
    'beta',
    'delta',
    'omega',
    'tester',
    'testgmail',
    'testgmails',
    'fake-drdisrespect',
    'vadimauss',
    'newnewuser',
    'newuser1',
    'newuser2',
    'newuser',
  ];

  const filteredResults = filterResults('user', data, exclude);

  const map = [];
  filteredResults.forEach((r) =>
    map.push({
      username: r,
    }),
  );

  return map;
}

// function generatePostMap(data) {
//   const exclude = [];

//   const filteredResults = filterResults('post', data, exclude);

//   const map = [];
//   filteredResults.forEach((r) =>
//     map.push({
//       // todo add username
//       postId: r,
//     }),
//   );

//   return map;
// }

async function generateSitemap() {
  const data = await search();
  const usernameMap = generateUsernameMap(data);
  // const postMap = generatePostMap(data);
  // const gameMap = generateGameMap(data);

  const paramsConfig = {
    '/:username': usernameMap,
    '/:username/achievements': usernameMap,
    '/:username/experience': usernameMap,
    '/:username/gear': usernameMap,
    '/:username/games': usernameMap,
    '/:username/followers': usernameMap,
    '/:username/following': usernameMap,
    // '/:username/post/:postId': postMap,
    // '/game/:slug':Map,
  };

  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build('https://g1.gg')
    .save('../../public/sitemap.xml');
}

generateSitemap();
