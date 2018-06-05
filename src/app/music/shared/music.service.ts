
import {distinctUntilChanged, debounceTime, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';






@Injectable()
export class MusicService {

  audio;

  constructor(
    private apiService: ApiService
  ) {
    this.audio = new Audio();
  }

  load(url) {
    this.audio.src = this.apiService.prepareUrl(url);
    this.audio.load();
  }

  play(url) {
    this.load(url);
    this.audio.play()
  }

  getPlaylistTracks () {
      // SoundCloud without Client ID
      // -https://github.com/mediaelement/mediaelement/issues/2501
      //Request for a playlist via Soundcloud using a client id
      // return this.apiService.get('https://api.soundcloud.com/playlists/209262931', true).pipe(
      return this.apiService.get('https://api.soundcloud.com/playlists/323195515', true).pipe(
        map(res => res.json()),
        map(data => data.tracks),);
  }

  randomTrack(tracks) {
    const trackLength = tracks.length;
    // Pick a random number
    const randomNumber = Math.floor((Math.random() * trackLength) + 1);
    // Return a random track
    return tracks[randomNumber];
  }

  formatTime(seconds) {
    let minutes:any = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  findTracks(value) {
    return this.apiService.get(`${this.apiService.prepareUrl('https://api.soundcloud.com/tracks')}&q=${value}`, false).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(res => res.json()),)
  }

  xlArtwork(url) {
    if ( url !== null ) {
      return url.replace(/large/, 't500x500');
    }
  }

}
