import {Component, OnInit} from '@angular/core';
import {ChartType, ChartDataset} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {AssessmentService} from "../../shared/services/assessment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-assessments-graph',
  templateUrl: './assessments-graph.component.html',
  styleUrls: ['./assessments-graph.component.css']
})
export class AssessmentsGraphComponent implements OnInit {
  sub?: Subscription;

  set?: ChartDataset;
  activeAssessments: any;
  selected?: string;
  graphValues: any = [];
  graphKeys: string[] = [];

  constructor(public assessmentService: AssessmentService) {
  }

  ngOnInit(): void {
    this.sub = this.assessmentService.getAssessments().pipe().subscribe();
    this.activeAssessments = JSON.parse(sessionStorage.getItem('reports')!);
    this.selected = this.activeAssessments[0].name;
    Object.entries(this.activeAssessments[0].data).map((el: any) => {
      this.graphKeys.push(el[0]);
      this.graphValues.push(el[1]);
    });
  }

  selectAssessment(event: any){
    this.selected = event.target.value;
    this.graphKeys = [];
    this.graphValues = [];

    const data = this.activeAssessments.find((el:any) => el.name === this.selected).data;
    Object.entries(data).map((el: any) => {
      this.graphKeys.push(el[0]);
      this.graphValues.push(el[1]);
    });
    this.set = {data: this.graphValues, label: this.selected};
    this.lineChartData.pop();
    this.lineChartLabels = this.graphKeys;
    this.lineChartData.push(this.set);

    console.log(this.lineChartData,);

    // console.log(this.lineChartData.includes(this.set));
  }

  lineChartData: ChartDataset[] = [
    {data: this.graphValues, label: 'Data'}
  ];

  lineChartLabels: BaseChartDirective['labels'] = this.graphKeys;
  lineChartOptions = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
}
