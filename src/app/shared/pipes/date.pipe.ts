import {
  Pipe,
  PipeTransform
} from "@angular/core";

@Pipe({
  name: 'DatePipe'
})
export class DatePipe implements PipeTransform {
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  transform(dateString: string, args?: any): string {
    let date = new Date(dateString);
    return `${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}, ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
  }
}
