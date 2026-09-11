import { Component } from "@angular/core";
import { Artist } from "../Artist";
import { SpotifyService } from "../services/spotify.service";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    providers: [SpotifyService],
    imports: [FormsModule, RouterLink]
})

export class SearchComponent{

   searchStr:string;
   searchRes;
   constructor(private _spotifyService:SpotifyService){}

   searchMusic(){
       this._spotifyService.getToken()
         .subscribe(res => {
             this._spotifyService.searchMusic(this.searchStr ,'artist' , res.access_token)
               .subscribe(res=> {
                 this.searchRes = res['artists'].items;
            })
         })

    }
}
