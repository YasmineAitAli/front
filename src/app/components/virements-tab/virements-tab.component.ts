import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VirementsModule } from 'src/app/virements/module/virements.module';
import { VirementsService } from 'src/app/virements/service/virements.service';
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'app-virements-tab',
  templateUrl: './virements-tab.component.html',
  styleUrls: ['./virements-tab.component.css']
})
export class VirementsTabComponent implements OnInit {
  Id : string;
  virement : VirementsModule[];
  currentClientName : string;
  loading$ = this.loader.loading$;

  constructor(private virementervice: VirementsService,public loader: LoadingService,
    private route: ActivatedRoute) {
    this.Id = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.currentClientName = sessionStorage.getItem('name');
    this.virementervice.findAll(this.Id).subscribe(
      (data) => {
        this.virement = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

}
