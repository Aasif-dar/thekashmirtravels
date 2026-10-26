// SEO visitor guides shown on destination pages, keyed by destination slug.
//
// Destination descriptions in the admin are short, so each page also carries a
// factual "what to know" section from here. Distances and seasons are general
// and approximate; review them against what your team tells guests. A
// destination whose slug is not listed simply shows no guide.

export interface DestinationGuide {
  about: string[]; // paragraphs
  bestTime: string;
  gettingThere: string;
}

export const destinationGuides: Record<string, DestinationGuide> = {
  srinagar: {
    about: [
      "Srinagar is the largest city in the Kashmir Valley, built along the Jhelum river and around Dal Lake. Most trips begin here: a shikara ride at sunrise or sunset, a night on a traditional houseboat, and slow afternoons in the Mughal gardens of Nishat Bagh and Shalimar Bagh.",
      "Beyond the lake, the old city rewards time on foot. The lanes around Jamia Masjid and Zaina Kadal hold wooden shrines, bakeries and workshops where papier-mâché and pashmina are still made by hand. Char Chinar island, Hazratbal Shrine and the view from Shankaracharya Hill are other regular stops.",
    ],
    bestTime:
      "April to October is the most comfortable season for the lake, gardens and houseboats, and spring brings blossom and tulip season. December to February is cold with occasional snow, and a quieter time to visit.",
    gettingThere:
      "Srinagar has its own airport, Sheikh ul-Alam International Airport, with flights from major Indian cities. It is also the starting point for road trips to Gulmarg, Pahalgam and Sonamarg.",
  },
  gulmarg: {
    about: [
      "Gulmarg, meaning “meadow of flowers”, is a high-altitude bowl of meadows ringed by pine forest and the Pir Panjal range. It is best known for the Gulmarg Gondola, one of the highest cable cars in the world, which carries visitors up toward Apharwat Peak, and for skiing and snow sports in winter.",
      "In summer the same slopes turn green and open up for meadow walks, horse rides and treks toward Alpather Lake, which stays frozen until early summer.",
    ],
    bestTime:
      "Roughly December to March is the season for snow and skiing, and clear days give the best views from the gondola. From May to September the meadows are green and walking is easy. Heavy snow can affect road access and gondola operations, so keep some flexibility in winter plans.",
    gettingThere:
      "Gulmarg is about 50 km from Srinagar, usually around two hours by road. The final stretch climbs steadily from the town of Tangmarg.",
  },
  pahalgam: {
    about: [
      "Pahalgam, meaning “village of shepherds”, sits where the streams of the Lidder river meet, with pine forest and meadows on every side. It suits slower days: riverside walks, picnics and short drives rather than a long list of sights.",
      "Aru Valley, Betaab Valley and Chandanwari are the classic outings from the town, each reached by a short drive and best enjoyed unhurried.",
    ],
    bestTime:
      "April to October is easiest for valley visits and walks. Summer months are generally the busiest. In winter Pahalgam is cold and snowy, and some higher points can be hard to reach.",
    gettingThere:
      "Pahalgam is about 95 km from Srinagar, usually 2.5 to 3 hours by road via Anantnag.",
  },
  sonamarg: {
    about: [
      "Sonamarg, the “meadow of gold”, is an alpine valley on the Sindh river, with snow-capped peaks above it on the road toward Zoji La. The main outing is Thajiwas Glacier, reached on foot or by pony from the main meadow, with open meadows and mountain streams along the way.",
    ],
    bestTime:
      "Roughly May to October, when the road is open and the meadows are accessible. Sonamarg receives very heavy snowfall in winter and road access can be interrupted, so it is often visited as a day trip from Srinagar in the warmer months.",
    gettingThere:
      "Sonamarg is about 80 km from Srinagar, usually 2.5 to 3 hours by road along the Sindh valley.",
  },
};
