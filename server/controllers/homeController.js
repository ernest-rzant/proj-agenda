// URL: Get /
const index = (req, res) => {
  // Calculando emoji
  const emojieDataset = [
    '😉',
    '😃',
    '🎅',
    '🏆',
    '💓',
    '🎁',
    '🎈',
    '🍕',
    '🍏',
    '🚗',
  ];
  const emojie =
    emojieDataset[Math.floor(Math.random() * emojieDataset.length)];
  // View-Models
  const viewModel = {
    title: 'Index Controller Working!!!',
    author: 'Ernest Rodriguez',
    emojie,
  };
  res.render('home/indexView', viewModel);
};

// URL: Get /about
const about = (req, res) => {
  res.render('home/aboutView', {
    name: 'PhD Ernest Rodriguez',
    email: 'ernestorodriguez643@gmail.com',
    url: 'https://github.com/ernest-rzant',
    description:
      'Una aplicacion que te permitira registrar las actividades de tu dia a dia. PwpcII-2022A',
    version: '0.0.alpha',
  });
};

export default {
  // Action Methods
  index,
  about,
};
