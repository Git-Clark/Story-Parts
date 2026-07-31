// Projects are structured records rather than prose, so they live here as
// data instead of as Markdown. Edit this file to add one.
//
// status: 'IN PROGRESS' | 'PLANNED' | 'LIVE'
// preview: true once there is a real screenshot to show

export const PROJECTS = [
  {
    title: 'The Credit Gap',
    status: 'IN PROGRESS',
    preview: true,
    blurb:
      'Below-the-line credits plotted against awards recognition, by decade. Started because the editing branch keeps nominating the same five films the directing branch does, and the overlap is worth a number rather than an impression.',
    source: 'Data: AMPAS, AFI · Built with Chart.js',
  },
  {
    title: 'Second Unit',
    status: 'PLANNED',
    preview: false,
    blurb:
      'A searchable index of second-unit directors and the sequences attributed to them. Most of this information exists only in trade reporting from the period of production and has never been collected in one place.',
    source: 'Data: manual collection · Scope undecided',
  },
  {
    title: 'Who Shot What',
    status: 'PLANNED',
    preview: false,
    blurb:
      'Cinematographer filmographies laid side by side, so you can watch a visual signature travel across the directors who get credited for it.',
    source: 'Data: TMDB API · Not started',
  },
];
