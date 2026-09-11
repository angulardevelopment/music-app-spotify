import { Component , OnInit } from "@angular/core";
import { SpotifyService } from "../services/spotify.service";

import { ActivatedRoute, Params, RouterLink } from "@angular/router";
import { Album } from "../Album";
import { Artist } from "../Artist";

import { map } from 'rxjs/operators';

@Component({
    selector: 'artist',
    templateUrl: 'artist.component.html',
    imports: [RouterLink]
})

export class ArtistComponent implements OnInit{

    id:string;
    //artistId:string;
    artist;
    albums;
    constructor(private _spotifyService: SpotifyService, private _route: ActivatedRoute){

    }
    ngOnInit(){
        this._route.params.pipe(
          map(params => params['id']))
          .subscribe((id) => {
              console.log("ID", id)
             this._spotifyService.getToken()
              .subscribe(data => {
                this._spotifyService.getArtist(id, data.access_token)
                 .subscribe(artist=> {
                   this.artist = artist;
                   console.log(this.artist)
                })
                this._spotifyService.getAlbums(id, data.access_token)
                    .subscribe(albums => {
                      this.albums = albums['items'];
                    })
                })
          })
    }
}
