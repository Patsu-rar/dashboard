import {Component, OnDestroy, OnInit} from '@angular/core';
import {AssessmentService} from "../../shared/services/assessment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-assessments',
  templateUrl: './user-assessments.component.html',
  styleUrls: ['./user-assessments.component.css']
})
export class UserAssessmentsComponent implements OnInit, OnDestroy{
  sub?: Subscription[];

  constructor(public assessmentService: AssessmentService) {
 }

  ngOnInit(): void {
    this.sub?.push(this.assessmentService.getAssessments().subscribe());
  }

  ngOnDestroy(): void {
    this.sub?.forEach(s => s.unsubscribe());
  }
}
