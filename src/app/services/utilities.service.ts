import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  branches = [
    {label: 'Mechanical', value: 'Mechanical'},
    {label: 'Civil', value: 'Civil'},
    {label: 'Electronics', value: 'Electronics'},
    {label: 'Computer Science', value: 'Computer Science'},
    {label: 'Electrical', value: 'Electrical'},
    {label: 'Agriculture', value: 'Agriculture'}
  ]

  sems = [
    {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'},
      {label: '4', value: '4'},
      {label: '5', value: '5'},
      {label: '6', value: '6'},
      {label: '7', value: '7'},
      {label: '8', value: '8'}
  ]

  getSems(){
    return this.sems;
  }

  getBranches(){
    return this.branches;
  }

  constructor() { }
}
