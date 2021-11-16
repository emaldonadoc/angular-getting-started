import { ComponentFixture, TestBed } from "@angular/core/testing";
import {ProductListComponent} from './product-list.component';
import {configureTests } from '../../../configureTest'


describe('Product list component', ()=>{
    let fixture: ComponentFixture<ProductListComponent> = null;
	let component: ProductListComponent = null;

    beforeEach(done => {
        const configure = (testBed: TestBed) => {
          testBed.configureTestingModule({
            declarations: [ProductListComponent],
          });
        };

        configureTests(configure).then(testBed => {
          fixture = testBed.createComponent(ProductListComponent);
          fixture.detectChanges();
          done();
        });
    });

    test("should create App component", () => {
		component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});
});