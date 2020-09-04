import { Component, OnInit, Input, TemplateRef, ComponentFactoryResolver, OnChanges, ViewChild, ViewContainerRef, ComponentRef, ViewChildren, QueryList } from '@angular/core';
import { Type } from '@angular/core';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'list',
  template: `
<button (click)="onAddNewItem()">Add New Item</button>
<ul>
  <li *ngFor="let item of items" (click)="onClick($event, item)">
    <ng-template #itemContainer></ng-template>
  </li>
</ul>
  `
})
export class ListComponent implements OnInit, OnChanges {
  items = [
    {id: 1, name: 'Joe', type: 'CRAZY'},
    {id: 2, name: 'Elena', type: 'NORMAL'},
    {id: 3, name: 'Sigfied', type: 'CRAZY'},
    {id: 4, name: 'Martell', type: 'NORMAL'},
    {id: 5, name: 'Eve', type: 'CRAZY'},
    {id: 6, name: 'Jonathan', type: 'NORMAL'},
    {id: 7, name: 'Leonora', type: 'CRAZY'},
  ];

  @Input() component: Type<any>;

  @ViewChildren("itemContainer", { read: ViewContainerRef }) viewContainerRefs: QueryList<ViewContainerRef>;

  constructor(
    protected cfr: ComponentFactoryResolver,
  ) {
  }

  createChildComponent(viewContainerRef: ViewContainerRef, item: any) {
    const factory = this.cfr.resolveComponentFactory(this.component);
    const component = viewContainerRef.createComponent(factory);

    component.instance.data = item;

    /*
     * ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. 
     * Current value: 'Joe'. It seems like the view has been created after its parent and its children have been dirty checked. 
     * Has it been created in a change detection hook?
    */
    component.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.updateComponents();

    this.viewContainerRefs.changes.subscribe((changes: any) => {
      console.log('viewContainerRefs', changes);

      this.updateComponents();
    });
  }

  updateComponents() {
    this.viewContainerRefs.forEach((viewContainerRef, index) => {
      console.log('viewContainerRefs', viewContainerRef);

      viewContainerRef.clear();

      this.createChildComponent(viewContainerRef, this.items[index]);
    });
  }

  ngOnChanges() {
  }

  onClick(event, item) {
    console.log('onClick', {event, item});

    this.items = this.items.filter(obj => obj !== item);
  }

  onAddNewItem() {
    this.items.push({id: this.items.length+1, name: new Date().toString(), type: 'NEW'});
  }
}
