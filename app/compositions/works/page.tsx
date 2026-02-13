'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
// Ensure you have installed: npm install wavesurfer.js @wavesurfer/react
import { useWavesurfer } from '@wavesurfer/react';

type Language = 'en' | 'de';

// --- TRANSLATION CONTENT ---
const CONTENT = {
  en: {
    nav: [
      { id: "strings", label: "Strings & Ensemble" },
      { id: "piano", label: "Piano & Ensemble" },
      { id: "flute", label: "Flute & Ensemble" },
      { id: "young", label: "Youth Music" },
      { id: "chamber", label: "Chamber Music (Large)" },
      { id: "string_orch", label: "String Orchestra" },
      { id: "orch", label: "Orchestra" },
      { id: "voice", label: "Voice & Ensemble" },
      { id: "choir", label: "Choir" },
      { id: "order", label: "Order Request" },
    ],
    categories: [
      {
        id: "strings",
        title: "STRING INSTRUMENTS & ENSEMBLE",
        works: [
          {
            title: "Duo – Violin & Violoncello",
            details: [
              "Suite after Folk Melodies from Serbia, Macedonia and Montenegro (2005)",
              "I. Lament–Dance",
              "II. Song–Improvisation–Kolo",
              "Duration: ca. 10 min",
              "Premiere: Gasteig Cultural Center, Munich (2006)"
            ],
            audio: "/Music/suite.mp3",
            youtube: "https://www.youtube.com/watch?v=WvxSkxnr1bQ"
          },
          {
            title: "String Trio – Violin, Viola, Violoncello",
            details: [
              "Con Fretta (2024) – commission by the Munich Philharmonic",
              "Duration: ca. 10 min",
              "Premiere: German Embassy, Beijing (2024)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "String Quartet – 2 Violins, Viola, Violoncello",
            details: [
              "Memories (2024) – commission by the Munich Philharmonic",
              "I. For My Mother",
              "II. Blurred Edges",
              "Duration: ca. 20 min",
              "Premiere: Künstlerhaus, Munich (2024)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Piano Trio – Violin, Violoncello, Piano",
            details: [
              "Sun Dance from the cycle Light Plays (2015)",
              "Duration: ca. 9 min",
              "Premiere: Alfred Schnittke Academy, Hamburg (2016)"
            ],
            audio: "/Music/Website Sundance MP3.mp3",
            youtube: "https://www.youtube.com/watch?v=qzC-frjrHR0"
          },
          {
            title: "Violin & Piano",
            details: [
              "Light Plays (2012)",
              "I. Reflections / Darkness",
              "II. Luminance",
              "Duration: ca. 10 min",
              "Premiere: Gasteig Cultural Center, Munich (2013)"
            ],
            audio: "/Music/lichtspiele.mp3", 
            youtube: "https://www.youtube.com/watch?v=Mtyn18iBWik"
          },
          {
            title: "Violoncello Solo",
            details: [
              "Song of the Flame from Light Plays (2016)",
              "Duration: ca. 7 min",
              "Premiere: Alfred Schnittke Academy, Hamburg (2016)"
            ],
            audio: "/Music/Website Singing Flame MP3.mp3",
            youtube: "https://www.youtube.com/watch?v=yWdFsA8GqxQ"
          }
        ]
      },
      {
        id: "piano",
        title: "PIANO & ENSEMBLE",
        works: [
          {
            title: "Two Pianos",
            details: [
              "Black and White from Light Plays (2023/24)",
              "Duration: ca. 13 min",
              "Premiere: Theatre Erfurt, Grand Hall (2024)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Piano & 21 Tibetan Singing Bowls",
            details: [
              "No Tinnitus (2011)",
              "Duration: ca. 17 min",
              "Premiere: Gasteig Cultural Center, Munich (2011)"
            ],
            audio: "/Music/No Tinnitus Klavier Boskovic.mp3",
            youtube: null
          }
        ]
      },
      {
        id: "flute",
        title: "FLUTE & ENSEMBLE",
        works: [
          {
            title: "Flute & Percussion",
            details: [
              "Between East and West I (1999)",
              "Duration: ca. 5 min",
              "Premiere: Freies Musikzentrum Munich (1999)"
            ],
            audio: "/Music/Website Zwischen Ost und West I MP3.mp3",
            youtube: null
          },
          {
            title: "Solo Flute",
            details: [
              "Between East and West II (1999 / rev. 2016)",
              "Duration: ca. 4 min",
              "Premiere: Stadtsaal Kaufbeuren (1999)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Flute & Organ",
            details: [
              "Conversations with Death – Prelude, Quasi una Toccata, Postlude (2014)",
              "Duration: ca. 9 min",
              "Premiere: Altach Organ Soirée (2014)"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "young",
        title: "MUSIC FOR YOUTH",
        works: [
          {
            title: "Solo Flute",
            details: [
              "An Encounter with the Sea (1998)",
              "Duration: ca. 4 min",
              "Premiere: Town Hall, Kaufbeuren (1998)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Two Flutes",
            details: [
              "Catch Me If You Can (2021)",
              "Premiere: Municipal Music School Munich (2022)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Three Flutes & Acting",
            details: [
              "Enchanted Girls (2016)",
              "Duration: ca. 4 min",
              "Premiere: Jugend musiziert Competition, Munich (2017)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Flute & Piano",
            details: [
              "Night Flight (2015)",
              "Dance Monkey (2015)",
              "Premiere: Jugend musiziert Competition (2016)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Flute & Tape",
            details: [
              "Between East and West (2016)",
              "Duration: ca. 7 min",
              "First Prize & Special Award, Jugend musiziert (2017)",
              "Premiere: Carl Orff Hall, Munich"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "chamber",
        title: "CHAMBER MUSIC – LARGER ENSEMBLES",
        works: [
          {
            title: "Sextet – Flute, Violin, Clarinet, Violoncello, Piano, Percussion",
            details: [
              "Versus Vox Integra (2007)",
              "Canticum – Versus – Vox – Integra",
              "Duration: ca. 12 min",
              "Premiere: BEMUS International Music Festival, Belgrade (2007)"
            ],
            audio: "/Music/versus II.mp3",
            youtube: "https://www.youtube.com/watch?v=qK4EA-K2VO4"
          },
          {
            title: "Sextet – Piano, 2 Harps, 2 Flutes, Mezzo-Soprano",
            details: [
              "Three Pieces after Spiritual Poets (2000/01)",
              "Duration: ca. 10 min",
              "Premiere: Graz Opera House (2001)"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "string_orch",
        title: "STRING ORCHESTRA",
        works: [
          {
            title: "Divertimento (2007/08)",
            details: [
              "Duration: ca. 5:30 min",
              "Premiere: Gasteig Cultural Center, Munich (2008)"
            ],
            audio: "/Music/divertimento_f_strings.mp3",
            youtube: null
          },
          {
            title: "Concerto for Strings (2008/2009)",
            details: [
              "Duration: ca. 15 min",
              "Premiere: Kolarac Hall, Belgrade – BEMUS Festival (2009)"
            ],
            audio: "/Music/concerto_f_strings.mp3",
            youtube: null
          }
        ]
      },
      {
        id: "orch",
        title: "ORCHESTRA",
        works: [
          {
            title: "One (2017/18) – for symphony orchestra and two archaic instruments",
            details: [
              "(one wind and one string instrument from spiritual traditions of the world)",
              "Duration: ca. 17 min",
              "Premiere: Hamburg University of Music and Theatre (2018)"
            ],
            audio: "/Music/ONE Orchesterstuck Boskovic.mp3",
            youtube: null
          },
          {
            title: "Danse Archaïque",
            details: [
              "Duration: ca. 5 min"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "voice",
        title: "VOICE & ENSEMBLE",
        works: [
          {
            title: "Voice & Piano",
            details: [
              "Two Songs (2004)",
              "I. Consolation",
              "II. Song of the Blackbird",
              "Duration: ca. 6 min",
              "Versions for mezzo-soprano and soprano",
              "Premiere: Max-Joseph-Saal, Munich Residenz (2004)"
            ],
            audio: "/Music/trost.mp3",
            youtube: "https://www.youtube.com/watch?v=Z_2WtxWsMIA"
          },
          {
            title: "It Is So Beautiful… (2015/16) – Concert piece from Transit",
            details: [
              "Duration: ca. 6 min",
              "Premiere: Laeiszhalle, Hamburg (2016)"
            ],
            audio: "/Music/Es ist so schon.mp3",
            youtube: "https://www.youtube.com/watch?v=tE3DgpMd5B8"
          },
          {
            title: "Multimedia Work",
            details: [
              "Transit (2016) – mezzo-soprano, accordion & video",
              "Duration: ca. 9 min",
              "Premiere: Resonanzraum, Hamburg (2016)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Vocal Ensemble",
            details: [
              "Eternal Question (1999/2000) – vocal ensemble & double bass",
              "Duration: ca. 5 min",
              "Premiere: Kunsthaus Kaufbeuren (2000)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Media Vita – Ātman Aeternus (2025) – for vocal ensemble (SSATTTBB) and 2 horns or natural horns",
            details: [
              "A contemplation after Media Vita in Morte sumus and Vedic philosophy"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "choir",
        title: "CHOIR",
        works: [
          {
            title: "Dona nobis pacem – Shanti for mixed choir & percussion",
            details: [
              "Duration: ca. 5 min",
              "Premiere: St. Reinoldi Church, Dortmund / Deutschlandradio (2017)"
            ],
            audio: "/Music/Chor Dona nobis pacem Shanti Boskovic.mp3",
            youtube: null
          },
          {
            title: "Dona nobis pacem – Shanti for mixed choir",
            details: [
              "Duration: ca. 4:30 min"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Ave Maria / Bogorodice djevo for mixed choir & tenor solo",
            details: [
              "Duration: ca. 4:50 min",
              "Premiere: St. Sylvester's Church, Munich (2015)"
            ],
            audio: null,
            youtube: null
          }
        ]
      }
    ],
    order: {
      title: "ORDER REQUEST",
      text: "Dear visitors*, for many of the listed works you can order the sheet music if you are interested. Please enter your contact details and exact order description below.",
      placeholder: "Example: I would like to order the score for 'Light Plays'. My contact info is...",
      button: "Send Order Request"
    }
  },
  de: {
    nav: [
      { id: "strings", label: "Streicher & Ensemble" },
      { id: "piano", label: "Klavier & Ensemble" },
      { id: "flute", label: "Flöte & Ensemble" },
      { id: "young", label: "Musik für Jugend" },
      { id: "chamber", label: "Kammermusik (Groß)" },
      { id: "string_orch", label: "Streichorchester" },
      { id: "orch", label: "Orchester" },
      { id: "voice", label: "Stimme & Ensemble" },
      { id: "choir", label: "Chor" },
      { id: "order", label: "Bestellanfrage" },
    ],
    categories: [
      {
        id: "strings",
        title: "STREICHINSTRUMENTE & ENSEMBLE",
        works: [
          {
            title: "Duo – Violine & Violoncello",
            details: [
              "Suite nach Volksweisen aus Serbien, Mazedonien und Montenegro (2005)",
              "I. Klage–Tanz",
              "II. Lied–Improvisation–Kolo",
              "Dauer: ca. 10 Min.",
              "Uraufführung: Gasteig Kulturzentrum, München (2006)"
            ],
            audio: "/Music/suite.mp3",
            youtube: "https://www.youtube.com/watch?v=WvxSkxnr1bQ"
          },
          {
            title: "Streichtrio – Violine, Viola, Violoncello",
            details: [
              "Con Fretta (2024) – Auftragswerk der Münchner Philharmoniker",
              "Dauer: ca. 10 Min.",
              "Uraufführung: Deutsche Botschaft, Peking (2024)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Streichquartett – 2 Violinen, Viola, Violoncello",
            details: [
              "Memories (2024) – Auftragswerk der Münchner Philharmoniker",
              "I. For My Mother",
              "II. Blurred Edges",
              "Dauer: ca. 20 Min.",
              "Uraufführung: Künstlerhaus, München (2024)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Klaviertrio – Violine, Violoncello, Klavier",
            details: [
              "Sonnentanz aus dem Zyklus Lichtspiele (2015)",
              "Dauer: ca. 9 Min.",
              "Uraufführung: Alfred-Schnittke-Akademie, Hamburg (2016)"
            ],
            audio: "/Music/Website Sundance MP3.mp3",
            youtube: "https://www.youtube.com/watch?v=qzC-frjrHR0"
          },
          {
            title: "Violine & Klavier",
            details: [
              "Lichtspiele (2012)",
              "I. Reflexionen / Dunkelheit",
              "II. Luminanz",
              "Dauer: ca. 10 Min.",
              "Uraufführung: Gasteig Kulturzentrum, München (2013)"
            ],
            audio: "/Music/lichtspiele.mp3", 
            youtube: "https://www.youtube.com/watch?v=Mtyn18iBWik"
          },
          {
            title: "Violoncello Solo",
            details: [
              "Lied der Flamme aus Lichtspiele (2016)",
              "Dauer: ca. 7 Min.",
              "Uraufführung: Alfred-Schnittke-Akademie, Hamburg (2016)"
            ],
            audio: "/Music/Website Singing Flame MP3.mp3",
            youtube: "https://www.youtube.com/watch?v=yWdFsA8GqxQ"
          }
        ]
      },
      {
        id: "piano",
        title: "KLAVIER & ENSEMBLE",
        works: [
          {
            title: "Zwei Klaviere",
            details: [
              "Schwarz und Weiß aus Lichtspiele (2023/24)",
              "Dauer: ca. 13 Min.",
              "Uraufführung: Theater Erfurt, Großes Haus (2024)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Klavier & 21 tibetische Klangschalen",
            details: [
              "No Tinnitus (2011)",
              "Dauer: ca. 17 Min.",
              "Uraufführung: Gasteig Kulturzentrum, München (2011)"
            ],
            audio: "/Music/No Tinnitus Klavier Boskovic.mp3",
            youtube: null
          }
        ]
      },
      {
        id: "flute",
        title: "FLÖTE & ENSEMBLE",
        works: [
          {
            title: "Flöte & Schlagwerk",
            details: [
              "Zwischen Ost und West I (1999)",
              "Dauer: ca. 5 Min.",
              "Uraufführung: Freies Musikzentrum München (1999)"
            ],
            audio: "/Music/Website Zwischen Ost und West I MP3.mp3",
            youtube: null
          },
          {
            title: "Flöte solo",
            details: [
              "Zwischen Ost und West II (1999 / rev. 2016)",
              "Dauer: ca. 4 Min.",
              "Uraufführung: Stadtsaal Kaufbeuren (1999)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Flöte & Orgel",
            details: [
              "Gespräche mit dem Tod – Präludium, Quasi una Toccata, Postludium (2014)",
              "Dauer: ca. 9 Min.",
              "Uraufführung: Altacher Orgelsoirée (2014)"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "young",
        title: "MUSIK FÜR DIE JUGEND",
        works: [
          {
            title: "Flöte solo",
            details: [
              "Begegnung mit dem Meer (1998)",
              "Dauer: ca. 4 Min.",
              "Uraufführung: Rathaussaal, Kaufbeuren (1998)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Zwei Flöten",
            details: [
              "Catch Me If You Can (2021)",
              "Uraufführung: Städtische Sing- und Musikschule München (2022)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Drei Flöten & Schauspiel",
            details: [
              "Verzauberte Mädchen (2016)",
              "Dauer: ca. 4 Min.",
              "Uraufführung: Jugend musiziert Wettbewerb, München (2017)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Flöte & Klavier",
            details: [
              "Night Flight (2015)",
              "Dance Monkey (2015)",
              "Uraufführung: Jugend musiziert Wettbewerb (2016)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Flöte & Zuspielung (Tape)",
            details: [
              "Zwischen Ost und West (2016)",
              "Dauer: ca. 7 Min.",
              "Erster Preis & Sonderpreis, Jugend musiziert (2017)",
              "Uraufführung: Carl-Orff-Saal, München"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "chamber",
        title: "KAMMERMUSIK – GRÖSSERE BESETZUNGEN",
        works: [
          {
            title: "Sextett – Flöte, Violine, Klarinette, Violoncello, Klavier, Schlagwerk",
            details: [
              "Versus Vox Integra (2007)",
              "Canticum – Versus – Vox – Integra",
              "Dauer: ca. 12 Min.",
              "Uraufführung: BEMUS International Music Festival, Belgrad (2007)"
            ],
            audio: "/Music/versus II.mp3",
            youtube: "https://www.youtube.com/watch?v=qK4EA-K2VO4"
          },
          {
            title: "Sextett – Klavier, 2 Harfen, 2 Flöten, Mezzosopran",
            details: [
              "Drei Stücke nach spirituellen Dichtern (2000/01)",
              "Dauer: ca. 10 Min.",
              "Uraufführung: Opernhaus Graz (2001)"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "string_orch",
        title: "STREICHORCHESTER",
        works: [
          {
            title: "Divertimento (2007/08)",
            details: [
              "Dauer: ca. 5:30 Min.",
              "Uraufführung: Gasteig Kulturzentrum, München (2008)"
            ],
            audio: "/Music/divertimento_f_strings.mp3",
            youtube: null
          },
          {
            title: "Concerto for Strings (2008/2009)",
            details: [
              "Dauer: ca. 15 Min.",
              "Uraufführung: Kolarac-Saal, Belgrad – BEMUS Festival (2009)"
            ],
            audio: "/Music/concerto_f_strings.mp3",
            youtube: null
          }
        ]
      },
      {
        id: "orch",
        title: "ORCHESTER",
        works: [
          {
            title: "One (2017/18) – für Sinfonieorchester und zwei archaische Instrumente",
            details: [
              "(ein Blas- und ein Saiteninstrument aus spirituellen Traditionen der Welt)",
              "Dauer: ca. 17 Min.",
              "Uraufführung: Hochschule für Musik und Theater Hamburg (2018)"
            ],
            audio: "/Music/ONE Orchesterstuck Boskovic.mp3",
            youtube: null
          },
          {
            title: "Danse Archaïque",
            details: [
              "Dauer: ca. 5 Min."
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "voice",
        title: "GESANG & ENSEMBLE",
        works: [
          {
            title: "Gesang & Klavier",
            details: [
              "Zwei Lieder (2004)",
              "I. Trost",
              "II. Amsellied",
              "Dauer: ca. 6 Min.",
              "Fassungen für Mezzosopran und Sopran",
              "Uraufführung: Max-Joseph-Saal, Münchner Residenz (2004)"
            ],
            audio: "/Music/trost.mp3",
            youtube: "https://www.youtube.com/watch?v=Z_2WtxWsMIA"
          },
          {
            title: "Es ist so schön… (2015/16) – Konzertstück aus Transit",
            details: [
              "Dauer: ca. 6 Min.",
              "Uraufführung: Laeiszhalle, Hamburg (2016)"
            ],
            audio: "/Music/Es ist so schon.mp3",
            youtube: "https://www.youtube.com/watch?v=tE3DgpMd5B8"
          },
          {
            title: "Multimedia-Werk",
            details: [
              "Transit (2016) – Mezzosopran, Akkordeon & Video",
              "Dauer: ca. 9 Min.",
              "Uraufführung: Resonanzraum, Hamburg (2016)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Vokalensemble",
            details: [
              "Ewige Frage (1999/2000) – Vokalensemble & Kontrabass",
              "Dauer: ca. 5 Min.",
              "Uraufführung: Kunsthaus Kaufbeuren (2000)"
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Media Vita – Ātman Aeternus (2025) – für Vokalensemble (SSATTTBB) und 2 Hörner oder Naturhörner",
            details: [
              "Eine Kontemplation nach Media Vita in Morte sumus und vedischer Philosophie"
            ],
            audio: null,
            youtube: null
          }
        ]
      },
      {
        id: "choir",
        title: "CHOR",
        works: [
          {
            title: "Dona nobis pacem – Shanti für gemischten Chor & Schlagwerk",
            details: [
              "Dauer: ca. 5 Min.",
              "Uraufführung: St. Reinoldi-Kirche, Dortmund / Deutschlandradio (2017)"
            ],
            audio: "/Music/Chor Dona nobis pacem Shanti Boskovic.mp3",
            youtube: null
          },
          {
            title: "Dona nobis pacem – Shanti für gemischten Chor",
            details: [
              "Dauer: ca. 4:30 Min."
            ],
            audio: null,
            youtube: null
          },
          {
            title: "Ave Maria / Bogorodice djevo für gemischten Chor & Tenorsolo",
            details: [
              "Dauer: ca. 4:50 Min.",
              "Uraufführung: St. Sylvester Kirche, München (2015)"
            ],
            audio: null,
            youtube: null
          }
        ]
      }
    ],
    order: {
      title: "BESTELLANFRAGE",
      text: "Liebe Besucher*innen, für viele der aufgeführten Werke können Sie bei Interesse das Notenmaterial bestellen. Bitte geben Sie unten Ihre Kontaktdaten und die genaue Bestellbeschreibung ein.",
      placeholder: "Beispiel: Ich möchte die Partitur für 'Lichtspiele' bestellen. Meine Kontaktdaten sind...",
      button: "Bestellanfrage senden"
    }
  }
};

// --- WAVESURFER AUDIO PLAYER COMPONENT WITH SKELETON LOADER ---
function WaveSurferPlayer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 60,
    waveColor: 'rgba(255, 255, 255, 0.3)',
    progressColor: '#fcd34d', // amber-200
    cursorColor: '#fcd34d',
    barWidth: 2,
    barGap: 2,
    barRadius: 3,
    url: src,
    normalize: true,
  });

  // Hide skeleton only when audio is fully loaded and can play
  useEffect(() => {
    if (wavesurfer) {
      const handleCanPlay = () => {
        setIsLoading(false);
      };
      
      const handleReady = () => {
        if (wavesurfer.getDuration() > 0) {
          setIsLoading(false);
        }
      };
      
      wavesurfer.on('ready', handleReady);
      wavesurfer.on('decode', handleCanPlay);
      
      const timeout = setTimeout(() => setIsLoading(false), 5000);
      
      return () => {
        wavesurfer.un('ready', handleReady);
        wavesurfer.un('decode', handleCanPlay);
        clearTimeout(timeout);
      };
    }
  }, [wavesurfer]);

  const duration = wavesurfer?.getDuration() || 0;

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const toggleMute = useCallback(() => {
    if (wavesurfer) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      wavesurfer.setVolume(newMutedState ? 0 : volume);
    }
  }, [wavesurfer, isMuted, volume]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer && !isMuted) {
      wavesurfer.setVolume(newVolume);
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [wavesurfer, isMuted]);

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = duration > 0 ? duration - currentTime : 0;

  return (
    <div className="flex items-center gap-3">
      {/* Play/Pause Button */}
      <button
        onClick={onPlayPause}
        className="shrink-0 w-9 h-9 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center transition-all duration-200 shadow-lg"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-4 h-4 text-[#0a1625]" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-[#0a1625] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* WaveSurfer Container with Skeleton Loader */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center gap-[2px] px-1 animate-pulse">
            {Array.from({ length: 70 }).map((_, i) => {
              const heights = [20, 30, 45, 60, 50, 35, 25, 40, 55, 48];
              const height = heights[i % heights.length];
              return (
                <div
                  key={i}
                  className="flex-1 bg-white/20 rounded-full transition-all"
                  style={{ 
                    height: `${height}%`,
                    minWidth: '2px'
                  }}
                />
              );
            })}
          </div>
        )}
        
        <div 
          ref={containerRef} 
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Volume Control */}
      <div className="relative shrink-0">
        <button
          onClick={toggleMute}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
          className="w-8 h-8 rounded-full bg-amber-200/10 hover:bg-amber-200/20 border border-amber-200/30 hover:border-amber-200/50 flex items-center justify-center transition-all duration-200"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : volume > 0.5 ? (
            <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
            </svg>
          )}
        </button>

        {showVolumeSlider && (
          <div 
            className="absolute bottom-full right-0 mb-2 bg-[#0a1625] border border-amber-200/30 rounded-lg p-2 shadow-lg"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 accent-amber-200 cursor-pointer"
              style={{
                writingMode: 'vertical-lr' as const,
                WebkitAppearance: 'slider-vertical' as any,
                height: '80px',
                width: '6px',
                transform: 'rotate(180deg)'
              }}
            />
          </div>
        )}
      </div>

      {/* Time Display - Countdown */}
      <div className="text-sm font-body text-amber-200 tabular-nums min-w-[42px] text-right">
        {formatTime(remainingTime)}
      </div>
    </div>
  );
}

// Scroll Reveal Wrapper Component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function MusicalWorksPage() {
  const [orderMessage, setOrderMessage] = useState("");
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const autoScrollRef = useRef<number | null>(null);
  const lastManualScrollTime = useRef<number>(0);
  
  // 1. Language State
  const [language, setLanguage] = useState<Language>('en');

  // 2. Read Language Setting
  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, []);

  // 3. Get Current Content
  const t = CONTENT[language];
  // Triple the navigation items for infinite scroll effect
  const tripledNavigationItems = [...t.nav, ...t.nav, ...t.nav];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    let animationId: number;

    const animate = () => {
      const timeSinceManualScroll = Date.now() - lastManualScrollTime.current;
      const shouldAutoScroll = !isTouching && timeSinceManualScroll > 2000 && isAutoScrolling;

      if (shouldAutoScroll) {
        container.scrollLeft += scrollSpeed;
        
        // Calculate one third of the total scroll width (since we have 3 copies)
        const singleSetWidth = container.scrollWidth / 3;
        
        // When we've scrolled past one complete set, jump back to the start
        if (container.scrollLeft >= singleSetWidth) {
          container.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling, isTouching, language]); // Added language to dependency to reset scroll on lang change if needed

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => { lastManualScrollTime.current = Date.now(); };
    const handleTouchStart = () => { setIsTouching(true); };
    const handleTouchEnd = () => { setIsTouching(false); lastManualScrollTime.current = Date.now(); };
    const handleMouseDown = () => { setIsTouching(true); };
    const handleMouseUp = () => { setIsTouching(false); lastManualScrollTime.current = Date.now(); };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsAutoScrolling(false);
    lastManualScrollTime.current = Date.now();
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  return (
    <main className="min-h-screen w-full text-white selection:bg-amber-900 selection:text-white pb-32 bg-[#223C5E] lg:bg-transparent lg:bg-cover lg:bg-center lg:bg-fixed" style={{ backgroundImage: 'var(--bg-image)' }}>
      <style jsx>{`
        main {
          --bg-image: none;
        }
        @media (min-width: 1024px) {
          main {
            --bg-image: url(/images/works-bg.webp);
          }
        }
      `}</style>
      
      {/* --- MOBILE TOP NAV (Sticky) --- */}
      <div className="lg:hidden sticky top-0 z-50 w-full bg-[#172F4F] border-b border-[#47719E] flex flex-col shadow-lg">
        <div className="px-4 pt-6 pb-2 w-full"></div>
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden no-scrollbar w-full cursor-grab active:cursor-grabbing"
        >
          <div className="flex whitespace-nowrap px-4 py-4 gap-2">
            {tripledNavigationItems.map((item, index) => (
              <a 
                key={`${item.id}-${index}`}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="font-body text-[9px] font-bold uppercase tracking-wider text-white/80 hover:text-white bg-[#223C5E] hover:bg-[#2a4a73] border border-[#47719E] px-3 py-2 rounded transition-all select-none whitespace-nowrap"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- DESKTOP FIXED SIDEBAR NAV (Right) --- */}
      <motion.div 
        className="hidden lg:block fixed top-24 right-8 z-40 w-40"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex flex-col gap-1 p-0">
          {t.nav.map((item, index) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="font-body text-[11px] font-normal text-center text-[#666] hover:text-white bg-[#EAEAEA] hover:bg-[#172F4F] border border-[#47719E] px-2 py-2 rounded-[5px] transition-all duration-300 uppercase tracking-wide"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {item.label.toUpperCase()}
            </motion.a>
          ))}
        </nav>
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="w-full lg:w-[700px] mx-auto pt-0 md:pt-2 relative bg-[#223C5E]">
        <div className="w-full px-4 lg:w-[600px] lg:px-0 mx-auto">
        
        {/* WORKS CATEGORIES */}
        <div className="space-y-16 mb-20 pt-8">
          {t.categories.map((category, categoryIndex) => (
            <ScrollReveal key={category.id} delay={categoryIndex * 0.05}>
              <section id={category.id} className="scroll-mt-32">
                
                {/* Category Title - Directly on #223C5E background */}
                <div className="text-center mb-6 mt-12">
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                    {category.title}
                  </h2>
                </div>

                {/* Content Box - #172F4F background */}
                <div className="bg-[#172F4F] border border-[#47719E] p-4 lg:p-6 space-y-8 shadow-2xl w-full overflow-hidden">
                  {category.works.map((work, idx) => {
                    const hasMedia = work.audio || work.youtube;
                    
                    return (
                      <motion.div 
                        key={idx} 
                        className={`border-b border-[#47719E]/30 ${hasMedia ? 'pb-8' : 'pb-6'} last:border-0 last:pb-0`}
                        initial={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                      >
                        {/* Work Title — Playfair Display */}
                        <h3 className="font-serif text-lg md:text-xl text-amber-100 mb-3 tracking-wide">
                          {work.title}
                        </h3>
                        
                        {/* Work Details — first line Playfair italic, rest Inter */}
                        <div className={`space-y-1 text-blue-50 text-xs lg:text-sm ${hasMedia ? 'mb-5' : 'mb-1'} break-words`}>
                          {work.details.map((line, i) => (
                            <p key={i} className={i === 0 ? 'font-serif italic' : 'font-body'}>
                              {line}
                            </p>
                          ))}
                        </div>

                        {/* Media Controls */}
                        {hasMedia && (
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            
                            {work.audio && (
                              <div className="flex-1 w-full">
                                <WaveSurferPlayer src={work.audio} />
                              </div>
                            )}

                            {work.youtube && (
                              <a 
                                href={work.youtube} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white px-3 lg:px-4 py-2 text-[10px] lg:text-xs font-body font-bold uppercase tracking-wider rounded transition-colors md:ml-auto whitespace-nowrap"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                YouTube
                              </a>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* ORDER BOX */}
        <ScrollReveal delay={0.1}>
          <div id="order" className="scroll-mt-32 pb-8">
            {/* Title - Directly on #223C5E background */}
            <div className="text-center mb-6 mt-12">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                {t.order.title}
              </h2>
            </div>
            
            {/* Content Container - #172F4F background */}
            <div className="bg-[#172F4F] border border-[#47719E] p-4 lg:p-6 shadow-2xl w-full overflow-hidden">
              <div className="flex flex-col gap-4">
                <p className="font-body text-xs lg:text-sm text-gray-300 text-center md:text-left">
                  {t.order.text}
                </p>
                
                <textarea 
                  className="w-full bg-[#10223a] border border-[#47719E]/50 p-3 font-body text-gray-200 text-xs lg:text-sm focus:outline-none focus:border-[#47719E] transition-colors rounded resize-none"
                  rows={4}
                  placeholder={t.order.placeholder}
                  value={orderMessage}
                  onChange={(e) => setOrderMessage(e.target.value)}
                />

                <div className="flex justify-end">
                  <a 
                    href={`mailto:dijanab@freenet.de?subject=Sheet Music Order&body=${encodeURIComponent(orderMessage)}`}
                    className={`font-body bg-[#EAEAEA] hover:bg-[#172F4F] text-[#666] hover:text-white border border-[#47719E] px-6 py-2 text-xs uppercase tracking-widest transition-colors rounded-[5px] ${!orderMessage.trim() ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {t.order.button}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}