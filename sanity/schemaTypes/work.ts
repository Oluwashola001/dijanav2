import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work',
  title: 'Musical Works Database',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Database Name',
      type: 'string',
      initialValue: 'Musical Works Catalog',
      readOnly: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categories & Works',
      type: 'array',
      description: 'Manage all musical works categorized by instrument.',
      of: [{
        type: 'object',
        fields: [
          { name: 'id', title: 'Category ID (Internal)', type: 'string', readOnly: true },
          { name: 'title_en', title: 'Category Title (English)', type: 'string' },
          { name: 'title_de', title: 'Category Title (German)', type: 'string' },
          {
            name: 'works',
            title: 'Musical Works in this Category',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'title_en', title: 'Work Title (English)', type: 'string' },
                { name: 'title_de', title: 'Work Title (German)', type: 'string' },
                { name: 'titleItalic', title: 'Italicize Title?', type: 'boolean', initialValue: true },
                { 
                  name: 'details_en', 
                  title: 'Details (English)', 
                  type: 'array', 
                  of: [{ type: 'string' }],
                  description: 'Add a new item for each line. The FIRST line is automatically italicized in the UI.'
                },
                { 
                  name: 'details_de', 
                  title: 'Details (German)', 
                  type: 'array', 
                  of: [{ type: 'string' }]
                },
                { name: 'firstDetailLarger', title: 'Make First Detail Line Larger?', type: 'boolean', initialValue: true },
                { 
                  name: 'audioPath', 
                  title: 'Audio File Path or URL', 
                  type: 'string',
                  description: 'e.g., "/Music/suite.mp3" or a full link to a hosted file.'
                },
                { 
                  name: 'youtubeUrl', 
                  title: 'YouTube Link', 
                  type: 'url' 
                },
              ],
              preview: { select: { title: 'title_en' } }
            }]
          }
        ],
        preview: { select: { title: 'title_en' } }
      }],
      initialValue: [
        {
          id: "strings",
          title_en: "STRING INSTRUMENTS & ENSEMBLE",
          title_de: "STREICHINSTRUMENTE & ENSEMBLE",
          works: [
            { title_en: "Duo – Violin & Violoncello", title_de: "Duo – Violine & Violoncello", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/suite.mp3", youtubeUrl: "https://www.youtube.com/watch?v=WvxSkxnr1bQ", details_en: ["Suite after Folk Melodies from Serbia, Macedonia and Montenegro (2005)", "I. Lament–Dance", "II. Song–Improvisation–Kolo", "Duration: ca. 10 min", "Premiere: Gasteig Cultural Center, Munich (2006)"], details_de: ["Suite nach Volksweisen aus Serbien, Mazedonien und Montenegro (2005)", "I. Klage–Tanz", "II. Lied–Improvisation–Kolo", "Dauer: ca. 10 Min.", "Uraufführung: Gasteig Kulturzentrum, München (2006)"] },
            { title_en: "String Trio – Violin, Viola, Violoncello", title_de: "Streichtrio – Violine, Viola, Violoncello", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Trio.mp3", details_en: ["Con Fretta (2024) – commission by the Munich Philharmonic", "Duration: ca. 10 min", "Premiere: German Embassy, Beijing (2024)"], details_de: ["Con Fretta (2024) – Auftragswerk der Münchner Philharmoniker", "Dauer: ca. 10 Min.", "Uraufführung: Deutsche Botschaft, Peking (2024)"] },
            { title_en: "String Quartet – 2 Violins, Viola, Violoncello", title_de: "Streichquartett – 2 Violinen, Viola, Violoncello", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Quartet.mp3", details_en: ["Memories (2024) – commission by the Munich Philharmonic", "I. For My Mother", "II. Blurred Edges", "Duration: ca. 20 min", "Premiere: Künstlerhaus, Munich (2024)"], details_de: ["Memories (2024) – Auftragswerk der Münchner Philharmoniker", "I. For My Mother", "II. Blurred Edges", "Dauer: ca. 20 Min.", "Uraufführung: Künstlerhaus, München (2024)"] },
            { title_en: "Piano Trio – Violin, Violoncello, Piano", title_de: "Klaviertrio – Violine, Violoncello, Klavier", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Website Sundance MP3.mp3", youtubeUrl: "https://www.youtube.com/watch?v=qzC-frjrHR0", details_en: ["Sun Dance from the cycle Light Plays (2015)", "Duration: ca. 9 min", "Premiere: Alfred Schnittke Academy, Hamburg (2016)"], details_de: ["Sonnentanz aus dem Zyklus Lichtspiele (2015)", "Dauer: ca. 9 Min.", "Uraufführung: Alfred-Schnittke-Akademie, Hamburg (2016)"] },
            { title_en: "Violin & Piano", title_de: "Violine & Klavier", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/lichtspiele.mp3", youtubeUrl: "https://www.youtube.com/watch?v=Mtyn18iBWik", details_en: ["Light Plays (2012)", "I. Reflections / Darkness", "II. Luminance", "Duration: ca. 10 min", "Premiere: Gasteig Cultural Center, Munich (2013)"], details_de: ["Lichtspiele (2012)", "I. Reflexionen / Dunkelheit", "II. Luminanz", "Dauer: ca. 10 Min.", "Uraufführung: Gasteig Kulturzentrum, München (2013)"] },
            { title_en: "Violoncello Solo", title_de: "Violoncello Solo", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Website Singing Flame MP3.mp3", youtubeUrl: "https://www.youtube.com/watch?v=yWdFsA8GqxQ", details_en: ["Song of the Flame from Light Plays (2016)", "Duration: ca. 7 min", "Premiere: Alfred Schnittke Academy, Hamburg (2016)"], details_de: ["Lied der Flamme aus Lichtspiele (2016)", "Dauer: ca. 7 Min.", "Uraufführung: Alfred-Schnittke-Akademie, Hamburg (2016)"] }
          ]
        },
        {
          id: "piano",
          title_en: "PIANO & ENSEMBLE",
          title_de: "KLAVIER & ENSEMBLE",
          works: [
            { title_en: "Two Pianos", title_de: "Zwei Klaviere", titleItalic: true, firstDetailLarger: true, details_en: ["Black and White from Light Plays (2023/24)", "Duration: ca. 13 min", "Premiere: Theatre Erfurt, Grand Hall (2024)"], details_de: ["Schwarz und Weiß aus Lichtspiele (2023/24)", "Dauer: ca. 13 Min.", "Uraufführung: Theater Erfurt, Großes Haus (2024)"] },
            { title_en: "Piano & 21 Tibetan Singing Bowls", title_de: "Klavier & 21 tibetische Klangschalen", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/No Tinnitus Klavier Boskovic.mp3", details_en: ["No Tinnitus (2011)", "Duration: ca. 17 min", "Premiere: Gasteig Cultural Center, Munich (2011)"], details_de: ["No Tinnitus (2011)", "Dauer: ca. 17 Min.", "Uraufführung: Gasteig Kulturzentrum, München (2011)"] }
          ]
        },
        {
          id: "flute",
          title_en: "FLUTE & ENSEMBLE",
          title_de: "FLÖTE & ENSEMBLE",
          works: [
            { title_en: "Flute & Percussion", title_de: "Flöte & Schlagwerk", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Website Zwischen Ost und West I MP3.mp3", details_en: ["Between East and West I (1999)", "Duration: ca. 5 min", "Premiere: Freies Musikzentrum Munich (1999)"], details_de: ["Zwischen Ost und West I (1999)", "Dauer: ca. 5 Min.", "Uraufführung: Freies Musikzentrum München (1999)"] },
            { title_en: "Solo Flute", title_de: "Flöte solo", titleItalic: true, firstDetailLarger: true, details_en: ["Between East and West II (1999 / rev. 2016)", "Duration: ca. 4 min", "Premiere: Stadtsaal Kaufbeuren (1999)"], details_de: ["Zwischen Ost und West II (1999 / rev. 2016)", "Dauer: ca. 4 Min.", "Uraufführung: Stadtsaal Kaufbeuren (1999)"] },
            { title_en: "Flute & Organ", title_de: "Flöte & Orgel", titleItalic: true, firstDetailLarger: true, details_en: ["Conversations with Death – Prelude, Quasi una Toccata, Postlude (2014)", "Duration: ca. 9 min", "Premiere: Altach Organ Soirée (2014)"], details_de: ["Gespräche mit dem Tod – Präludium, Quasi una Toccata, Postludium (2014)", "Dauer: ca. 9 Min.", "Uraufführung: Altacher Orgelsoirée (2014)"] }
          ]
        },
        {
          id: "young",
          title_en: "MUSIC FOR YOUTH",
          title_de: "MUSIK FÜR DIE JUGEND",
          works: [
            { title_en: "Solo Flute", title_de: "Flöte solo", titleItalic: true, firstDetailLarger: true, details_en: ["An Encounter with the Sea (1998)", "Duration: ca. 4 min", "Premiere: Town Hall, Kaufbeuren (1998)"], details_de: ["Begegnung mit dem Meer (1998)", "Dauer: ca. 4 Min.", "Uraufführung: Rathaussaal, Kaufbeuren (1998)"] },
            { title_en: "Two Flutes", title_de: "Zwei Flöten", titleItalic: true, firstDetailLarger: true, details_en: ["Catch Me If You Can (2021)", "Premiere: Municipal Music School Munich (2022)"], details_de: ["Catch Me If You Can (2021)", "Uraufführung: Städtische Sing- und Musikschule München (2022)"] },
            { title_en: "Three Flutes & Acting", title_de: "Drei Flöten & Schauspiel", titleItalic: true, firstDetailLarger: true, details_en: ["Enchanted Girls (2016)", "Duration: ca. 4 min", "Premiere: Jugend musiziert Competition, Munich (2017)"], details_de: ["Verzauberte Mädchen (2016)", "Dauer: ca. 4 Min.", "Uraufführung: Jugend musiziert Wettbewerb, München (2017)"] },
            { title_en: "Flute & Piano", title_de: "Flöte & Klavier", titleItalic: true, firstDetailLarger: true, details_en: ["Night Flight (2015)", "Dance Monkey (2015)", "Premiere: Jugend musiziert Competition (2016)"], details_de: ["Night Flight (2015)", "Dance Monkey (2015)", "Uraufführung: Jugend musiziert Wettbewerb (2016)"] },
            { title_en: "Flute & Tape", title_de: "Flöte & Zuspielung (Tape)", titleItalic: true, firstDetailLarger: true, details_en: ["Between East and West (2016)", "Duration: ca. 7 min", "First Prize & Special Award, Jugend musiziert (2017)", "Premiere: Carl Orff Hall, Munich"], details_de: ["Zwischen Ost und West (2016)", "Dauer: ca. 7 Min.", "Erster Preis & Sonderpreis, Jugend musiziert (2017)", "Uraufführung: Carl-Orff-Saal, München"] }
          ]
        },
        {
          id: "chamber",
          title_en: "CHAMBER MUSIC – LARGER ENSEMBLES",
          title_de: "KAMMERMUSIK – GRÖSSERE BESETZUNGEN",
          works: [
            { title_en: "Sextet – Flute, Violin, Clarinet, Violoncello, Piano, Percussion", title_de: "Sextett – Flöte, Violine, Klarinette, Violoncello, Klavier, Schlagwerk", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/versus II.mp3", youtubeUrl: "https://www.youtube.com/watch?v=qK4EA-K2VO4", details_en: ["Versus Vox Integra (2007)", "Canticum – Versus – Vox – Integra", "Duration: ca. 12 min", "Premiere: BEMUS International Music Festival, Belgrade (2007)"], details_de: ["Versus Vox Integra (2007)", "Canticum – Versus – Vox – Integra", "Dauer: ca. 12 Min.", "Uraufführung: BEMUS International Music Festival, Belgrad (2007)"] },
            { title_en: "Sextet – Piano, 2 Harps, 2 Flutes, Mezzo-Soprano", title_de: "Sextett – Klavier, 2 Harfen, 2 Flöten, Mezzosopran", titleItalic: true, firstDetailLarger: true, details_en: ["Three Pieces after Spiritual Poets (2000/01)", "Duration: ca. 10 min", "Premiere: Graz Opera House (2001)"], details_de: ["Drei Stücke nach spirituellen Dichtern (2000/01)", "Dauer: ca. 10 Min.", "Uraufführung: Opernhaus Graz (2001)"] }
          ]
        },
        {
          id: "string_orch",
          title_en: "STRING ORCHESTRA",
          title_de: "STREICHORCHESTER",
          works: [
            { title_en: "Divertimento (2007/08)", title_de: "Divertimento (2007/08)", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/divertimento_f_strings.mp3", details_en: ["Duration: ca. 5:30 min", "Premiere: Gasteig Cultural Center, Munich (2008)"], details_de: ["Dauer: ca. 5:30 Min.", "Uraufführung: Gasteig Kulturzentrum, München (2008)"] },
            { title_en: "Concerto for Strings (2008/2009)", title_de: "Concerto for Strings (2008/2009)", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/concerto_f_strings.mp3", youtubeUrl: "https://m.youtube.com/watch?v=atZjR7nn5gA", details_en: ["Duration: ca. 15 min", "Premiere: Kolarac Hall, Belgrade – BEMUS Festival (2009)"], details_de: ["Dauer: ca. 15 Min.", "Uraufführung: Kolarac-Saal, Belgrad – BEMUS Festival (2009)"] }
          ]
        },
        {
          id: "orch",
          title_en: "ORCHESTRA",
          title_de: "ORCHESTER",
          works: [
            { title_en: "One (2017/18) – for symphony orchestra and two archaic instruments", title_de: "One (2017/18) – für Sinfonieorchester und zwei archaische Instrumente", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/ONE Orchesterstuck Boskovic.mp3", details_en: ["(one wind and one string instrument from spiritual traditions of the world)", "Duration: ca. 17 min", "Premiere: Hamburg University of Music and Theatre (2018)"], details_de: ["(ein Blas- und ein Saiteninstrument aus spirituellen Traditionen der Welt)", "Dauer: ca. 17 Min.", "Uraufführung: Hochschule für Musik und Theater Hamburg (2018)"] },
            { title_en: "Danse Archaïque", title_de: "Danse Archaïque", titleItalic: true, firstDetailLarger: true, details_en: ["Duration: ca. 5 min"], details_de: ["Dauer: ca. 5 Min."] }
          ]
        },
        {
          id: "voice",
          title_en: "VOICE & ENSEMBLE",
          title_de: "GESANG & ENSEMBLE",
          works: [
            { title_en: "Voice & Piano", title_de: "Gesang & Klavier", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/trost.mp3", youtubeUrl: "https://www.youtube.com/watch?v=Z_2WtxWsMIA", details_en: ["Two Songs (2004)", "I. Consolation", "II. Song of the Blackbird", "Duration: ca. 6 min", "Versions for mezzo-soprano and soprano", "Premiere: Max-Joseph-Saal, Munich Residenz (2004)"], details_de: ["Zwei Lieder (2004)", "I. Trost", "II. Amsellied", "Dauer: ca. 6 Min.", "Fassungen für Mezzosopran und Sopran", "Uraufführung: Max-Joseph-Saal, Münchner Residenz (2004)"] },
            { title_en: "It Is So Beautiful… (2015/16) – Concert piece from Transit", title_de: "Es ist so schön… (2015/16) – Konzertstück aus Transit", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Es ist so schon.mp3", youtubeUrl: "https://www.youtube.com/watch?v=GS2njJ_VuhA", details_en: ["Duration: ca. 6 min", "Premiere: Laeiszhalle, Hamburg (2016)"], details_de: ["Dauer: ca. 6 Min.", "Uraufführung: Laeiszhalle, Hamburg (2016)"] },
            { title_en: "Multimedia Work", title_de: "Multimedia-Werk", titleItalic: true, firstDetailLarger: true, details_en: ["Transit (2016) – mezzo-soprano, accordion & video", "Duration: ca. 9 min", "Premiere: Resonanzraum, Hamburg (2016)"], details_de: ["Transit (2016) – Mezzosopran, Akkordeon & Video", "Dauer: ca. 9 Min.", "Uraufführung: Resonanzraum, Hamburg (2016)"] },
            { title_en: "Vocal Ensemble", title_de: "Vokalensemble", titleItalic: true, firstDetailLarger: true, details_en: ["Eternal Question (1999/2000) – vocal ensemble & double bass", "Duration: ca. 5 min", "Premiere: Kunsthaus Kaufbeuren (2000)"], details_de: ["Ewige Frage (1999/2000) – Vokalensemble & Kontrabass", "Dauer: ca. 5 Min.", "Uraufführung: Kunsthaus Kaufbeuren (2000)"] },
            { title_en: "Media Vita – Ātman Aeternus (2025) – for vocal ensemble (SSATTTBB) and 2 horns or natural horns", title_de: "Media Vita – Ātman Aeternus (2025) – für Vokalensemble (SSATTTBB) und 2 Hörner oder Naturhörner", titleItalic: true, firstDetailLarger: true, details_en: ["A contemplation after Media Vita in Morte sumus and Vedic philosophy"], details_de: ["Eine Kontemplation nach Media Vita in Morte sumus und vedischer Philosophie"] }
          ]
        },
        {
          id: "choir",
          title_en: "CHOIR",
          title_de: "CHOR",
          works: [
            { title_en: "Dona nobis pacem – Shanti for mixed choir & percussion", title_de: "Dona nobis pacem – Shanti für gemischten Chor & Schlagwerk", titleItalic: true, firstDetailLarger: true, audioPath: "/Music/Chor Dona nobis pacem Shanti Boskovic.mp3", details_en: ["Duration: ca. 5 min", "Premiere: St. Reinoldi Church, Dortmund / Deutschlandradio (2017)"], details_de: ["Dauer: ca. 5 Min.", "Uraufführung: St. Reinoldi-Kirche, Dortmund / Deutschlandradio (2017)"] },
            { title_en: "Dona nobis pacem – Shanti for mixed choir", title_de: "Dona nobis pacem – Shanti für gemischten Chor", titleItalic: true, firstDetailLarger: true, details_en: ["Duration: ca. 4:30 min"], details_de: ["Dauer: ca. 4:30 Min."] },
            { title_en: "Ave Maria / Bogorodice djevo for mixed choir & tenor solo", title_de: "Ave Maria / Bogorodice djevo für gemischten Chor & Tenorsolo", titleItalic: true, firstDetailLarger: true, details_en: ["Duration: ca. 4:50 min", "Premiere: St. Sylvester's Church, Munich (2015)"], details_de: ["Dauer: ca. 4:50 Min.", "Uraufführung: St. Sylvester Kirche, München (2015)"] }
          ]
        }
      ]
    })
  ]
})