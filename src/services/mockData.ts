import { Issue, EditorUser } from '../types/magazine';

export const INITIAL_EDITORS: EditorUser[] = [
  {
    id: 'ed-1',
    email: 'editor@ourlady.edu',
    name: 'Genevieve Beaulieu',
    role: 'Editor-in-Chief',
    grade: "Senior, Class of '26",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-2',
    email: 'julian.vance@ourlady.edu',
    name: 'Julian Vance',
    role: 'Managing Editor',
    grade: "Senior, Class of '26",
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-3',
    email: 'claire.morin@ourlady.edu',
    name: 'Claire Morin',
    role: 'Poetry Editor',
    grade: "Junior, Class of '27",
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-4',
    email: 'marcus.chen@ourlady.edu',
    name: 'Marcus Chen',
    role: 'Art Director',
    grade: "Senior, Class of '26",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-5',
    email: 'dr.holloway@ourlady.edu',
    name: 'Dr. Evelyn Holloway',
    role: 'Faculty Advisor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'issue-vol-34-no-2',
    volume: 34,
    issueNumber: 2,
    title: 'Echoes of the Grotto',
    theme: 'Vigil, Memory & Renewal',
    publishedDate: '2026-02-10',
    semester: 'Winter',
    academicYear: '2025-2026',
    isCurrentIssue: true,
    coverImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&auto=format&fit=crop&q=80',
    coverArtist: 'Marcus Chen (Grade 12)',
    status: 'published',
    foreword: 'Welcome to the Winter 2026 issue of Our Lady Magazine. As cold winds sweep across our quad and frost lines the stone archways of our chapel, we turn inward to examine the quiet sanctuaries we build for ourselves. In this edition, our student poets, essayists, and painters explore the sacredness of ordinary moments: the flicker of votive candles, the geometry of library stairwells, and the silent courage of growing into who we are.',
    editorsNote: 'Selected from over 140 student submissions across all four grades. Heartfelt thanks to our student editorial board and faculty mentors.',
    pieces: [
      {
        id: 'piece-1',
        title: 'Litany for the Seven O’Clock Bell',
        genre: 'Poetry',
        medium: 'Free verse',
        readingTimeMinutes: 3,
        awards: ["Editor's Choice Award", 'First Prize - Poetry'],
        featured: true,
        author: {
          id: 'auth-1',
          name: 'Genevieve Beaulieu',
          grade: "Senior, Class of '26",
          bio: 'Genevieve is the Editor-in-Chief of Our Lady Magazine and an aspiring classicist.'
        },
        excerpt: 'When bronze tolls against bronze above the slate roofs, even the pigeons suspend their frantic arithmetic...',
        content: `When bronze tolls against bronze above the slate roofs,
even the pigeons suspend their frantic arithmetic
in the high eaves of the rotunda.

We stand in homeroom with ties half-knotted,
our boots leaving dark circles of slush
like baptismal fonts upon the terrazzo floor.

Tell me, Mother of Sorrows,
how many mornings does it take to learn
the difference between patience and surrender?

We recite our prayers into our winter wool,
watching our breath turn to steam—
each clause a miniature cloud,
brief as adolescence,
drifting upward toward the gothic rafters.`
      },
      {
        id: 'piece-2',
        title: 'The Blue Hour at Saint Jude’s Corner',
        genre: 'Fiction',
        medium: 'Short Story',
        readingTimeMinutes: 7,
        featured: true,
        author: {
          id: 'auth-2',
          name: 'Mateo Alvarez',
          grade: "Junior, Class of '27",
          bio: 'Mateo writes speculative and literary fiction and runs the school Astronomy Club.'
        },
        excerpt: 'The key to the third-floor darkroom had been taped under the fire extinguisher since 1998, or so the seniors swore...',
        content: `The key to the third-floor darkroom had been taped under the fire extinguisher since 1998, or so the seniors swore. When Mateo turned it in the copper lock, it gave way with a sound like cracked ice.

Inside, the smell was eternal: stop bath, acetic acid, and the faint, sweet dust of forty years of photographic paper. The only illumination was the red safety bulb humming near the ceiling.

"Hold the tongs by the tips," Clara whispered, leaning over the developer tray. Her fingers were stained faint magenta from water-soluble ink. "If you drop the print now, the grain will shatter."

In the tray, bathed in blood-orange light, an image was blooming from the milky paper. First the silhouette of the basilica dome, sharp against the dusk; then the flock of starlings caught mid-turn, like iron filings drawn to an invisible magnet; and finally, sitting alone on the limestone bench below, the boy with his cello case between his knees, waiting for a bus that had ceased running forty minutes prior.

"Look at his hands," Clara said softly. "He isn’t shivering."

They watched the shadows deepen on the silver gelatin, holding their breaths as if exhaling might blow away the silver grains before the chemical fixative could make the second permanent.`
      },
      {
        id: 'piece-3',
        title: 'Studies in Ultramarine and Ochre',
        genre: 'Visual Art',
        medium: 'Oil on linen canvas, 24" x 36"',
        awards: ['Gold Key - Visual Arts'],
        readingTimeMinutes: 1,
        featured: true,
        artUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80',
        author: {
          id: 'auth-3',
          name: 'Marcus Chen',
          grade: "Senior, Class of '26",
          bio: 'Marcus is an oil painter and calligrapher preparing for studies in fine arts and architecture.'
        },
        excerpt: 'An investigation into the light refractance of historical cathedral glass under late autumn sunlight.',
        content: `**Artist Statement:**
This series was painted en plein air along the eastern cloister wall between 4:15 PM and sunset. The palette is restricted entirely to French Ultramarine, Raw Sienna, Titanium White, and Burnt Umber. 

The objective was not architectural realism, but to capture the physical weight of afternoon light passing through hand-blown cobalt glass—how ancient pigments transform dust particles into miniature constellations.`
      },
      {
        id: 'piece-4',
        title: 'Notes on the Architecture of Forgiveness',
        genre: 'Essay',
        medium: 'Personal Non-Fiction',
        readingTimeMinutes: 5,
        awards: ['Excellence in Non-Fiction'],
        author: {
          id: 'auth-4',
          name: 'Therese K. Larson',
          grade: "Sophomore, Class of '28",
          bio: 'Therese plays varsity tennis and writes personal essays on family, theology, and Midwestern winters.'
        },
        excerpt: 'In my grandmother’s kitchen in South Bend, every chipped teacup was kept in the front of the cupboard...',
        content: `In my grandmother’s kitchen in South Bend, every chipped teacup was kept in the front of the cupboard. She maintained that porcelain, like human memory, only becomes honest after it has survived a fall.

When I failed my preliminary Latin exams last November, I walked down to the lake instead of boarding the afternoon bus. The water was the color of zinc. Around the rim of the shoreline, thin sheets of transparent ice had formed around the reeds, locking them in place without breaking their stems.

I thought of Saint Augustine’s definition of grace: that it is not the absence of fracture, but the deliberate choice to inhabit the broken space with warmth. We often mistake perfection for goodness, but holiness is far messier. It looks like second drafts, smeared ink, and returning to the practice room when your fingers are stiff from the cold.`
      }
    ]
  },
  {
    id: 'issue-vol-34-no-1',
    volume: 34,
    issueNumber: 1,
    title: 'Golden Domes & Stained Glass',
    theme: 'Origins, Heritage & Daylight',
    publishedDate: '2025-10-18',
    semester: 'Fall',
    academicYear: '2025-2026',
    isCurrentIssue: false,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    coverArtist: 'Ananya Patel (Grade 11)',
    status: 'published',
    foreword: 'Autumn at Our Lady brings golden foliage against gray stone towers. In this inaugural issue of Volume 34, we celebrate beginnings: freshmen finding their lockers, senior portraits taken beneath the oak trees, and the perennial return of autumn colors.',
    pieces: [
      {
        id: 'piece-5',
        title: 'The Cartography of September',
        genre: 'Poetry',
        medium: 'Sonnet sequence',
        readingTimeMinutes: 2,
        author: {
          id: 'auth-5',
          name: 'Liam O’Donnell',
          grade: "Senior, Class of '26",
          bio: 'Liam is a cellist in the school orchestra and co-captain of the Mock Trial team.'
        },
        excerpt: 'The campus maps they handed out in homeroom did not mention where the sunlight pools at three o’clock...',
        content: `The campus maps they handed out in homeroom
did not mention where the sunlight pools at three o’clock,
nor how the ivy on St. Edward’s Hall turns copper
first at the southern corner, then along the clock.

We measured time in syllabus pages and choir rehearsals,
marking our margins with graphite and nervous grace,
learning that every hall we rush through now
will one day be a memory we cannot replace.`
      },
      {
        id: 'piece-6',
        title: 'Sanctuary of the Unspoken',
        genre: 'Visual Art',
        medium: 'Charcoal & gold leaf on toned paper',
        artUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&auto=format&fit=crop&q=80',
        readingTimeMinutes: 1,
        author: {
          id: 'auth-6',
          name: 'Ananya Patel',
          grade: "Junior, Class of '27",
          bio: 'Ananya specializes in mixed-media drawing and graphic design for student publications.'
        },
        excerpt: 'An exploration of silence and gilding in monastic architecture.',
        content: `**Medium:** Compressed charcoal, 23.75 karat gold leaf, and walnut ink on Strathmore 500 series toned charcoal paper.

Inspired by the contrast between deep shadow within the basilica crypt and the glimmer of gold leaf illuminated by candlelight.`
      }
    ]
  },
  {
    id: 'issue-vol-33-no-2',
    volume: 33,
    issueNumber: 2,
    title: 'Veritas & Petals',
    theme: 'Spring, Transience & Truth',
    publishedDate: '2025-05-12',
    semester: 'Spring',
    academicYear: '2024-2025',
    isCurrentIssue: false,
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop&q=80',
    coverArtist: 'Elena Rostova (Class of 2025)',
    status: 'published',
    foreword: 'Spring brings blooming cherry blossoms along the Notre Dame avenue and the bittersweet farewell of our graduating seniors. Volume 33 Number 2 is an ode to endings that blossom into beginnings.',
    pieces: [
      {
        id: 'piece-7',
        title: 'Commencement at Saint Mary’s Lake',
        genre: 'Poetry',
        medium: 'Prose Poem',
        readingTimeMinutes: 3,
        awards: ["Senior Poet Laureate Citation"],
        author: {
          id: 'auth-7',
          name: 'Elena Rostova',
          grade: "Class of '25 Alumni",
          bio: 'Elena was the 2024-2025 Senior Poet Laureate and now studies English literature.'
        },
        excerpt: 'We tossed our blue graduation caps not into the sky, but onto the lawn where the dandelions had already gone to seed...',
        content: `We tossed our blue graduation caps not into the sky, but onto the lawn where the dandelions had already gone to seed.

When the wind caught the silk tassels, they drifted like compass needles spinning without a pole. For four years we were defined by the bell schedule, the locker combinations, the shared thermoses of tea before first period.

Now the lake reflects an open sky, wide enough to swallow every word we were too shy to speak aloud during sixth period study hall.`
      }
    ]
  },
  {
    id: 'issue-vol-33-no-1',
    volume: 33,
    issueNumber: 1,
    title: 'Quiet Courtyards',
    theme: 'Solitude, Study & Heritage',
    publishedDate: '2024-11-04',
    semester: 'Fall',
    academicYear: '2024-2025',
    isCurrentIssue: false,
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    coverArtist: 'Julian Vance (Class of 2026)',
    status: 'published',
    foreword: 'The cloistered walkways of our school hold decades of student whispers, drafts, and artistic inquiries. Our Fall 2024 collection centers on quiet contemplation in a loud world.',
    pieces: [
      {
        id: 'piece-8',
        title: 'The Monks of South Quad',
        genre: 'Essay',
        medium: 'Historical Reflection',
        readingTimeMinutes: 4,
        author: {
          id: 'auth-8',
          name: 'Julian Vance',
          grade: "Senior, Class of '26",
          bio: 'Julian is Managing Editor and a contributor to the state humanities journal.'
        },
        excerpt: 'Long before the football stadium shook the autumn air, French priests walked these frozen paths with Latin missals...',
        content: `Long before the football stadium shook the autumn air, French priests walked these frozen paths with Latin missals tucked into their wool coats.

They laid brick by brick in the bitter Indiana November of 1842, guided by Father Sorin’s conviction that a school dedicated to Our Lady would become a light in the wilderness. Today, when we sit in the library typing essays on laptops, we inherit that same stubborn faith: that words matter, that truth endures, and that beauty is worth cultivating even in the middle of winter.`
      }
    ]
  }
];
