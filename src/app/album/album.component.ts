import { Component , OnInit } from "@angular/core";
import { SpotifyService } from "../services/spotify.service";

import { ActivatedRoute , Params } from "@angular/router";
import { Album } from "../Album";

import { map } from 'rxjs/operators';

@Component({
    selector: 'album',
    templateUrl: 'album.component.html'
})

export class AlbumComponent {
    id:string;
    album;

    constructor(private _spotifyservice:SpotifyService , private _route:ActivatedRoute ){}


    ngOnInit(){
        this._route.params.pipe(
        map(params => params['id']))
        .subscribe((id) => {
            this._spotifyservice.getToken()
            .subscribe(data => {
                this._spotifyservice.getAlbum(id, data.access_token)
                .subscribe(album => {
                    this.album = album;
                })
            })
        })
    }



}
