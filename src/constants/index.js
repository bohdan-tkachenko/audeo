import DrumsBrushesMp3 from '../assets/audios/AUD_Jazz_LazyBlues_DrumsBrushes.mp3';
import DrumsStickMp3 from '../assets/audios/AUD_Jazz_LazyBlues_DrumsStick.mp3';
import AcousticBassMp3 from '../assets/audios/AUD_Jazz_LazyBlues_AcousticBass.mp3';
import ElectricBassMp3 from '../assets/audios/AUD_Jazz_LazyBlues_ElectricBass.mp3';
import ElectricPianoMp3 from '../assets/audios/AUD_Jazz_LazyBlues_ElectricPiano.mp3';
import PianoMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Piano.mp3';
import WhistleMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Whistle.mp3';
import TrumpetMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Trumpet.mp3';
import VibraphoneMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Vibraphone.mp3';

const MAIN_AUDIOS = {
  BRUSHES: new Audio(DrumsBrushesMp3),
  STICKS: new Audio(DrumsStickMp3),
  ACOUSTIC: new Audio(AcousticBassMp3),
  ELECTRIC: new Audio(ElectricBassMp3),
  ELECTRIC_PIANO: new Audio(ElectricPianoMp3),
  PIANO: new Audio(PianoMp3),
  WHISTLE: new Audio(WhistleMp3),
  TRUMPET: new Audio(TrumpetMp3),
  VIBRAPHONE: new Audio(VibraphoneMp3)
}

const AUDIO_TRACK_DATA = {
  id: 'LAZY_BLUES',
  label: 'Lazy Blues, 113 BPM, C major',
  groups: [
    {
      id: 'DRUMS',
      label: 'Drums',
      tracks: [
        {
          id: 'BRUSHES',
          label: 'Brushes',
          audio: DrumsBrushesMp3,
        },
        {
          id: 'STICKS',
          label: 'Sticks',
          audio: DrumsStickMp3,
        }
      ]
    },
    {
      id: 'BASS',
      label: 'Bass',
      tracks: [
        {
          id: 'ACOUSTIC',
          label: 'Acoustic',
          audio: AcousticBassMp3,
        },
        {
          id: 'ELECTRIC',
          label: 'Electric',
          audio: ElectricBassMp3,
        }
      ]
    },
    {
      id: 'KEYBOARD',
      label: 'Keyboard',
      tracks: [
        {
          id: 'ELECTRIC_PIANO',
          label: 'Electric Piano',
          audio: ElectricPianoMp3,
        },
        {
          id: 'PIANO',
          label: 'Piano',
          audio: PianoMp3,
        }
      ]
    },
    {
      id: 'MELODY_1',
      label: 'Melody 1',
      tracks: [
        {
          id: 'WHISTLE',
          label: 'Whistle',
          audio: WhistleMp3,
        },
        {
          id: 'TRUMPET',
          label: 'Trumpet',
          audio: TrumpetMp3,
        }
      ]
    },
    {
      id: 'MELODY_2',
      label: 'Melody 2',
      tracks: [
        {
          id: 'VIBRAPHONE',
          label: 'Vibraphone',
          audio: VibraphoneMp3,
        }
      ]
    },
  ]
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AUDIO_TRACK_DATA,
  MAIN_AUDIOS
}