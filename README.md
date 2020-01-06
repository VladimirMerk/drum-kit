# drum-kit
Application for playing and recording drum parts

During assembly, sounds are converted to base64 and written to a single json file. base64 from this file is used to convert to ArrayBuffer.
Yes, it was possible to do this through regular audio files and the audio tag, but this was done intentionally to work with the Web Audio API through the AudioContext, which is decoded by ArrayBuffer.

The plans are to add more sounds, add modulation, transfer the work with sound to a separate class, optimize, add save and play

## Usage

```sh
npm run build-sounds
```

For dev mode

```sh
npm run dev
```
follow to http://127.0.0.1:8000/

For production mode

```sh
npm run build
npm start OR PORT=1234 npm start
```
follow to http://127.0.0.1:8000/
