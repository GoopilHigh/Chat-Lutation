import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLutationComponent } from './chat-lutation.component';

describe('ChatLutationComponent', () => {
  let component: ChatLutationComponent;
  let fixture: ComponentFixture<ChatLutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
