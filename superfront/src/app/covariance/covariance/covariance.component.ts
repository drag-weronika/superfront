import { Component, OnInit } from '@angular/core';
import { FileRest } from 'src/app/_models/fileRest';
import { ComputationPacket } from 'src/app/_models/ComputationPacket';
import { CovarianceService }from 'src/app/covariance/covariance.service';

@Component({
  selector: 'app-covariance',
  templateUrl: './covariance.component.html',
  styleUrls: ['./covariance.component.css']
})
export class CovarianceComponent implements OnInit {
    files: FileRest[]
    selectedFile: File
    tableContent: any
    firstColumnId: any
    secondColumnId: any
    fileId: any

  constructor(private covarianceService:CovarianceService) {
    this.tableContent = []
  }

  getFilesFromSet(){
      console.log("getfiles")
      this.covarianceService.getFiles().subscribe(
      (files : FileRest[]) => { this.files = files;
      console.log(this.files);
      })
  }

  selectedChangeHandler (event: number) {
    this.fileId = event
  }

  compute() {
    let computationPacket = new ComputationPacket()
    computationPacket.firstColumnId = this.firstColumnId
    computationPacket.secondColumnId = this.secondColumnId
    computationPacket.fileId = this.fileId
    computationPacket.function = "COVARIANCE"

    this.covarianceService.compute(computationPacket).subscribe(
                r => {
                    let covariance = (r as ComputationPacket).value
                    computationPacket.function = "CORRELATION"
                    this.covarianceService.compute(computationPacket).subscribe(
                        r => {
                            let correlation = (r as ComputationPacket).value
                            computationPacket.function = "TTEST"
                            this.covarianceService.compute(computationPacket).subscribe(
                                r => {
                                    let ttest = (r as ComputationPacket).value
                                    this.tableContent.push([this.firstColumnId, this.secondColumnId, covariance, correlation, ttest])
                                })
                        })
                },
                error => {
                    console.log("ERROR")
                })
  }

  clear() {
    this.tableContent = []
  }

  ngOnInit() {
    this.getFilesFromSet()
  }

}
