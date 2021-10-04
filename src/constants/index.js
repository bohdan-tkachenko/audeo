import DrumsBrushesMp3 from '../assets/audios/AUD_Jazz_LazyBlues_DrumsBrushes.mp3';
import DrumsStickMp3 from '../assets/audios/AUD_Jazz_LazyBlues_DrumsStick.mp3';
import AcousticBassMp3 from '../assets/audios/AUD_Jazz_LazyBlues_AcousticBass.mp3';
import ElectricBassMp3 from '../assets/audios/AUD_Jazz_LazyBlues_ElectricBass.mp3';
import ElectricPianoMp3 from '../assets/audios/AUD_Jazz_LazyBlues_ElectricPiano.mp3';
import PianoMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Piano.mp3';
import WhistleMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Whistle.mp3';
import TrumpetMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Trumpet.mp3';
import VibraphoneMp3 from '../assets/audios/AUD_Jazz_LazyBlues_Vibraphone.mp3';

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
          url: DrumsBrushesMp3
        },
        {
          id: 'STICKS',
          label: 'Sticks',
          url: DrumsStickMp3
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
          url: AcousticBassMp3
        },
        {
          id: 'ELECTRIC',
          label: 'Electric',
          url: ElectricBassMp3
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
          url: ElectricPianoMp3
        },
        {
          id: 'PIANO',
          label: 'Piano',
          url: PianoMp3
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
          url: WhistleMp3
        },
        {
          id: 'TRUMPET',
          label: 'Trumpet',
          url: TrumpetMp3
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
          url: VibraphoneMp3
        }
      ]
    },
  ]
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AUDIO_TRACK_DATA
}